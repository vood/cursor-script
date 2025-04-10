import React from "react";

// Define the performance data structure
interface ModelPerformance {
  name: string;
  math: number;
  gpqa: number;
  coding: number;
  reasoning: number;
  color: string;
}

export function PerformanceChart() {
  // Performance data from the blog post
  const performanceData: ModelPerformance[] = [
    {
      name: "Llama 4 Behemoth",
      math: 87.3,
      gpqa: 81.2,
      coding: 79.4,
      reasoning: 82.1,
      color: "#4338CA",
    },
    {
      name: "Llama 4 Maverick",
      math: 76.5,
      gpqa: 72.9,
      coding: 68.7,
      reasoning: 75.6,
      color: "#6366F1",
    },
    {
      name: "Llama 4 Scout",
      math: 68.4,
      gpqa: 63.1,
      coding: 61.3,
      reasoning: 70.2,
      color: "#818CF8",
    },
    {
      name: "GPT-4.5",
      math: 82.1,
      gpqa: 79.6,
      coding: 76.8,
      reasoning: 83.5,
      color: "#10B981",
    },
    {
      name: "Claude 3.7 Sonnet",
      math: 81.9,
      gpqa: 78.4,
      coding: 72.3,
      reasoning: 81.7,
      color: "#FB7185",
    },
    {
      name: "Gemini 2.0 Pro",
      math: 79.2,
      gpqa: 77.5,
      coding: 71.9,
      reasoning: 80.3,
      color: "#FBBF24",
    },
    {
      name: "DeepSeek V3",
      math: 75.8,
      gpqa: 71.6,
      coding: 70.1,
      reasoning: 74.9,
      color: "#94A3B8",
    },
  ];

  // Categories for the chart
  const categories = ["MATH-500", "GPQA Diamond", "Coding", "Reasoning"];

  // Find the max value to scale the chart appropriately
  const maxValue = Math.max(
    ...performanceData.flatMap((model) => [
      model.math,
      model.gpqa,
      model.coding,
      model.reasoning,
    ])
  );

  // Calculate a safe maximum for the chart (rounded up to nearest 10)
  const chartMax = Math.ceil(maxValue / 10) * 10;

  // Helper function to calculate bar width as percentage
  const getBarWidth = (value: number) => {
    return `${(value / chartMax) * 100}%`;
  };

  return (
    <div className="my-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center">
        Model Benchmark Performance
      </h3>

      {/* Chart Legend */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {performanceData.map((model) => (
          <div key={model.name} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: model.color }}
            ></div>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {model.name}
            </span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="space-y-8">
        {/* MATH-500 */}
        <div>
          <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
            MATH-500
          </h4>
          <div className="space-y-2">
            {performanceData.map((model) => (
              <div key={`${model.name}-math`} className="relative">
                <div className="flex items-center">
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-6 overflow-hidden">
                    <div
                      className="h-6 rounded-full"
                      style={{
                        width: getBarWidth(model.math),
                        backgroundColor: model.color,
                      }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">
                    {model.math}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GPQA Diamond */}
        <div>
          <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
            GPQA Diamond
          </h4>
          <div className="space-y-2">
            {performanceData.map((model) => (
              <div key={`${model.name}-gpqa`} className="relative">
                <div className="flex items-center">
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-6 overflow-hidden">
                    <div
                      className="h-6 rounded-full"
                      style={{
                        width: getBarWidth(model.gpqa),
                        backgroundColor: model.color,
                      }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">
                    {model.gpqa}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coding */}
        <div>
          <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
            Coding
          </h4>
          <div className="space-y-2">
            {performanceData.map((model) => (
              <div key={`${model.name}-coding`} className="relative">
                <div className="flex items-center">
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-6 overflow-hidden">
                    <div
                      className="h-6 rounded-full"
                      style={{
                        width: getBarWidth(model.coding),
                        backgroundColor: model.color,
                      }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">
                    {model.coding}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reasoning */}
        <div>
          <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
            Reasoning
          </h4>
          <div className="space-y-2">
            {performanceData.map((model) => (
              <div key={`${model.name}-reasoning`} className="relative">
                <div className="flex items-center">
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-6 overflow-hidden">
                    <div
                      className="h-6 rounded-full"
                      style={{
                        width: getBarWidth(model.reasoning),
                        backgroundColor: model.color,
                      }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">
                    {model.reasoning}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400 mt-6 text-center">
        Data from Meta's Llama 4 benchmark evaluation across standardized AI
        performance tests.
      </div>
    </div>
  );
}
