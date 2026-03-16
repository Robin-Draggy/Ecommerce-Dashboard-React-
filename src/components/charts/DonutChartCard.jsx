import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Desktop", value: 48 },
  { name: "Mobile", value: 35 },
  { name: "Tablet", value: 17 },
];

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b"];

export const DonutChartCard = () => {
  return (
    <div className="rounded-lg border  border-cl bg-cl-primary p-4 shadow">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-cl-primary">
          Traffic Sources
        </h2>
        <p className="text-sm text-cl-primary">
          Visitor device distribution
        </p>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={55}
              paddingAngle={4}
              dataKey="value"
              label
              animationDuration={1400}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};