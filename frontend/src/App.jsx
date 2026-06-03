import React, { useState } from 'react';
import { Search, BookOpen, AlertTriangle, Cpu, Globe, Database, HelpCircle, Layers, CheckCircle } from 'lucide-react';

const SAMPLE_GAPS = {
  "artificial intelligence": [
    {
      id: 1,
      title: "Sample-Efficient Continual Learning in Non-Stationary Environments",
      severity: "high",
      confidence: "94%",
      description: "Existing deep neural networks suffer from catastrophic forgetting when trained on non-stationary data streams. Current mitigations (replay buffers, regularization) scale poorly or require static task boundaries.",
      domain: "AI / Deep Learning",
      nextSteps: "Research meta-learning architectures that dynamically adjust learning rates per neuron group or leverage bio-inspired neuromorphic plasticity."
    },
    {
      id: 2,
      title: "Real-time Verification of LLM Output Logits for Hallucination Prevention",
      severity: "medium",
      confidence: "88%",
      description: "Detecting hallucinations in generative models is usually done post-generation. There is a lack of low-latency, token-level confidence calibration frameworks that can halt generation mid-sentence.",
      domain: "Natural Language Processing",
      nextSteps: "Design conformal prediction bounds on token logits that interface directly with decoding search algorithms."
    },
    {
      id: 3,
      title: "Standardized Evaluation for Multi-Agent Collaboration Benchmarks",
      severity: "low",
      confidence: "81%",
      description: "While multi-agent systems demonstrate emergent behaviors, current benchmarks are static and easily overfitted, lacking dynamic adversarial scenarios to test agent collaboration resiliency.",
      domain: "Multi-Agent Systems",
      nextSteps: "Develop sandbox environments with dynamic environment updates to measure adaptive task reallocation in agents."
    }
  ],
  "quantum computing": [
    {
      id: 1,
      title: "Error Mitigation Strategies for Intermediate-Scale Qudit Systems",
      severity: "high",
      confidence: "92%",
      description: "Most quantum error correction codes target qubits (2-state systems). The transition to qudits (d-state systems, d > 2) offers higher information density but suffers from highly complex phase error configurations.",
      domain: "Quantum Hardware / Qudits",
      nextSteps: "Develop multi-valued logic analogs to Surface Codes and validate on topological superconducting qubits."
    },
    {
      id: 2,
      title: "Hybrid Classical-Quantum Algorithms for Sparse Matrix Inversion",
      severity: "medium",
      confidence: "85%",
      description: "Harrow-Hassidim-Lloyd (HHL) algorithm offers exponential speedup but requires fault-tolerant hardware. Current NISQ-friendly variational alternatives struggle with barren plateaus for large sparse matrices.",
      domain: "Quantum Algorithms",
      nextSteps: "Explore quantum-assisted preconditioners for classical conjugate gradient solvers."
    }
  ]
};

