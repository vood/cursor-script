"use client";

import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

console.log("Initializing Mermaid...");

// Initialize mermaid config once
mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  securityLevel: "loose",
  themeVariables: {
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
});

interface MermaidDiagramProps {
  children: string;
}

export function MermaidDiagram({ children }: MermaidDiagramProps) {
  const diagramRef = useRef<HTMLDivElement>(null);
  const diagramId = useRef(
    `mermaid-${Math.random().toString(36).substr(2, 9)}`
  );

  console.log("MermaidDiagram mounted with content:", children);
  console.log("Generated diagram ID:", diagramId.current);

  useEffect(() => {
    const renderDiagram = async () => {
      console.log("Starting diagram render...");
      if (diagramRef.current) {
        try {
          console.log("Attempting to render diagram with content:", children);

          // Clear previous content
          diagramRef.current.innerHTML = children;
          console.log("Cleared previous content");

          // Render new diagram
          console.log("Calling mermaid.render with ID:", diagramId.current);
          const { svg } = await mermaid.render(diagramId.current, children);
          console.log(
            "Received SVG from mermaid:",
            svg.substring(0, 100) + "..."
          );

          if (diagramRef.current) {
            diagramRef.current.innerHTML = svg;
            console.log("Successfully updated diagram content");
          }
        } catch (error) {
          console.error("Error rendering mermaid diagram:", error);
          console.error("Error details:", {
            error: error instanceof Error ? error.message : String(error),
            diagramContent: children,
          });
          if (diagramRef.current) {
            diagramRef.current.innerHTML = "Error rendering diagram";
          }
        }
      } else {
        console.warn("diagramRef.current is null");
      }
    };

    renderDiagram();
  }, [children]);

  return (
    <div className="my-8 flex justify-center">
      <div ref={diagramRef} className="max-w-full overflow-x-auto" />
    </div>
  );
}
