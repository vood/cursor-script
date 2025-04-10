import React from "react";

interface TableProps {
  children: React.ReactNode;
}

export function Table({ children }: TableProps) {
  return (
    <div className="overflow-x-auto my-4 rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children }: TableProps) {
  return <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>;
}

export function TableRow({ children }: TableProps) {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">{children}</tr>
  );
}

export function TableHeader({ children }: TableProps) {
  return (
    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
      {children}
    </th>
  );
}

export function TableBody({ children }: TableProps) {
  return (
    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
      {children}
    </tbody>
  );
}

export function TableCell({ children }: TableProps) {
  return (
    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
      {children}
    </td>
  );
}
