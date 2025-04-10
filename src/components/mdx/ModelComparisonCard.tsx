import React from "react";

interface ModelComparisonCardProps {
  name: string;
  parameters: string;
  contextWindow: string;
  strengths: string[];
  specialties: string[];
  color?: string;
}

export function ModelComparisonCard({
  name,
  parameters,
  contextWindow,
  strengths,
  specialties,
  color = "#6366F1",
}: ModelComparisonCardProps) {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 my-4">
      <div
        className="px-4 py-3 text-white font-medium text-lg"
        style={{ backgroundColor: color }}
      >
        {name}
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <div className="text-gray-500 dark:text-gray-400">Parameters</div>
            <div className="font-medium text-gray-800 dark:text-gray-200">
              {parameters}
            </div>
          </div>
          <div>
            <div className="text-gray-500 dark:text-gray-400">
              Context Window
            </div>
            <div className="font-medium text-gray-800 dark:text-gray-200">
              {contextWindow}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-gray-500 dark:text-gray-400 mb-1">
            Key Strengths
          </div>
          <ul className="list-disc list-inside text-sm">
            {strengths.map((strength, index) => (
              <li key={index} className="text-gray-800 dark:text-gray-200">
                {strength}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-gray-500 dark:text-gray-400 mb-1">
            Specialties
          </div>
          <div className="flex flex-wrap gap-2">
            {specialties.map((specialty, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
