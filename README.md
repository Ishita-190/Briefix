# Briefix - AI Legal Assistant

<div align="center">
  <h3>🏛️ Simplifying legal complexity through intelligent briefings and AI-powered guidance</h3>
  <p>Get clear, level-appropriate explanations for any legal matter</p>
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

## 🎯 About

Briefix is an AI-powered legal assistant designed to make legal concepts accessible to everyone. Whether you're 12 years old trying to understand your rights, a teenager learning about contracts, or a legal professional seeking quick clarification, Briefix adapts its explanations to your level of understanding.

### 🎨 Design Philosophy

Briefix features a vintage scroll-inspired design that evokes the gravitas and tradition of legal documents while maintaining modern usability and accessibility.

## ✨ Features

### 🧠 **Smart AI Explanations**

- **Adaptive Complexity**: Choose your comprehension level (12-year-old, 15-year-old, or lawyer)
- **Contextual Responses**: AI provides relevant examples and explanations based on your question
- **Educational Focus**: Designed for learning and understanding, not legal advice

### 📄 **Document Analysis**

- **Upload Support**: PDF, DOC, DOCX, and TXT files
- **Intelligent Parsing**: Extracts key points, potential concerns, and recommendations
- **Plain English Summaries**: Complex legal documents explained in accessible language
- **Risk Assessment**: Identifies potential issues and suggests next steps

### 📋 **Legal Procedures Guide**

- **Step-by-Step Guidance**: Complete walkthroughs for common legal processes
- **Progress Tracking**: Check off completed steps and track your progress
- **Time Estimates**: Realistic timelines for each step and overall process
- **Difficulty Indicators**: Visual cues for complexity levels

### 💬 **AI Chat Interface**

- **Natural Language**: Ask questions in plain English
- **Contextual Understanding**: AI remembers conversation context
- **Multiple Response Types**: Explanations, document help, procedure guidance
- **Quick Questions**: Pre-populated common legal questions

### 🔒 **Privacy & Security**

- **Educational Focus**: Clear disclaimers about the educational nature of responses
- **No Legal Advice**: Emphasizes the need for professional consultation
- **Secure Processing**: Document analysis with privacy considerations

## 🛠️ Tech Stack

### **Frontend**

- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **React Router 6** - Client-side routing with SPA mode
- **TailwindCSS 3** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons

### **Backend**

- **Express.js** - Node.js web framework
- **Integrated Development** - Single-port setup with Vite proxy

### **UI Components**

- **Radix UI** - Accessible, unstyled UI primitives
- **Custom Design System** - Built on shadcn/ui patterns
- **Responsive Design** - Mobile-first approach

### **Development Tools**

