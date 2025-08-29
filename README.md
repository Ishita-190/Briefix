# Briefix - AI Legal Assistant

<div align="center">
  <h3>🏛️ AI-Powered Legal Guidance for Everyone</h3>
  <p>Get clear, level-appropriate legal explanations instantly</p>
  
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
  [![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/Ishita-190/Briefix/)
</div>

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Disclaimer](#disclaimer)

## 🎯 About Briefix

Briefix democratizes legal understanding by providing accessible, AI-powered explanations of legal concepts. Our platform adapts to your knowledge level, making legal information approachable for everyone from students to professionals.

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🧠 **Smart AI Explanations** | Get explanations tailored to your knowledge level (student to professional) |
| 📄 **Document Analysis** | Upload and understand legal documents with AI-powered insights |
| 📋 **Legal Procedures** | Step-by-step guidance through common legal processes |
| 💬 **AI Chat** | Natural language Q&A about legal topics |
| 🔒 **Privacy Focused** | Secure document handling and data protection |

### 🎨 Design Philosophy

Briefix combines the gravitas of legal tradition with modern, accessible design principles to create an intuitive user experience.

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: TailwindCSS 3 + Radix UI
- **Routing**: React Router 6
- **Icons**: Lucide React
- **State Management**: React Context API

### Backend
- **Runtime**: Node.js with Express.js
- **API**: Gemini API
- **Serverless**: Netlify Functions

### Development
- **Package Manager**: PNPM
- **Testing**: Vitest
- **Linting**: ESLint + Prettier
- **Type Safety**: TypeScript

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- PNPM (recommended) or npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Ishita-190/Briefix.git
cd Briefix

# 2. Install dependencies
pnpm install  # or npm install

# 3. Start development server
pnpm dev
```

Visit `http://localhost:8080` in your browser.

### Development Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Create production build |
| `pnpm test` | Run test suite |
| `pnpm typecheck` | TypeScript type checking |
| `pnpm format` | Format code with Prettier |


## 📁 Project Diagram

                ┌─────────────────────────┐
                │       Client (React)    │
                │  Vite + Tailwind + UI   │
                │ Pages & Components      │
                └───────────┬─────────────┘
                            │  API Calls (REST/Fetch)
                            ▼
     ┌────────────────────────────┐         ┌────────────────────────────┐
     │  Server (Express Backend) │◄────────►│  Netlify Functions (API)   │
     │  server/routes/demo.ts     │         │  netlify/functions/api.mts │
     └───────────┬────────────────┘         └─────────────┬──────────────┘
                 │ Shared Interfaces (TypeScript API contracts)
                 ▼
           ┌──────────────┐
           │  shared/     │
           │  api.ts      │
           └──────────────┘

     ┌─────────────────────────────┐
     │ Utilities / Data Processing │
     │  extract_ipc.py, json, etc. │
     └─────────────────────────────┘

     ┌─────────────────────────────┐
     │  Config & Deployment        │
     │  vite, tsconfig, tailwind,  │
     │  netlify.toml, env          │
     └─────────────────────────────┘

     ┌─────────────────────────────┐
     │ Docs & Assets               │
     │  README, blueprint, pdfs    │
     │  public/ (static files)     │
     └─────────────────────────────┘
## 🗂 Project Structure

```
briefix/
├── client/           # Frontend React application
│   ├── components/   # Reusable UI components
│   ├── pages/        # Application pages
│   └── lib/          # Shared utilities and hooks
│
├── server/           # Backend server
│   ├── routes/       # API route handlers
│   └── lib/          # Shared server utilities
│
├── shared/           # Code shared between client and server
│   └── api.ts        # TypeScript API interfaces
│
├── netlify/          # Serverless functions
│   └── functions/    # Netlify function handlers
│
└── public/           # Static assets
```

### Key Files
- `client/` - Frontend React application
- `server/` - Backend Express server
- `shared/` - Shared TypeScript types and utilities
- `netlify/functions/` - Serverless API endpoints

## 📖 Usage

### Key Features

| Feature | How to Use |
|---------|------------|
| 🧠 **AI Explanations** | Get clear, level-appropriate legal explanations |
| 📄 **Document Analysis** | Upload and analyze legal documents |
| 📋 **Legal Procedures** | Follow step-by-step legal processes |
| 💬 **AI Chat** | Ask questions about legal topics |

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the installation steps above
4. Make your changes
5. Test thoroughly
6. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Never commit sensitive information

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

**Important**: Briefix is for educational purposes only. This is not legal advice. Always consult with a qualified attorney for legal matters.

---

<div align="center">
  <p>Made with ❤️ for legal education and accessibility</p>
  <p>© 2024 Briefix. All rights reserved.</p>
</div>
