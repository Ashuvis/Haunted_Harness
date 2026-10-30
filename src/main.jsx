import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const installCommands = `python -m pip install ollama
ollama pull llama3.2:1b
python .\\haunted_harness.py .\\your_file.py`;

const deployCommands = `npm install
npm run build`;

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <button className="copy-button" onClick={copy} type="button">
      {copied ? "Copied ✓" : "Copy"}
    </button>
  );
}

function CodeCard({ label, children, copyValue }) {
  return (
    <div className="code-card">
      <div className="code-header">
        <span>{label}</span>
        {copyValue && <CopyButton value={copyValue} />}
      </div>
      <pre><code>{children}</code></pre>
    </div>
  );
}

const features = [
  ["01", "Local by design", "Your source is sent to Ollama on your machine, not a hosted AI API."],
  ["02", "Explain any file", "Point the harness at Python, JSON, Markdown, or another text file."],
  ["03", "Simple CLI", "One command gives you a readable rundown of purpose, functions, and flow."],
];

const faqs = [
  ["“ollama” is not recognized", "Install Ollama, then reopen PowerShell so the updated PATH is loaded. Verify with ollama --version."],
  ["The port is already in use", "Port 11434 is probably already serving Ollama. Query http://127.0.0.1:11434/api/tags; HTTP 200 confirms it."],
  ["The explanation contains mistakes", "The default 1B model is small. Try qwen2.5-coder:3b for stronger source-code explanations."],
  ["Can the hosted page read my files?", "No. This React site is static documentation. The Python harness and Ollama model run locally on your computer."],
];

function App() {
  return (
    <div className="site-shell">
      <div className="fog fog-one" />
      <div className="fog fog-two" />
      <div className="bat bat-one">ᵔᴥᵔ</div>
      <div className="bat bat-two">ᵔᴥᵔ</div>
      <div className="pumpkin pumpkin-one">🎃</div>
      <div className="pumpkin pumpkin-two">🎃</div>
      <header className="site-header frame">
        <a className="brand" href="#top" aria-label="Haunted Harness home">
          <span className="brand-symbol">☽</span>
          <span>HAUNTED <em>HARNESS</em></span>
        </a>
        <nav>
          <a href="#features">Features</a>
          <a href="#install">The ritual</a>
          <a href="#faq">FAQ</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero frame">
          <div className="hero-copy">
            <p className="kicker">☾ HALLOWEEN EDITION / LOCAL CODE EXPLAINER / 001</p>
            <h1>Understand the <span>unknown</span> inside your code.</h1>
            <p className="hero-text">
              A private Python utility powered by Ollama. Summon a clear rundown of any local source file
              without sending your code beyond the veil.
            </p>
            <div className="hero-actions">
              <a className="button button-light" href="#install">Begin the ritual <span>↘</span></a>
              <a className="text-link" href="#features">Explore the haunting <span>→</span></a>
            </div>
          </div>
          <div className="hero-art" aria-label="A spectral illustration">
            <div className="moon-ring" />
            <div className="moon" />
            <div className="specter">
              <div className="specter-eyes"><i /><i /></div>
              <div className="specter-mouth">⌣</div>
              <div className="specter-tail">∿∿∿</div>
            </div>
            <span className="star star-one">✦</span>
            <span className="star star-two">·</span>
            <span className="star star-three">✧</span>
            <div className="terminal-card">
              <span className="terminal-dot" />
              <span className="terminal-dot" />
              <span className="terminal-dot" />
              <p><b>$</b> python haunted_harness.py app.py</p>
              <p className="terminal-muted">Reading the source...</p>
              <p className="terminal-ok">Rundown summoned ✓</p>
            </div>
          </div>
        </section>

        <section id="features" className="section frame">
          <div className="section-label">THE APPARITION</div>
          <div className="section-title-row">
            <h2>Small tool.<br /><span>Clearer code.</span></h2>
            <p>Haunted Harness turns a local file into an understandable story: what it is, what it does, and how its pieces move.</p>
          </div>
          <div className="feature-grid">
            {features.map(([number, title, description]) => (
              <article className="feature" key={number}>
                <span className="feature-number">{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="feature-arrow">↗</span>
              </article>
            ))}
          </div>
        </section>

        <section id="install" className="section install-section frame">
          <div className="section-label">SUMMON THE HARNESS</div>
          <div className="section-title-row">
            <h2>Three steps into<br /><span>the fog.</span></h2>
            <p>Ollama performs the inference. The Python harness reads the file and prints the explanation in your terminal.</p>
          </div>
          <div className="ritual-grid">
            <div className="ritual-steps">
              <div className="ritual-step"><b>01</b><div><h3>Install the tools</h3><p>Install Python 3.10+ and Ollama.</p></div></div>
              <div className="ritual-step"><b>02</b><div><h3>Choose a model</h3><p>Start lightweight, or use a coding model for stronger explanations.</p></div></div>
              <div className="ritual-step"><b>03</b><div><h3>Point at a file</h3><p>Pass any local source path to summon its rundown.</p></div></div>
            </div>
            <CodeCard label="POWERSHELL" copyValue={installCommands}>{installCommands}</CodeCard>
          </div>
          <div className="warning"><span>☽</span><p><strong>Keep the terminal alive.</strong> Ollama must be running locally. If port 11434 is already occupied, it is likely already running.</p></div>
        </section>

        <section className="section examples-section frame">
          <div className="section-label">TARGET PRACTICALLY ANY TEXT FILE</div>
          <div className="example-grid">
            <CodeCard label="SINGLE FILE">python .\haunted_harness.py .\src\main.py</CodeCard>
            <CodeCard label="DOCUMENTATION">python .\haunted_harness.py .\README.md</CodeCard>
            <CodeCard label="STRONGER MODEL">{"$env:HAUNTED_MODEL = \"qwen2.5-coder:3b\"\npython .\\haunted_harness.py .\\app.py"}</CodeCard>
          </div>
        </section>

        <section id="faq" className="section frame">
          <div className="section-label">THE HOUSE RULES</div>
          <div className="section-title-row">
            <h2>When the veil<br /><span>gets foggy.</span></h2>
            <p>A few answers before you enter the crypt.</p>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}<span>+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer frame">
        <div><span className="brand-symbol">☾</span> HAUNTED <em>HARNESS</em></div>
        <p>LOCAL INFERENCE · NO API KEY · OPEN MODEL RUNTIME</p>
        <CodeCard label="BUILD THE PAGE" copyValue={deployCommands}>{deployCommands}</CodeCard>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode><App /></StrictMode>,
);
