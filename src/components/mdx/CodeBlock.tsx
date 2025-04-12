"use client";
import React from "react";
import "highlight.js/styles/atom-one-dark.css"; // Import a highlight.js theme

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  // Extract language from className (e.g., "language-python" -> "python")
  const language = className ? className.replace(/language-/, "") : "";

  // State for copy button feedback
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    const code = children?.toString() || "";
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6">
      {language && (
        <div className="absolute -top-4 right-4 bg-gray-700 text-gray-200 text-xs px-2 py-1 rounded">
          {language}
        </div>
      )}
      <pre className="overflow-x-auto text-sm bg-gray-900 dark:bg-black p-4 rounded-lg">
        <code className={className || ""}>{children}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded transition-colors"
        aria-label="Copy code"
      >
        {copied ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        )}
      </button>
    </div>
  );
}