- **JavaScript (ES6+)** - Converted from TypeScript for simplicity
- **PNPM** - Fast, disk space efficient package manager
- **Vitest** - Unit testing framework
- **Hot Reload** - Fast development iteration

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **PNPM** (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Ishita-190/Briefix.git
   cd Briefix
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

### Available Scripts

```bash
# Development
pnpm dev          # Start development server (client + server)

# Building
pnpm build        # Production build
pnpm build:client # Build client only
pnpm build:server # Build server only

# Production
pnpm start        # Start production server

# Testing & Quality
pnpm test         # Run Vitest tests
pnpm typecheck    # TypeScript validation (if applicable)
pnpm format.fix   # Format code with Prettier
```

## 📁 Project Structure

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


Briefix/
└───├── .dockerignore
    ├── .env
    ├── .gitignore
    ├── .npmrc
    ├── .prettierrc
    ├── AGENTS.md
    ├── README.md
    ├── blueprint.docx
    ├── components.json
    ├── extract_ipc.py
    ├── index.html
    ├── ipc.pdf
    ├── netlify.toml
    ├── package.json
    ├── pnpm-lock.yaml
    ├── postcss.config.js
    ├── tailwind.config.ts
    ├── tsconfig.json
    ├── vite.config.server.ts
    ├── vite.config.ts
    │
    ├── .builder/
    │   └── rules/
    │       ├── deploy-app.mdc
    │       └── organize-ui.mdc
    │
    ├── client/
    │   ├── App.tsx
    │   ├── global.css
    │   ├── main.tsx
    │   ├── vite-env.d.ts
    │   └── components/
    │       ├── Footer.tsx
    │       ├── Header.tsx
    │       └── ui/
    │           ├── SignIn.tsx
    │           ├── accordion.tsx
    │           ├── alert-dialog.tsx
    │           ├── alert.tsx
    │           ├── animated-background.tsx
    │           ├── aspect-ratio.tsx
    │           ├── avatar.tsx
    │           ├── badge.tsx
    │           ├── breadcrumb.tsx
    │           ├── button.tsx
    │           ├── calendar.tsx
    │           ├── card.tsx
    │           ├── carousel.tsx
    │           ├── chart.tsx
    │           ├── checkbox.tsx
    │           ├── collapsible.tsx
    │           ├── command.tsx
    │           ├── context-menu.tsx
    │           ├── dialog.tsx
    │           ├── drawer.tsx
    │           ├── dropdown-menu.tsx
    │           ├── form.tsx
    │           ...
    │
    ├── server/
    │   ├── index.ts
    │   └── routes/
    │       └── demo.ts
    │
    ├── shared/
    │   └── api.ts
    │
    └── netlify/
        └── functions/
            └── api.mts


## 📖 Usage

### 🏠 **Homepage**

- Overview of Briefix capabilities
- Quick access to all major features
- Getting started guide

### 🧠 **AI Explanations** (`/explain`)

1. Enter your legal question
2. Select complexity level (12-year-old, 15-year-old, lawyer)
3. Receive tailored explanation
4. Ask follow-up questions for clarification

### 📄 **Document Analysis** (`/documents`)

1. Upload legal document (PDF, DOC, DOCX, TXT)
2. Wait for AI analysis (simulated processing)
3. Review document overview, key points, and concerns
4. Follow provided recommendations

### 📋 **Legal Procedures** (`/procedures`)

1. Browse available legal procedures
2. Select a procedure to view detailed steps
3. Check off completed steps to track progress
4. Follow important notes and disclaimers

### 💬 **AI Chat** (`/chat`)

1. Start conversation with AI assistant
2. Ask questions about legal topics
3. Receive contextual responses
4. Use quick questions for common topics

## 🤝 Contributing

We welcome contributions to Briefix! Here's how you can help:

### **Development Setup**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the installation steps above
4. Make your changes
5. Test thoroughly
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to your branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### **Contribution Guidelines**

- **Code Style**: Follow existing patterns and conventions
- **Components**: Break large components into smaller, reusable pieces
- **Testing**: Add tests for new functionality
- **Documentation**: Update README for significant changes
- **Security**: Never commit API keys or sensitive information

### **Areas for Contribution**

- 🎨 UI/UX improvements
- 🧠 Enhanced AI response patterns
- 📱 Mobile responsiveness
- ⚡ Performance optimizations
- 🔧 Additional legal procedures
- 🌐 Accessibility improvements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

**Important**: Briefix is an AI assistant for educational purposes only. The information provided by this application:

- ❌ **Is NOT legal advice**
- ❌ **Cannot replace professional legal consultation**
- ❌ **Should not be relied upon for legal decisions**
- ✅ **Is designed for educational understanding only**
- ✅ **Encourages consultation with qualified attorneys for legal matters**

### **When to Seek Professional Help**

- Before signing any legal documents
- When facing legal action or litigation
- For complex legal matters affecting your rights
- When unsure about legal implications of your actions

---

<div align="center">
  <p>Made with ❤️ for legal education and accessibility</p>
  <p>© 2024 Briefix. All rights reserved.</p>
</div>
