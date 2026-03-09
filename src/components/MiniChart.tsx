import { AreaChart, Area, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

interface MiniChartProps {
  data: { name: string; value: number; value2?: number }[];
  color?: string;
  color2?: string;
  height?: number;
  showGrid?: boolean;
  showAxis?: boolean;
}

const tooltipStyle = {
  background: 'hsl(220 50% 8% / 0.95)',
  border: '1px solid hsl(210 60% 22%)',
  borderRadius: '2px',
  color: 'hsl(210 40% 88%)',
  fontSize: 11,
  fontFamily: 'Rajdhani, sans-serif',
};

const MiniChart = ({ data, color = "#2196f3", color2, height = 200, showGrid = false, showAxis = false }: MiniChartProps) => (
  <ResponsiveContainer width="100%" height={height}>
    <AreaChart data={data} margin={{ top: 5, right: 5, left: showAxis ? 0 : -20, bottom: 0 }}>
      <defs>
        <linearGradient id={`grad-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.35} />
          <stop offset="100%" stopColor={color} stopOpacity={0.02} />
        </linearGradient>
        {color2 && (
          <linearGradient id={`grad-${color2.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color2} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color2} stopOpacity={0.02} />
          </linearGradient>
        )}
      </defs>
      {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 50% 16% / 0.6)" />}
      {showAxis && <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'hsl(215 20% 50%)', fontFamily: 'Rajdhani' }} axisLine={{ stroke: 'hsl(215 50% 16%)' }} tickLine={false} />}
      {showAxis && <YAxis tick={{ fontSize: 10, fill: 'hsl(215 20% 50%)', fontFamily: 'Orbitron' }} axisLine={{ stroke: 'hsl(215 50% 16%)' }} tickLine={false} />}
      <Tooltip contentStyle={tooltipStyle} />
      <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2} fill={`url(#grad-${color.replace('#','')})`} />
      {color2 && <Area type="monotone" dataKey="value2" stroke={color2} strokeWidth={1.5} fill={`url(#grad-${color2.replace('#','')})`} strokeDasharray="4 2" />}
    </AreaChart>
  </ResponsiveContainer>
);

export default MiniChart;
