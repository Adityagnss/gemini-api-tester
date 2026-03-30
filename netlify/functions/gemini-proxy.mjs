/**
 * Netlify Serverless Function — Gemini API Proxy
 * ------------------------------------------------
 * Acts as a server-side proxy for the Google Gemini API.
 *
 * WHY a proxy?
 *   - API key is sent in the POST body, NOT as a visible URL ?key= param
 *   - Prevents the key from appearing in browser Network tab URLs
 *   - All CORS headers handled server-side
 *   - Future: add rate limiting, logging, caching here
 *
 * Route: POST /.netlify/functions/gemini-proxy
 *
 * Request body: { apiKey, model, prompt }
 * Response:     Raw Gemini API JSON response
 */

export default async function handler(req, context) {
  // Only allow POST
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed. Use POST." }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { apiKey, model, prompt } = body;

  // Validate required fields
  if (!apiKey || !model || !prompt) {
    return new Response(
      JSON.stringify({ error: "Missing required fields: apiKey, model, prompt" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Basic API key sanity check
  if (!apiKey.startsWith("AIza") || apiKey.length < 20) {
    return new Response(
      JSON.stringify({ error: "Invalid API key format. It should start with 'AIza'." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  try {
    const geminiRes = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const data = await geminiRes.json();

    return new Response(JSON.stringify(data), {
      status: geminiRes.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to reach Gemini API.", detail: err.message }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }
}

export const config = {
  path: "/api/gemini",
};
