import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Jan", revenue: 4000, sales: 2400 },
  { name: "Feb", revenue: 3000, sales: 1398 },
  { name: "Mar", revenue: 5000, sales: 3200 },
  { name: "Apr", revenue: 4780, sales: 2780 },
  { name: "May", revenue: 5890, sales: 3908 },
  { name: "Jun", revenue: 6390, sales: 4800 },
  { name: "Jul", revenue: 7490, sales: 5200 },
];

export const LineChartCard = () => {
  return (
    <div className="rounded-lg border border-cl bg-cl-primary p-4 shadow">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-cl-primary">
          Revenue Overview
        </h2>
        <p className="text-sm text-cl-secondary">
          Monthly revenue and sales
        </p>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="name" tick={{ fill: "currentColor" }} />
            <YAxis tick={{ fill: "currentColor" }} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 7 }}
              animationDuration={1200}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 7 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};