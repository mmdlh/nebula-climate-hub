import { AreaChart, Area, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

interface MiniChartProps {
  data: { name: string; value: number; value2?: number }[];
  color?: string;
  color2?: string;
  height?: number;
  showGrid?: boolean;
  showAxis?: boolean;
}

const MiniChart = ({ data, color = "#00d4ff", color2, height = 200, showGrid = false, showAxis = false }: MiniChartProps) => (
  <ResponsiveContainer width="100%" height={height}>
    <AreaChart data={data} margin={{ top: 5, right: 5, left: showAxis ? 0 : -20, bottom: 0 }}>
      <defs>
        <linearGradient id={`grad-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
        {color2 && (
          <linearGradient id={`grad-${color2.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color2} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color2} stopOpacity={0} />
          </linearGradient>
        )}
      </defs>
      {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 25% 18%)" />}
      {showAxis && <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(210 15% 55%)' }} axisLine={false} tickLine={false} />}
      {showAxis && <YAxis tick={{ fontSize: 11, fill: 'hsl(210 15% 55%)' }} axisLine={false} tickLine={false} />}
      <Tooltip
        contentStyle={{
          background: 'hsl(215 30% 10% / 0.95)',
          border: '1px solid hsl(200 40% 25%)',
          borderRadius: '8px',
          color: 'hsl(200 60% 92%)',
          fontSize: 12,
        }}
      />
      <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2} fill={`url(#grad-${color.replace('#','')})`} />
      {color2 && <Area type="monotone" dataKey="value2" stroke={color2} strokeWidth={2} fill={`url(#grad-${color2.replace('#','')})`} />}
    </AreaChart>
  </ResponsiveContainer>
);

export default MiniChart;
