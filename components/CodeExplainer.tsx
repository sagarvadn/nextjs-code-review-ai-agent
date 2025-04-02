"use client";

import { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "./ui/Button";
import { Card, CardContent } from "./ui/Card";
import { Select, SelectItem } from "./ui/Select";

export default function CodeExplainer() {
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [loading, setLoading] = useState(false);
    const [executionResult, setExecutionResult] = useState("");
    const [lintReport, setLintReport] = useState("");
    const [explanation, setExplanation] = useState("");
    const resultRef = useRef<HTMLDivElement>(null);

    async function submitCode() {
        setLoading(true);
        setExecutionResult("");
        setLintReport("");
        setExplanation("");

        try {
            const res = await fetch("/api/explain", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code, language }),
            });
            const data = await res.json();

            setExecutionResult(data.executionResult || "No execution result.");
            setLintReport(data.lintReport || "No lint report.");
            setExplanation(data.explanation || "No explanation available.");

            setTimeout(() => {
                resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 200);
        } catch (error) {
            setExplanation(`Error processing request. ${error}`);
        }
        setLoading(false);
    }

    return (
        <div className="flex flex-col items-center p-6 space-y-6 bg-gray-900 min-h-screen text-white">
            <h1 className="text-2xl font-bold">AI Code Explainer</h1>
            <h2 className="text-xl font-bold">Breaking down complex code into simple terms</h2>

            <p className="text-sm mt-10 font-bold">Select language</p>

            <Select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-64">
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
            </Select>

            <Card className="w-full max-w-4xl">
                <CardContent className="p-4">
                    <Editor
                        height="300px"
                        language={language}
                        theme="vs-dark"
                        value={code}
                        onChange={(value) => setCode(value || "")}
                    />
                </CardContent>
            </Card>

            <Button onClick={submitCode} disabled={loading} className="bg-blue-500 hover:bg-blue-600">
                {loading ? "Processing..." : "Submit Code"}
            </Button>

            {executionResult && (
                <div ref={resultRef} className="w-full max-w-4xl">
                    <Card>
                        <CardContent className="p-4 bg-gray-800">
                            <h2 className="text-lg font-bold text-green-400">Execution Result</h2>
                            <pre className="whitespace-pre-wrap">{executionResult}</pre>
                        </CardContent>
                    </Card>
                </div>
            )}

            {lintReport && (
                <Card className="w-full max-w-4xl">
                    <CardContent className="p-4 bg-gray-800">
                        <h2 className="text-lg font-bold text-yellow-400">Lint Report</h2>
                        <pre className="whitespace-pre-wrap">{lintReport}</pre>
                    </CardContent>
                </Card>
            )}

            {explanation && (
                <Card className="w-full max-w-4xl">
                    <CardContent className="p-4 bg-gray-800">
                        <h2 className="text-lg font-bold text-blue-400">AI Explanation</h2>
                        <pre className="whitespace-pre-wrap">{explanation}</pre>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
