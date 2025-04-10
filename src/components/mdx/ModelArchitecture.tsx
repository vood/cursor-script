import React from "react";

export function ModelArchitecture() {
  return (
    <div className="my-8 flex flex-col items-center">
      <div className="bg-gradient-to-b from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 p-6 rounded-xl shadow-lg max-w-2xl w-full">
        <div className="text-center mb-2 font-semibold text-blue-800 dark:text-blue-300">
          Llama 4 MoE Architecture
        </div>

        {/* Input */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 mb-4 text-center shadow">
          <div className="text-gray-700 dark:text-gray-300">Input Query</div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center mb-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5V19M12 19L5 12M12 19L19 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Router */}
        <div className="bg-blue-100 dark:bg-blue-900/40 rounded-lg border border-blue-200 dark:border-blue-800 p-3 mb-4 text-center shadow">
          <div className="text-blue-800 dark:text-blue-300">
            Query Router Layer
          </div>
        </div>

        {/* Experts */}
        <div className="grid grid-cols-5 gap-2 mb-4">
          {[1, 2, 3, "...", "N"].map((num, idx) => (
            <div
              key={idx}
              className="bg-indigo-100 dark:bg-indigo-900/40 rounded-lg border border-indigo-200 dark:border-indigo-800 p-2 text-center shadow-sm"
            >
              <div className="text-xs text-indigo-800 dark:text-indigo-300 font-medium">
                Expert
              </div>
              <div className="text-sm text-indigo-900 dark:text-indigo-200">
                {num}
              </div>
            </div>
          ))}
        </div>

        {/* Output Combiner */}
        <div className="flex justify-center mb-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 19V5M12 5L5 12M12 5L19 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="bg-purple-100 dark:bg-purple-900/40 rounded-lg border border-purple-200 dark:border-purple-800 p-3 mb-4 text-center shadow">
          <div className="text-purple-800 dark:text-purple-300">
            Output Combiner
          </div>
        </div>

        {/* Final Response */}
        <div className="flex justify-center mb-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5V19M12 19L5 12M12 19L19 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="bg-green-100 dark:bg-green-900/40 rounded-lg border border-green-200 dark:border-green-800 p-3 text-center shadow">
          <div className="text-green-800 dark:text-green-300">
            Final Response
          </div>
        </div>
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-2xl text-center">
        Llama 4&apos;s Mixture of Experts (MoE) architecture selectively
        activates only relevant &quot;expert&quot; parameters for each task,
        enabling more efficient processing.
      </div>
    </div>
  );
}
