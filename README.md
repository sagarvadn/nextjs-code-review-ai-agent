 # 🚀 AI Code Explainer
 ### **📜 A simple Next.js Code Explainer AI Agent** 

AI Code Explainer is a **Next.js AI-powered agent** that breaks down complex code into **step-by-step explanations** to help junior developers understand it easily. The AI agent goes beyond basic LLM capabilities by integrating **sandboxed execution** and **linters** to provide accurate, structured insights before querying the LLM.  

## 🛠️ Features  
- 📝 **Explain complex code** in a step-by-step manner.  
- 🔍 **Static analysis using linters** (e.g., ESLint, Pylint) before explanation.  
- ⚙️ **Sandboxed execution** to analyze code behavior before querying the LLM.  
- 🎨 **Modern UI with Tailwind CSS** and **Monaco Code Editor**.  
- ⚡ **Optimized AI agent flows** beyond simple prompt engineering.  


## 📦 Tech Stack  
- **Next.js (App Router)** – Modern React framework for building the app.  
- **TypeScript** – Type safety and better developer experience.  
- **Tailwind CSS** – For styling a sleek, responsive UI.  
- **Monaco Editor** – A VS Code-like experience for writing code in the app.  
- **Ollama (Local LLM runtime)** – Runs the AI model locally.  
- **LLava 13B** – The **LLM (Large Language Model)** used for code explanations.  


## 🔧 Setup & Installation  

### **1️⃣ Install Ollama & Run the LLM**  
This project requires **Ollama** to run a local LLM. Install Ollama and download the **LLava 13B** model:  

```sh
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Download and start the LLava 13B model
ollama pull llava:13b
ollama serve
```

### **2️⃣ Clone & Install Dependencies**  
```sh
git clone https://github.com/YOUR_USERNAME/ai-code-explainer.git
cd ai-code-explainer
npm install  # or yarn install
```

### **3️⃣ Start the App**  
```sh
npm run dev  # or yarn dev
```
The app will be running at **http://localhost:3000** 🚀  


## 🎯 Usage  
1. **Paste your code** into the editor.  
2. **Click "Submit Code"** to analyze and explain it.  
3. The AI will:  
   - **Run linters** to detect issues.  
   - **Execute the code in a sandbox** to analyze behavior.  
   - **Query the LLM (LLava 13B) for explanations**.  
   - **Provide a structured breakdown** of how the code works.  
4. The explanation will be displayed below, and the UI will **auto-scroll** to show results.  


## 🛠️ Future Improvements  
- ✅ **Support for multiple programming languages**.  
- ✅ **More advanced AI workflows & plugins**.  
- ✅ **Customization options for different levels of explanations (Beginner, Intermediate, Advanced)**.  


## 🎓 License  
This project is **open-source** under the MIT License. Contributions are welcome!  


💡 **Built using Next.js, Tailwind, and AI-powered workflows.**