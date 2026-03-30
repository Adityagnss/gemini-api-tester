# 🔬 Gemini API Tester

> **A beautiful, zero-backend tool to test your Gemini API key instantly — see your request go out and the response come back in real time.**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-gemini--api--tester--adityagnss.netlify.app-6366f1?style=for-the-badge)](https://gemini-api-tester-adityagnss.netlify.app)
[![HTML](https://img.shields.io/badge/HTML-Pure_Vanilla-e34f26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![No Backend](https://img.shields.io/badge/Backend-None_(100%25_Client_Side)-34d399?style=for-the-badge)](https://gemini-api-tester-adityagnss.netlify.app)
[![Netlify](https://img.shields.io/badge/Hosted_on-Netlify-00c7b7?style=for-the-badge&logo=netlify&logoColor=white)](https://netlify.com)

---

## 🌐 Live Demo

**👉 [https://gemini-api-tester-adityagnss.netlify.app](https://gemini-api-tester-adityagnss.netlify.app)**

No installation. No signup. Open the link and start testing.

---

## ✨ What It Does

Most people testing an API for the first time wonder:
- *"Did my request actually go through?"*
- *"What exactly am I sending?"*
- *"Is my API key valid?"*
- *"What model is responding to me?"*

This tool answers all of that **visually and instantly**.

---

## 🎯 Features

| Feature | Description |
|--------|-------------|
| 🔑 **User API Key Input** | Enter your own Gemini API key — nothing is stored or sent anywhere except Google |
| 👁️ **Show / Hide Key** | Toggle visibility of your key while typing |
| 🤖 **Model Selector** | Choose between Gemini 2.0 Flash, 1.5 Flash, 1.5 Pro, or Flash Latest |
| 📦 **Request Preview** | See the exact JSON body that gets sent to the API |
| ✅ **Live Answer Display** | Gemini's response shown in a clean, readable format |
| ⏱ **Response Time** | Exact millisecond round-trip timing |
| 🔢 **Token Tracking** | Shows total tokens, output tokens, and thinking tokens |
| 🕐 **Step-by-Step Timeline** | Visual breakdown of what happened at each stage |
| 📜 **Raw JSON Debug View** | Full API response in collapsible JSON panel |
| 🔒 **100% Client-Side** | No backend, no server — your key never leaves your browser |
| 💅 **Dark Mode UI** | Premium dark glassmorphism design |

---

## 🚀 How to Use

1. **Go to the live site** → [gemini-api-tester-adityagnss.netlify.app](https://gemini-api-tester-adityagnss.netlify.app)
2. **Get your API key** from [Google AI Studio](https://aistudio.google.com/app/apikey) (free)
3. **Paste your key** into the API Key field
4. **Select a model** (Gemini 2.0 Flash is recommended)
5. **Type your question** or use the default prompt
6. **Click "Test My API Key"** and watch the magic happen!

---

## 🔒 Privacy & Security

> Your API key is **100% safe** with this tool.

- The key is sent **directly from your browser to Google's servers** using the Fetch API
- There is **no backend server** — the page is pure static HTML + JavaScript
- Nothing is **logged, stored, or transmitted** to any third party
- You can verify this yourself by opening **DevTools → Network tab** and inspecting the request

---

## 🧠 Understanding the Response

When you test your API, you'll see:

```
Request body (what you send):
{
  "contents": [
    {
      "parts": [{ "text": "Your question here" }]
    }
  ]
}
```

```
Response (what Gemini sends back):
{
  "candidates": [...],
  "modelVersion": "gemini-3-flash-preview",
  "usageMetadata": {
    "totalTokenCount": 277,
    "thoughtsTokenCount": 255   ← internal reasoning tokens
  }
}
```

### What are Thinking Tokens?
Some Gemini models (like `gemini-flash-latest` → `gemini-3-flash-preview`) run in **Thinking Mode** — they internally reason before producing the final answer. These are shown as `thoughtsTokenCount` in the response and are displayed separately in the UI.

---

## 🛠 Run Locally

No build step needed. It's a single HTML file.

```bash
# Clone the repo
git clone https://github.com/adityagnss/gemini-api-tester.git
cd gemini-api-tester

# Open directly in browser
open index.html

# OR serve with any static server
npx serve .
```

---

## 📁 Project Structure

```
gemini-api-tester/
└── index.html       # The entire app — HTML + CSS + JS in one file
└── README.md        # This file
```

---

## 🌐 API Reference

This tool calls the **Google Generative Language API**:

| Property | Value |
|----------|-------|
| Base URL | `https://generativelanguage.googleapis.com/v1beta/models/` |
| Method | `POST` |
| Auth | `?key=YOUR_API_KEY` query param |
| Content-Type | `application/json` |

**Get your free API key:** https://aistudio.google.com/app/apikey

---

## 📊 Supported Models

| Model ID | Description |
|----------|-------------|
| `gemini-2.0-flash` | Latest Flash — fast, capable, recommended |
| `gemini-1.5-flash` | Stable Flash — widely used |
| `gemini-1.5-pro` | Pro model — most capable, slower |
| `gemini-flash-latest` | Always points to the latest Flash model |

---

## 🤝 Contributing

Found a bug or want to add a feature? PRs welcome!

1. Fork the repo
2. Edit `index.html`
3. Open a Pull Request

---

## 📄 License

MIT License — free to use, fork, and modify.

---

<div align="center">

Built with ❤️ by [**adityagnss**](https://github.com/adityagnss)

⭐ **Star this repo if it helped you!**

</div>