export default function App() {
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedQuery, setAnalyzedQuery] = useState('');
  const [gaps, setGaps] = useState([]);
  const [metrics, setMetrics] = useState({
    papers: 0,
    gapsCount: 0,
    confidenceAvg: '0%',
    severityHigh: 0
  });

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate analyzing literature / running RAG pipeline
    setTimeout(() => {
      const formattedQuery = query.toLowerCase().trim();
      let foundGaps = [];
      
      // Check if we have sample data for the keyword, else generate a generic gap
      const matchingKey = Object.keys(SAMPLE_GAPS).find(key => formattedQuery.includes(key) || key.includes(formattedQuery));
      
      if (matchingKey) {
        foundGaps = SAMPLE_GAPS[matchingKey];
      } else {
        foundGaps = [
          {
            id: Date.now(),
            title: `Unexplored Structural Dynamics in ${query}`,
            severity: "high",
            confidence: "87%",
            description: `A critical gap exists in modeling the long-term temporal dependencies and non-linear interactions within ${query} datasets under high dimensionality.`,
            domain: "General Domain Analysis",
            nextSteps: `Conduct longitudinal studies or build high-fidelity simulations to isolate confounding external variables.`
          },
          {
            id: Date.now() + 1,
            title: `Cross-disciplinary Integration Gap for ${query} Frameworks`,
            severity: "medium",
            confidence: "79%",
            description: `Current academic literature evaluates ${query} from localized domain contexts. There is a clear omission of standard interfaces linking these models with modern predictive frameworks.`,
            domain: "Systems Engineering",
            nextSteps: `Establish unified terminology standards and build open-source translator microservices.`
          }
        ];
      }

      setGaps(foundGaps);
      setAnalyzedQuery(query);
      setMetrics({
        papers: Math.floor(Math.random() * 80) + 120,
        gapsCount: foundGaps.length,
        confidenceAvg: foundGaps.length ? `${Math.round(foundGaps.reduce((acc, curr) => acc + parseInt(curr.confidence), 0) / foundGaps.length)}%` : '0%',
        severityHigh: foundGaps.filter(g => g.severity === 'high').length
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="logo-section">
          <div className="logo-icon">
            <Search size={22} />
          </div>
          <span className="logo-text">GapAnalyzer</span>
          <span className="badge-beta">v1.0.0</span>
        </div>
        <nav className="nav-links">
          <a href="#" className="nav-link active">Analyzer</a>
          <a href="#" className="nav-link">Literature Feed</a>
          <a href="#" className="nav-link">Database</a>
        </nav>
      </header>

      {/* Main Grid Content */}
      <main className="main-content">
        
        {/* Left Control Panel */}
        <section className="panel">
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Search & Extraction</h2>
          <form onSubmit={handleAnalyze}>
            <div className="form-group">
              <label className="form-label">Research Field or Topic</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Artificial Intelligence, Quantum computing"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isAnalyzing}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Scraping Sources</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ accentColor: 'var(--color-primary)' }} /> arXiv & CrossRef
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ accentColor: 'var(--color-primary)' }} /> PubMed / IEEE Xplore
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ accentColor: 'var(--color-primary)' }} /> Semantic Scholar API
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">RAG Pipeline Mode</label>
              <select className="form-input" style={{ appearance: 'none' }}>
                <option value="dense">Dense Embedding Semantic Search</option>
                <option value="sparse">Sparse BM25 Keyword Search</option>
                <option value="hybrid">Hybrid (Dense + Sparse)</option>
              </select>
            </div>

            <button type="submit" className="btn-primary" disabled={isAnalyzing}>
              {isAnalyzing ? (
                <>
                  <div className="pulse-badge" style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%' }}></div>
                  Scanning Literature...
                </>
              ) : (
                <>
                  <Cpu size={18} />
                  Analyze Gaps
                </>
              )}
            </button>
          </form>

          <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-accent)' }}>
              <Globe size={14} /> Pipeline Status
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Embeddings Index: <strong>Active</strong><br />
              Connected VectorDB: <strong>Local ChromaDB</strong><br />
              Scraper Daemon: <strong>Idle</strong>
            </p>
          </div>
        </section>

        {/* Right Dashboard Results Panel */}
        <section className="dashboard">
          
          {/* Welcome/Empty State or Results Header */}
          {!analyzedQuery && !isAnalyzing ? (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '4rem 2rem' }}>
              <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
                <BookOpen size={48} className="text-secondary" style={{ color: 'var(--color-primary)' }} />
              </div>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Initiate Academic Gap Analysis</h2>
              <p style={{ maxWidth: '600px', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Enter a scientific domain or research query in the control panel. Our RAG-powered engine will parse indexing databases, construct vector embeddings, cluster literature embeddings, and extract key structural gaps.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button onClick={() => { setQuery('Artificial Intelligence'); }} className="form-input" style={{ width: 'auto', cursor: 'pointer' }}>Try "Artificial Intelligence"</button>
                <button onClick={() => { setQuery('Quantum computing'); }} className="form-input" style={{ width: 'auto', cursor: 'pointer' }}>Try "Quantum computing"</button>
              </div>
            </div>
          ) : isAnalyzing ? (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '6rem 2rem' }}>
              <div style={{ position: 'relative', width: '80px', height: '80px', marginBottom: '2rem' }}>
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  border: '4px solid var(--card-border)',
                  borderTopColor: 'var(--color-primary)',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
              </div>
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Extracting Literature Clusters</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Scanning research repositories, generating sparse/dense embeddings, and running clustering algorithms...</p>
            </div>
          ) : (
            <>
              {/* Metrics Row */}
              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-val">{metrics.papers}</div>
                  <div className="metric-label">Papers Parsed</div>
                </div>
                <div className="metric-card">
                  <div className="metric-val">{metrics.gapsCount}</div>
                  <div className="metric-label">Gaps Identified</div>
                </div>
                <div className="metric-card">
                  <div className="metric-val">{metrics.confidenceAvg}</div>
                  <div className="metric-label">Avg Confidence</div>
                </div>
                <div className="metric-card">
                  <div className="metric-val">{metrics.severityHigh}</div>
                  <div className="metric-label">High Severity</div>
                </div>
              </div>

              {/* Gaps List */}
              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.5rem' }}>Discovered Research Gaps</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Identified systemic blindspots for search query: <strong style={{ color: 'var(--color-accent)' }}>"{analyzedQuery}"</strong></p>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sorted by priority</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {gaps.map((gap) => (
                    <div key={gap.id} className="gap-item">
                      <div className="gap-meta">
                        <span className={`gap-tag ${gap.severity}`}>{gap.severity} severity</span>
                        <span className="gap-confidence">Confidence Match: <strong>{gap.confidence}</strong></span>
                      </div>
                      <h4 className="gap-title">{gap.title}</h4>
                      <p className="gap-desc">{gap.description}</p>
                      
                      <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: '1rem', marginTop: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          <CheckCircle size={14} style={{ color: 'var(--color-accent)' }} />
                          <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)' }}>Recommended Next Steps</span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{gap.nextSteps}</p>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <span style={{ background: 'var(--bg-secondary)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>Domain: {gap.domain}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2026 Research Gap Analyzer. Crafted for high-fidelity literature modeling.</p>
      </footer>
    </div>
  );
}
