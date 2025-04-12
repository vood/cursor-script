import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";
import { CodeBlock } from "./CodeBlock";
import { ModelArchitecture } from "./ModelArchitecture";
import { PerformanceChart } from "./PerformanceChart";
import { ModelComparisonCard } from "./ModelComparisonCard";
import { MermaidDiagram } from "./MermaidDiagram";
import { YouTubeVideo } from "./YouTubeVideo";
import { TwitterEmbed } from "./TwitterEmbed";

// Define our custom components map for MDX
export const mdxComponents = {
  // Override native markdown elements with custom components
  table: Table,
  thead: TableHead,
  tbody: TableBody,
  tr: TableRow,
  th: TableHeader,
  td: TableCell,
  pre: ({ children }: { children: React.ReactNode }) => {
    // Check if children is a single code element
    if (React.isValidElement(children) && children.type === "code") {
      const codeElement = children as React.ReactElement<{
        className?: string;
        children: string;
      }>;
      // If it's a mermaid diagram, render it with the MermaidDiagram component
      if (
        codeElement.props.className === "language-mermaid" ||
        codeElement.props.className === "mermaid"
      ) {
        return <MermaidDiagram>{codeElement.props.children}</MermaidDiagram>;
      }
      return children; // Return the code element to be handled by the code component
    }
    return <pre>{children}</pre>;
  },
  code: (props: { className?: string; children: React.ReactNode }) => {
    const { className, children } = props;
    console.log("Code block props:", {
      className,
      children: children?.toString(),
    });

    // Check if this is a mermaid diagram
    if (className?.includes("language-mermaid")) {
      console.log("Rendering Mermaid diagram with content:", children);
      return <MermaidDiagram>{children as string}</MermaidDiagram>;
    }

    // If it has a language class, it's a code block
    if (
      className?.startsWith("language-") ||
      className?.includes("language-")
    ) {
      return <CodeBlock className={className}>{children}</CodeBlock>;
    }

    // Otherwise it's an inline code element
    return (
      <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-sm">
        {children}
      </code>
    );
  },
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 italic py-2 my-6 text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
      {children}
    </blockquote>
  ),

  // Custom components not native to markdown (to be used explicitly in MDX)
  ModelArchitecture,
  PerformanceChart,
  ModelComparisonCard,
  MermaidDiagram,
  YouTubeVideo,
  TwitterEmbed,
};
