import React, { useState } from 'react';
import { Search, Github, Sparkles, BarChart3, Wrench, Code2, FileText, GitBranch, TestTube, FolderTree, Clock, Layers, ChevronRight, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';

const RepoMirror = () => {
  const [showResults, setShowResults] = useState(false);
  const [repoUrl, setRepoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');
  const [loadingSteps, setLoadingSteps] = useState([
    { id: 1, text: 'Scanning repository structure...', status: 'pending', icon: 'folder' },
    { id: 2, text: 'Analyzing code quality...', status: 'pending', icon: 'code' },
    { id: 3, text: 'Evaluating documentation...', status: 'pending', icon: 'file' },
    { id: 4, text: 'Checking test coverage...', status: 'pending', icon: 'test' },
    { id: 5, text: 'Reviewing commit history...', status: 'pending', icon: 'git' },
    { id: 6, text: 'Generating AI insights...', status: 'pending', icon: 'sparkles' }
  ]);

  const parseGitHubUrl = (url) => {
    const regex = /github\.com\/([^\/]+)\/([^\/]+)/;
    const match = url.match(regex);
    if (match) {
      return { owner: match[1], repo: match[2].replace('.git', '') };
    }
    return null;
  };

  const updateLoadingStep = (stepId, status) => {
    setLoadingSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, status } : step
    ));
  };

  const simulateLoadingProgress = async () => {
    const delays = [800, 1200, 1000, 1400, 900, 1500];
    for (let i = 0; i < loadingSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, delays[i]));
      updateLoadingStep(i + 1, i < loadingSteps.length - 1 ? 'complete' : 'active');
    }
  };

  const exampleRepos = [
    'facebook/react',
    'vercel/next.js',
    'tailwindlabs/tailwindcss'
  ];

  const analyzeRepository = async () => {
  setError("");
  setAnalysis(null);
  setShowResults(false);
  setLoading(true);

  // reset steps
  setLoadingSteps(prev =>
    prev.map(step => ({ ...step, status: "pending" }))
  );

  const parsed = parseGitHubUrl(repoUrl);
  if (!parsed) {
    setError("Invalid GitHub URL. Please enter a valid repository URL.");
    setLoading(false);
    return;
  }

  const { owner, repo } = parsed;

  // START animation
  simulateLoadingProgress();

  try {
    const response = await fetch("http://localhost:5000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ owner, repo })
    });

    if (!response.ok) {
      throw new Error("Analysis failed");
    }

    const analysisData = await response.json();

    // WAIT for animation to finish
    await new Promise(resolve => setTimeout(resolve, 8000));

    setAnalysis({
      ...analysisData,
      repoName: repo,
      repoOwner: owner,
      repoFullName: `${owner}/${repo}`,
      repoUrl: `https://github.com/${owner}/${repo}`
    });

    setShowResults(true);

  } catch (err) {
    console.error(err);
    setError("❌ Failed to analyze repository. Please try again.");
  } finally {
    setLoading(false);
  }
};


  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getRatingColor = (rating) => {
    if (rating === 'Excellent') return 'text-emerald-400';
    if (rating === 'Good') return 'text-cyan-400';
    return 'text-yellow-400';
  };

  const getPriorityColor = (priority) => {
    if (priority === 'High Priority') return 'bg-red-500/20 text-red-300 border-red-500/30';
    if (priority === 'Medium Priority') return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
  };

  const getIconForRoadmap = (iconName) => {
    const icons = {
      'gitignore': <FileText className="w-5 h-5" />,
      'package': <Code2 className="w-5 h-5" />,
      'readme': <FileText className="w-5 h-5" />,
      'linting': <Wrench className="w-5 h-5" />,
      'license': <FileText className="w-5 h-5" />
    };
    return icons[iconName] || <Code2 className="w-5 h-5" />;
  };

  const getIconForLoadingStep = (iconName) => {
    const icons = {
      'folder': <FolderTree className="w-5 h-5" />,
      'code': <Code2 className="w-5 h-5" />,
      'file': <FileText className="w-5 h-5" />,
      'test': <TestTube className="w-5 h-5" />,
      'git': <GitBranch className="w-5 h-5" />,
      'sparkles': <Sparkles className="w-5 h-5" />
    };
    return icons[iconName] || <Code2 className="w-5 h-5" />;
  };

  if (loading && !analysis) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-gray-100 flex items-center justify-center">
        <div className="max-w-2xl w-full px-6">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Code2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Analyzing Repository</h2>
            <p className="text-gray-400">This may take a moment...</p>
          </div>

          <div className="space-y-4 mb-8">
            {loadingSteps.map((step) => (
              <div
                key={step.id}
                className={`
                  bg-gradient-to-br from-gray-900 to-gray-800 border rounded-xl p-5 transition-all duration-500
                  ${step.status === 'complete' ? 'border-emerald-500/50 bg-emerald-500/5' : 
                    step.status === 'active' ? 'border-cyan-500/50 bg-cyan-500/5 scale-105' : 
                    'border-gray-700'}
                `}
              >
                <div className="flex items-center gap-4">
                  <div className={`
                    w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300
                    ${step.status === 'complete' ? 'bg-emerald-500/20 text-emerald-400' :
                      step.status === 'active' ? 'bg-cyan-500/20 text-cyan-400' :
                      'bg-gray-700 text-gray-500'}
                  `}>
                    {step.status === 'complete' ? (
                      <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : step.status === 'active' ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      getIconForLoadingStep(step.icon)
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`
                      font-medium transition-colors duration-300
                      ${step.status === 'complete' ? 'text-emerald-400' :
                        step.status === 'active' ? 'text-cyan-400' :
                        'text-gray-500'}
                    `}>
                      {step.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Analysis Progress</span>
              <span className="text-sm font-semibold text-cyan-400">
                {loadingSteps.filter(s => s.status === 'complete').length} / {loadingSteps.length}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-500 ease-out"
                style={{
                  width: `${(loadingSteps.filter(s => s.status === 'complete').length / loadingSteps.length) * 100}%`
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (analysis) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
        <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">RepoMirror</h1>
                <p className="text-xs text-gray-400">AI Code Analysis</p>
              </div>
            </div>
            <button
              onClick={() => setAnalysis(null)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Analyze another repository
            </button>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <p className="text-sm text-gray-400 mb-2">Analysis complete for</p>
            <h2 className="text-3xl font-bold text-cyan-400 mb-2">{analysis.repoFullName}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-1">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8">
                <p className="text-sm text-gray-400 mb-4 text-center">Overall Score</p>
                <div className="relative w-48 h-48 mx-auto">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      stroke="#1f2937"
                      strokeWidth="16"
                      fill="none"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      stroke="url(#gradient)"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray={`${analysis.overallScore * 5.02} 502`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#ef4444" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className={`text-5xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                      {analysis.overallScore}
                    </div>
                    <div className={`text-lg font-semibold ${getRatingColor(analysis.rating)} mt-1`}>
                      {analysis.rating}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-xl font-bold">AI Summary</h3>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">{analysis.summary}</p>
                
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{analysis.stats.files}</div>
                    <div className="text-xs text-gray-400">Files</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{analysis.stats.commits}</div>
                    <div className="text-xs text-gray-400">Commits</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{analysis.stats.branches}</div>
                    <div className="text-xs text-gray-400">Branches</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{analysis.stats.languages}</div>
                    <div className="text-xs text-gray-400">Languages</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
              <h3 className="text-xl font-bold">Detailed Metrics</h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(analysis.metrics).map(([key, value]) => {
                const icons = {
                  codeQuality: <Code2 className="w-6 h-6 text-cyan-400" />,
                  projectStructure: <FolderTree className="w-6 h-6 text-yellow-400" />,
                  documentation: <FileText className="w-6 h-6 text-orange-400" />,
                  testCoverage: <TestTube className="w-6 h-6 text-cyan-400" />,
                  commitHistory: <Clock className="w-6 h-6 text-emerald-400" />,
                  techStack: <Layers className="w-6 h-6 text-emerald-400" />
                };
                
                const labels = {
                  codeQuality: 'Code Quality',
                  projectStructure: 'Project Structure',
                  documentation: 'Documentation',
                  testCoverage: 'Test Coverage',
                  commitHistory: 'Commit History',
                  techStack: 'Tech Stack'
                };

                return (
                  <div key={key} className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
                    <div className="flex items-center gap-3 mb-3">
                      {icons[key]}
                      <div>
                        <div className="text-sm text-gray-400">{labels[key]}</div>
                        <div className="text-2xl font-bold text-white">{value}</div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Wrench className="w-5 h-5 text-cyan-400" />
              <h3 className="text-xl font-bold">Personalized Roadmap</h3>
            </div>
            <p className="text-sm text-gray-400 mb-6">Actionable steps to improve your repository</p>

            <div className="space-y-4">
              {analysis.roadmap.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 hover:border-cyan-500/50 transition-all group cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center text-cyan-400 flex-shrink-0">
                      {getIconForRoadmap(item.icon)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(item.priority)}`}>
                          {item.priority}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-5 h-5 text-cyan-400" />
              <h3 className="text-xl font-bold">Detected Tech Stack</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysis.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-gray-800 rounded-lg text-sm font-medium text-gray-300 border border-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">RepoMirror</h1>
              <p className="text-xs text-gray-400">AI Code Analysis</p>
            </div>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Github className="w-4 h-4" />
            <span className="text-sm font-medium">GitHub</span>
          </a>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          AI-Powered Repository Analysis
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Your Code, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Reflected</span>
        </h1>

        <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          Transform any GitHub repository into actionable insights. Get a comprehensive score, honest feedback, and a personalized roadmap to level up your code.
        </p>

        <div className="flex items-center justify-center gap-8 mb-16">
          <div className="flex items-center gap-2 text-gray-300">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            <span className="text-sm">Quality Scoring</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Wrench className="w-5 h-5 text-cyan-400" />
            <span className="text-sm">Deep Analysis</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-sm">AI Mentorship</span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8">
            <div className="flex gap-3 mb-4">
              <div className="flex-1 relative">
                <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/username/repository"
                  className="w-full pl-12 pr-4 py-4 bg-gray-800 text-white placeholder-gray-500 rounded-xl border border-gray-700 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  onKeyPress={(e) => e.key === 'Enter' && analyzeRepository()}
                />
              </div>
              <button
                onClick={analyzeRepository}
                disabled={loading || !repoUrl}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 whitespace-nowrap"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Analyze
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold mb-1">Error</div>
                  <div className="text-sm whitespace-pre-line">{error}</div>
                </div>
              </div>
            )}

            {!error && (
              <>
                <p className="text-sm text-gray-400 mb-3">Try with example repositories:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {exampleRepos.map((repo) => (
                    <button
                      key={repo}
                      onClick={() => setRepoUrl(`https://github.com/${repo}`)}
                      className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-300 border border-gray-700 hover:border-gray-600 transition-all"
                    >
                      {repo}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoMirror;