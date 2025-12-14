# RepoMirror 🔍✨

**AI-Powered GitHub Repository Analyzer**  
RepoMirror evaluates any public GitHub repository and generates a reliable score, detailed summary, and personalized improvement roadmap — just like feedback from a senior mentor or recruiter.

---

## 🎥 RepoMirror – Project Demo

https://github.com/user-attachments/assets/0d651af9-e177-4296-8d35-a3984b77ba73

---

## 🚀 Project Overview

RepoMirror is a real-world developer tool that helps students and engineers understand the **quality, completeness, and real-world readiness** of their GitHub projects.

Rather than just judging code by superficial metrics, RepoMirror reflects *practical engineering standards* across multiple dimensions and produces:

✔ A score (0–100 & rating)  
✔ A concise, honest summary  
✔ A meaningful, actionable roadmap

---

## 📌 Demo

Enter a GitHub repository URL on the homepage, click **Analyze**, and watch RepoMirror:

1. Animate a multi-step analysis process
2. Score the project
3. Show metrics and insights
4. Provide a personalized roadmap

---

## 🧠 Key Features

### 📊 Comprehensive Evaluation
RepoMirror considers:
- Code quality & readability
- Project structure & organization
- Documentation & clarity
- Test coverage & maintainability
- Commit history consistency
- Tech stack coverage and relevance

### 🧠 Thoughtful Output
The analysis includes:
- **Overall Score** (0–100)
- **Rating** (Fair / Good / Excellent)
- **AI-generated Summary**
- **Detailed Metrics Section**
- **Roadmap with Actionable Steps**
- **Detected Tech Stack Display**

### 🚀 UX & Animation
RepoMirror emphasizes visual feedback:
✔ Animated stepwise progress during analysis  
✔ Clear call-to-action and retry flows  
✔ Consistent, responsive, dark-themed UI  

---

## 🏗️ Architecture
```
Frontend                    Backend
(React + Tailwind)          (Express + Node)
      |                           |
      |    POST /analyze          |
      |-------------------------->|
      |  (Mock AI or real AI)     |
      |                           |
      |      JSON result          |
      |<--------------------------|
```

> For demo mode, the backend uses a deterministic mock AI engine.  
> In production, it can be easily swapped with real LLM API integrations (Claude / OpenAI).

---

## 🛠 Installation — Run Locally

### 📋 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

Check your installation:
```bash
node --version
npm --version
```

### Clone the Repository
```bash
git clone https://github.com/Prabhat-Paul/RepoMirror.git
cd RepoMirror
```

### Backend Setup
```bash
cd server
npm install
npm start
```

Backend runs on: **http://localhost:5000**

### Frontend Setup

In a **new terminal**:
```bash
cd RepoMirrorAi
npm install
npm run dev
```

Open the app in your browser at: **http://localhost:5173**

---

## 📁 Repository Structure
```
RepoMirror/
├── RepoMirrorAi/       # React frontend (Vite)
│   ├── src/
│   │   └── RepoMirror.jsx
│   └── package.json
├── server/             # Node.js backend
│   ├── index.js
│   └── package.json
├── .gitignore
└── README.md
```

---

## 🧪 Example Usage

**Input:**
```
https://github.com/facebook/react
```

**Output includes:**
- Overall Score
- AI Summary
- Detailed metrics
- Personalized Roadmap
- Tech Stack badges

---

## 🧩 How Loading Works

RepoMirror provides an engaging step-by-step analysis animation:

1. Scanning structure
2. Assessing quality
3. Checking docs
4. Testing
5. Commit history review
6. AI insights

Each step updates visually as the analysis runs.

---

## 🤝 Future Enhancements

- 🎯 Support side-by-side repo comparison
- 📄 Export PDF reports
- 📈 Historical analysis tracking
- 🔐 Authenticated user sessions
- ⚡ Integration with GitHub API for real metrics
- 🤖 Real-AI integration (Claude / GPT / Azure OpenAI)

---

## 👨‍💻 Contribution

Contributions are welcome!  
Before you submit:

1. 🌟 Fork the repo
2. 📦 Create a feature branch
3. 🧪 Test before raising a PR

---

## 📜 License

This project is open-source — feel free to use, modify, and distribute.

---

## ⚠️ Note

RepoMirror currently uses a **mock AI analysis engine** to demonstrate the complete end-to-end workflow (UI, scoring, roadmap generation).  
Real AI integration using GitHub APIs and LLMs (Claude / GPT) is planned as a future enhancement.

---

## 💬 About

Built by **Prabhat Paul**  
[GitHub](https://github.com/Prabhat-Paul) | [LinkedIn](https://www.linkedin.com/in/prabhat-paul-8b7169372/)
