"use client";

import { useState } from "react";

export function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="docs-code-block">
      <div className="docs-code-label">
        <span>{language || "ТЕКСТ"}</span>
        <span>ГОТОВЫЙ ПРИМЕР</span>
        <button aria-live="polite" className={copied ? "copied" : undefined} onClick={copyCode} type="button">
          {copied ? "Скопировано ✓" : "Копировать"}
        </button>
      </div>
      <pre><code>{code}</code></pre>
    </div>
  );
}
