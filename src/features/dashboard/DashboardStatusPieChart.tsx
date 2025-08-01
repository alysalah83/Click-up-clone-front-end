"use client";

import { TASK_STATUS } from "@/shared/tasks/consts/task.consts";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

function DashboardStatusPieChart({ data }: { data: object[] }) {
  const { toDo, inProgress, complete } = TASK_STATUS;

  const colors = [toDo.colorHex, inProgress.colorHex, complete.colorHex];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#525252"
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={colors[index]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#262626",
            borderRadius: "11px",
            padding: "4px 12px",
            border: "#525252",
          }}
          itemStyle={{
            color: "#a1a1a1",
            fontWeight: "600",
            letterSpacing: "0.5px",
            fontSize: "16px",
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default DashboardStatusPieChart;
