# 🖥️ Online Compiler

> **A modern, web-based code compilation and execution platform**

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2.3-blue?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

Write, compile, and execute code directly in your browser with an integrated AI assistant powered by Groq. Built with Next.js, React, and Monaco Editor.

**🌐 Live Demo:** [https://online-compiler.sacred99.online/](https://online-compiler.sacred99.online/)

## ✨ Features

### 💻 Core Capabilities
- **Multi-Language Support** — Write and execute code in Python and C
- **Real-time Code Editor** — Monaco Editor with syntax highlighting and intellisense
- **Secure Code Execution** — Isolated execution using [Code Executor](https://github.com/ishaan-jindal/code-executor)
- **File Management** — Create, edit, and manage code files directly in the browser
- **AI-Powered Assistant** — Real-time code suggestions using Groq's Mixtral model

### 🔒 Security & Performance
- **Sandboxed Execution** — Code runs in isolated Docker containers
- **User Authentication** — Secure OAuth-based authentication with Google
- **Rate Limiting** — Token-based protection against abuse
- **MongoDB Integration** — Persistent storage for files and sessions

### 🤖 AI Assistance
- **Code Suggestions** — AI-powered completions and suggestions
- **Intelligent Chat** — Ask questions or get programming help
- **Context-Aware** — AI includes your current code for better suggestions
- **One-Click Apply** — Apply suggested code instantly

## 🏗️ Architecture

### Frontend (Next.js)
- **Monaco Editor** — Full-featured code editor with language support
- **Real-time File Management** — File drawer for organizing code snippets
- **AI Chat Interface** — Integrated chat sidebar with live code context
- **Authentication** — Secure sign-in flow with NextAuth

### Backend - Code Executor
Powered by [**Code Executor**](https://github.com/ishaan-jindal/code-executor) for secure execution:

| Feature | Details |
|---------|---------|
| **Languages** | Python 3.12, C (GCC 13) |
| **Security** | gVisor sandbox, resource limits (64MB memory, 0.5 CPU) |
| **Metrics** | Compile time, run time, queue wait tracking |
| **Authentication** | JWT-based user authentication |
| **Rate Limiting** | Free, Starter, Professional, Enterprise tiers |
| **Monitoring** | Prometheus metrics & Grafana dashboards |

### Execution Flow
```
📝 Write Code
    ↓
🚀 Click "Run"
    ↓
📤 Send to Backend
    ↓
🐳 Execute in Docker (isolated)
    ↓
📊 Return Results
    ↓
✅ Display Output
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16, React 19, TypeScript, Tailwind CSS |
| **Editor** | Monaco Editor with syntax highlighting |
| **Auth** | NextAuth.js + Google OAuth |
| **Database** | MongoDB |
| **Backend** | Express.js, Node.js (Code Executor) |
| **Sandbox** | Docker + gVisor |
| **AI** | Groq API (Mixtral-8x7b-32768) |
| **Monitoring** | Prometheus + Grafana |

## ⚡ Quick Start

### Prerequisites
- Node.js 18+
- Google OAuth credentials
- Groq API key (free from [console.groq.com](https://console.groq.com/keys))

### Local Development

**1. Clone & Install**
```bash
git clone <repository-url>
cd Online-Compiler
npm install
```

**2. Set Up Environment**
```bash
cp example.env .env.local
```

Edit `.env.local` with:
```env
GROQ_API_KEY=gsk_your_key_from_groq_console
NEXTAUTH_SECRET=generated_using_openssl_rand_-base64_32
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_oauth_id
GOOGLE_CLIENT_SECRET=your_google_oauth_secret
```

**3. Run Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) ✨

### Get Your API Keys

| Service | Link | Notes |
|---------|------|-------|
| **Groq** | [console.groq.com/keys](https://console.groq.com/keys) | Free, ~5000 req/day |
| **Google OAuth** | [console.cloud.google.com](https://console.cloud.google.com) | Create OAuth 2.0 credentials |
| **NextAuth Secret** | `openssl rand -base64 32` | Generate random secret |

## 🚀 Production Deployment

**Live:** https://online-compiler.sacred99.online/

**Build & Run**
```bash
npm run build
npm run start
```

The application is hosted on a modern deployment platform with the Code Executor backend running on a dedicated server.

## � Authentication

- **Sign In** → Click "Sign In" button, authenticate with Google
- **Session Management** → Secure sessions with NextAuth.js
- **User Profile** → Access profile after authentication

## 🤖 AI Assistant

Click the **🤖 AI** button in the header to:

✅ Get code suggestions and completions  
✅ Ask for debugging help  
✅ Learn programming concepts  
✅ Optimize your code  

**How to use:**
1. Click the AI button
2. Type your question or request
3. View AI suggestions
4. Click **✓ Apply** to insert or **📋 Copy** to copy

**Features:**
- Maintains conversation history
- Includes your current code as context
- Fast responses (powered by Groq)
- Free tier: ~5000 requests/day

## 📝 File Management

- **Create Files** — Use file drawer to create new code files
- **Edit Code** — Write in Monaco Editor with full syntax support
- **Switch Files** — Click file names to switch between files
- **Auto-Save** — Files persist to MongoDB

## ⚙️ Environment Variables

```env
GROQ_API_KEY              # Groq API key for AI features
NEXTAUTH_SECRET           # Secret for session encryption
NEXTAUTH_URL              # Application URL (http://localhost:3000 for dev)
GOOGLE_CLIENT_ID          # Google OAuth client ID
GOOGLE_CLIENT_SECRET      # Google OAuth client secret
```

## 🔗 Code Executor Backend

Powered by [Code Executor](https://github.com/ishaan-jindal/code-executor) — a secure, isolated code execution service.

**Supported Languages:**
- Python 3.12
- C (GCC 13)

**Key Features:**
- ✅ Isolated Docker containers with gVisor sandbox
- ✅ Memory & CPU limits (64MB, 0.5 CPU)
- ✅ Timeout protection (2s default)
- ✅ Real-time output capture
- ✅ Execution metrics tracking
- ✅ Rate limiting by user tier
- ✅ Health checks & monitoring

Learn more at [Code Executor GitHub](https://github.com/ishaan-jindal/code-executor)

## 📊 Monitoring

Code Executor includes comprehensive monitoring:
- **Health Checks** → `/health` endpoint for service status
- **Metrics** → Prometheus-compatible metrics at `/metrics`
- **Dashboards** → 11 pre-built Grafana monitoring panels
- **Logging** → Request logs with trace IDs

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| **AI Chat not working** | Verify `GROQ_API_KEY` in `.env.local`, check browser console (F12) |
| **Code execution errors** | Check syntax, verify backend is running |
| **Auth issues** | Verify OAuth credentials, check cookies are enabled |
| **API rate limited** | Free tier: ~5000 req/day. Wait or generate new Groq key |

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs) — Framework documentation
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) — Code editor docs
- [Code Executor API](https://github.com/ishaan-jindal/code-executor) — Backend API
- [Groq API](https://console.groq.com/docs) — AI inference service
- [NextAuth.js](https://next-auth.js.org) — Authentication framework

---

## 📄 License

This project is open source under the **MIT License**.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

---

<div align="center">

**Made with ❤️ | [Visit Live Site](https://online-compiler.sacred99.online/)**

</div>
