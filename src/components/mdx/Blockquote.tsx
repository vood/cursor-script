import React from "react";

interface BlockquoteProps {
  children: React.ReactNode;
}

export function Blockquote({ children }: BlockquoteProps) {
  return (
    <blockquote className="border-l-4 border-blue-500 pl-4 italic py-2 my-6 text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
      {children}
    </blockquote>
  );
}
