import { NextRequest, NextResponse } from "next/server";
import { Ollama } from "ollama";
import { exec } from "child_process";
import util from "util";

const ollama = new Ollama();
const execPromise = util.promisify(exec);

export async function POST(req: NextRequest) {
  try {
    const { code, language } = await req.json();
    if (!code || !language) return NextResponse.json({ error: "Code and language are required." }, { status: 400 });

    const executionResult = await runCodeSandbox(code, language);

    const lintReport = await fetchLinterReport(code, language);

    const explanation = await generateAIExplanation(code, language, executionResult, lintReport);

    return NextResponse.json({ executionResult, lintReport, explanation });
  } catch (error) {
    console.error("Error in AI explanation:", error);
    return NextResponse.json({ error: "Failed to process request." }, { status: 500 });
  }
}

async function runCodeSandbox(code: string, language: string): Promise<string> {
  try {
    let command = "";
    if (language === "javascript") command = `node -e "${code.replace(/"/g, '\\"')}"`;
    if (language === "python") command = `python3 -c "${code.replace(/"/g, '\\"')}"`;
    if (!command) return "Execution not supported for this language.";

    const { stdout, stderr } = await execPromise(command);
    return stderr ? `Error: ${stderr}` : `Output: ${stdout}`;
  } catch (error) {
    return `Execution failed. ${error}`;
  }
}

async function fetchLinterReport(code: string, language: string): Promise<string> {
  try {
    let command = "";
    if (language === "javascript") command = `echo "${code.replace(/"/g, '\\"')}" | eslint --stdin --format json`;
    if (language === "python") command = `echo "${code.replace(/"/g, '\\"')}" | pylint --from-stdin`;
    if (!command) return "Linting not supported for this language.";

    const { stdout, stderr } = await execPromise(command);
    return stderr ? `Lint Error: ${stderr}` : `Lint Report: ${stdout}`;
  } catch (error) {
    return `Linting failed. ${error}`;
  }
}

async function generateAIExplanation(code: string, language: string, executionResult: string, lintReport: string): Promise<string> {
  const prompt = `
    Explain this ${language} code step by step for a new developer.
    - Execution Result: ${executionResult}
    - Linter Report: ${lintReport}
    - Code:\n\`\`\`${language}\n${code}\n\`\`\`
  `;
  const response = await ollama.chat({ model: "llava:13b", messages: [{ role: "user", content: prompt }] });
  return response.message.content.trim();
}
