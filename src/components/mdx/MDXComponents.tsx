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
import { Blockquote } from "./Blockquote";
import { ModelArchitecture } from "./ModelArchitecture";
import { PerformanceChart } from "./PerformanceChart";
import { ModelComparisonCard } from "./ModelComparisonCard";

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
      return children; // Return the code element to be handled by the code component
    }
    return <pre>{children}</pre>;
  },
  code: (props: { className?: string; children: React.ReactNode }) => {
    const { className, children } = props;
    // If it has a language class, it's a code block
    if (className?.startsWith("language-")) {
      return <CodeBlock className={className}>{children}</CodeBlock>;
    }
    // Otherwise it's an inline code element
    return (
      <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-sm">
        {children}
      </code>
    );
  },
  blockquote: Blockquote,

  // Custom components not native to markdown (to be used explicitly in MDX)
  ModelArchitecture,
  PerformanceChart,
  ModelComparisonCard,
};
