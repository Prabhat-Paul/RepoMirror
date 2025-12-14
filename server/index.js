import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

/**
 * 🔹 MOCK AI ANALYZER (NO API REQUIRED)
 * Generates realistic analysis based on repo name
 */
function generateAnalysis(owner, repo) {
  const baseScore = Math.floor(Math.random() * 20) + 65; // 65–85
  const techStacks = {
    react: ["React", "JavaScript", "JSX"],
    next: ["Next.js", "React", "Node.js"],
    api: ["Node.js", "Express", "REST API"],
    ml: ["Python", "Machine Learning", "NumPy"],
    default: ["JavaScript", "HTML", "CSS"]
  };

  const key = Object.keys(techStacks).find(k =>
    repo.toLowerCase().includes(k)
  ) || "default";

  return {
    overallScore: baseScore,
    rating:
      baseScore >= 85 ? "Excellent" :
      baseScore >= 70 ? "Good" : "Fair",

    summary:
      "The repository demonstrates a structured approach with clear intent. Core functionality is implemented well, but documentation, testing, and workflow automation can be improved to meet industry standards.",

    stats: {
      files: Math.floor(Math.random() * 40) + 20,
      commits: Math.floor(Math.random() * 120) + 30,
      branches: Math.floor(Math.random() * 4) + 1,
      languages: techStacks[key].length
    },

    metrics: {
      codeQuality: baseScore - 5,
      projectStructure: baseScore - 3,
      documentation: baseScore - 15,
      testCoverage: baseScore - 20,
      commitHistory: baseScore - 8,
      techStack: baseScore
    },

    roadmap: [
      {
        title: "Improve README documentation",
        priority: "High Priority",
        description:
          "Add a clear project overview, setup instructions, and usage examples to help reviewers and collaborators understand the project quickly.",
        icon: "readme"
      },
      {
        title: "Add unit and integration tests",
        priority: "High Priority",
        description:
          "Introduce testing using Jest or similar frameworks to ensure reliability and long-term maintainability.",
        icon: "linting"
      },
      {
        title: "Refactor folder structure",
        priority: "Medium Priority",
        description:
          "Organize components, services, and utilities into dedicated folders for better scalability.",
        icon: "package"
      },
      {
        title: "Adopt Git best practices",
        priority: "Medium Priority",
        description:
          "Use feature branches, meaningful commit messages, and pull requests to reflect professional workflows.",
        icon: "gitignore"
      },
      {
        title: "Add CI/CD pipeline",
        priority: "Suggested",
        description:
          "Automate testing and linting using GitHub Actions to improve code quality and deployment readiness.",
        icon: "license"
      }
    ],

    techStack: techStacks[key]
  };
}

app.post("/analyze", (req, res) => {
  const { owner, repo } = req.body;

  if (!owner || !repo) {
    return res.status(400).json({ error: "Invalid repository data" });
  }

  const analysis = generateAnalysis(owner, repo);
  res.json(analysis);
});

app.listen(5000, () => {
  console.log("✅ RepoMirror backend running on http://localhost:5000");
});
