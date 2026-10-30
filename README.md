# Haunted Harness 👻

Haunted Harness is a Halloween-themed local code explainer. It reads a source
file and uses an Ollama model running on your computer to produce a concise
walkthrough of the file's purpose, imports, functions, and execution flow.

The project also includes a React/Vite landing page with installation
instructions, examples, and troubleshooting guidance.

## Features

- Runs inference locally through Ollama.
- Keeps source files on your machine.
- Accepts a file path from the command line.
- Explains Python, Markdown, JSON, and other text-based files.
- Supports model selection through `HAUNTED_MODEL`.
- Includes a responsive, monochrome Halloween-themed React landing page.
- Provides copy-to-clipboard command examples and an FAQ.

## Project structure

```text
haunted_code/
├── haunted_harness.py   # Local Ollama-powered source-file explainer
├── src/
│   ├── main.jsx         # React landing page
│   └── styles.css       # Grey-and-white haunted theme
├── index.html           # Vite entry document
├── package.json         # React/Vite scripts and dependencies
├── vite.config.js       # Vite configuration
├── vercel.json          # Static Vercel configuration
└── .gitignore
```

## Requirements

- Python 3.10 or newer
- Ollama
- Node.js and npm for the landing page
- An Ollama model, such as `llama3.2:1b`

## Run the Python harness

### 1. Install the Ollama Python package

From the project directory:

```powershell
python -m pip install ollama
```

### 2. Start Ollama

Ollama may start automatically after installation. If it is not running:

```powershell
ollama serve
```

Check that its API is available:

```powershell
Invoke-WebRequest http://127.0.0.1:11434/api/tags
```

An HTTP 200 response means the API is responding.

### 3. Download a model

```powershell
ollama pull llama3.2:1b
```

The harness uses `llama3.2:1b` by default.

### 4. Explain a file

```powershell
python .\haunted_harness.py .\README.md
```

Other examples:

```powershell
python .\haunted_harness.py .\src\main.jsx
python .\haunted_harness.py .\config.json
python .\haunted_harness.py .\haunted_harness.py
```

If no filepath is provided, the harness explains its default file:

```powershell
python .\haunted_harness.py
```

### Use a different model

Coding-focused models may provide stronger explanations:

```powershell
ollama pull qwen2.5-coder:3b
$env:HAUNTED_MODEL = "qwen2.5-coder:3b"
python .\haunted_harness.py .\app.py
```

On macOS or Linux:

```bash
export HAUNTED_MODEL=qwen2.5-coder:3b
python haunted_harness.py ./app.py
```

## Run the React landing page

Install the JavaScript dependencies:

```powershell
npm install
```

Start the Vite development server:

```powershell
npm run dev
```

Build the production site:

```powershell
npm run build
```

Preview the production build locally:

```powershell
npm run preview
```

### Important deployment limitation

Vercel hosts the landing page only. It cannot access Ollama running on your
local computer, and a deployed page cannot read arbitrary files from your
computer. The Python harness and Ollama model remain local.

Do not configure a deployed function to use:

```text
http://localhost:11434
```

On Vercel, `localhost` refers to the temporary Vercel environment, not your
Windows machine.

## Troubleshooting

### `ollama` is not recognized

Install Ollama, close PowerShell, and open a new PowerShell window. Then run:

```powershell
ollama --version
```

### Port 11434 is already in use

This commonly means Ollama is already running. Check its API:

```powershell
Invoke-WebRequest http://127.0.0.1:11434/api/tags
```

Do not start a second `ollama serve` process if the API returns HTTP 200.

### The model refuses or gives inaccurate explanations

Small models can misunderstand source code or produce invented details. Try a
larger coding-focused model:

```powershell
ollama pull qwen2.5-coder:3b
$env:HAUNTED_MODEL = "qwen2.5-coder:3b"
```

Treat the generated rundown as an assistant's explanation, not a substitute
for tests, documentation, or human review.

## Privacy

The Python harness sends the selected file contents to the Ollama API running
on your machine. Avoid selecting files that contain secrets if you do not want
them included in the local model prompt. The project does not provide a hosted
backend for source analysis.

## License

No license has been specified yet. Add a license before distributing the
project or accepting external contributions.
