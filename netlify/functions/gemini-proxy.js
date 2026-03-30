/**
 * Netlify Serverless Function — Gemini API Proxy
 * ------------------------------------------------
 * Route: POST /.netlify/functions/gemini-proxy
 * Body:  { apiKey, model, prompt }
 */

exports.handler = async function (event) {
  const corsHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: corsHeaders, body: "" };
  }

  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Method not allowed. Use POST." }),
    };
  }

  // Parse body
  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Invalid JSON body." }),
    };
  }

  const { apiKey, model, prompt } = payload;

  // Validate required fields
  if (!apiKey || !model || !prompt) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({
        error: "Missing required fields: apiKey, model, prompt",
      }),
    };
  }

  // Basic key sanity check
  if (!apiKey.startsWith("AIza") || apiKey.length < 20) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({
        error: "Invalid API key format. Should start with 'AIza'.",
      }),
    };
  }

  // Call Gemini API server-side
  try {
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const geminiRes = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const data = await geminiRes.json();

    return {
      statusCode: geminiRes.status,
      headers: corsHeaders,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 502,
      headers: corsHeaders,
      body: JSON.stringify({
        error: "Failed to reach Gemini API.",
        detail: err.message,
      }),
    };
  }
};
