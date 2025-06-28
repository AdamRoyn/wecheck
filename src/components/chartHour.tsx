"use client"

import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface ChartProp {
  xKey: string;
  lKey: string;
  value: { [key: string]: string | number }[];
}

export function Chart({xKey, lKey, value}: ChartProp) {
  return (
    <ResponsiveContainer height={225}>
      <LineChart data={value}>
        <CartesianGrid strokeDasharray="8 8" stroke="#fff2e0" opacity={0.2} />
        <XAxis dataKey={xKey} stroke="#FFF2E0" />
        {/* <YAxis stroke="#FFF2E0" /> */}
        <Tooltip
          contentStyle={{ backgroundColor: "#A2AADB", stroke: "" }}
          labelStyle={{ color: "#FFF2E0" }}
          itemStyle={{ color: "#FFF2E0" }}
        />
        <Line type="monotone" dataKey={lKey} stroke="#FFF2E0" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}
