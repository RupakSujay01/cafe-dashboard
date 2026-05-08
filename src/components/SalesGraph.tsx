"use client";

import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { time: "8 AM", orders: 12, revenue: 80 },
  { time: "9 AM", orders: 28, revenue: 210 },
  { time: "10 AM", orders: 45, revenue: 380 },
  { time: "11 AM", orders: 58, revenue: 490 },
  { time: "12 PM", orders: 82, revenue: 680 },
  { time: "1 PM", orders: 65, revenue: 540 },
  { time: "2 PM", orders: 40, revenue: 320 },
  { time: "3 PM", orders: 35, revenue: 290 },
  { time: "4 PM", orders: 48, revenue: 410 },
  { time: "5 PM", orders: 55, revenue: 460 },
  { time: "6 PM", orders: 70, revenue: 590 },
  { time: "7 PM", orders: 85, revenue: 720 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-card-border/50 p-4 rounded-xl shadow-xl shadow-black/40 backdrop-blur-md">
        <p className="text-muted-foreground text-xs font-medium mb-2">{label}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-bold text-foreground">{payload[0].value}</p>
          <p className="text-xs text-primary font-mono">Orders Taken</p>
        </div>
      </div>
    );
  }
  return null;
};

export default function SalesGraph() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="h-[280px] w-full flex items-center justify-center text-muted-foreground animate-pulse">Loading visualization...</div>;
  }

  return (
    <div className="h-[280px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#C9A84C" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2A2A35" opacity={0.5} />
          <XAxis 
            dataKey="time" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#8B8B9B" }}
            dy={10}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#8B8B9B" }}
            dx={-10}
          />
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ stroke: '#2A2A35', strokeWidth: 1, strokeDasharray: '4 4' }}
          />
          <Area 
            type="monotone" 
            dataKey="orders" 
            stroke="#C9A84C" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorOrders)" 
            activeDot={{ r: 6, fill: "#0D0D12", stroke: "#C9A84C", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
