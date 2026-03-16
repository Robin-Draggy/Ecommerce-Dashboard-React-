import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Mon", orders: 120 },
  { name: "Tue", orders: 210 },
  { name: "Wed", orders: 180 },
  { name: "Thu", orders: 260 },
  { name: "Fri", orders: 300 },
  { name: "Sat", orders: 240 },
  { name: "Sun", orders: 190 },
];

export const BarChartCard = () => {
  return (
    <div className="rounded-lg  bg-[#E3F5FF] p-4 shadow">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-cl-primary">
          Weekly Orders
        </h2>
        <p className="text-sm text-cl-primary">
          Orders performance for this week
        </p>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="name" tick={{ fill: "currentColor" }} />
            <YAxis tick={{ fill: "currentColor" }} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="orders"
              fill="#8b5cf6"
              radius={[8, 8, 0, 0]}
              animationDuration={1400}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};