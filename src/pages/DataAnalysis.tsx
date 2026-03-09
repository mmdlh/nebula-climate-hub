import { BarChart3, TrendingUp, Calendar, Layers } from "lucide-react";
import { LineChart, Line, BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";

const monthlyTrend = Array.from({ length: 30 }, (_, i) => ({
  name: `${i + 1}日`,
  value: 23 + Math.sin(i / 4) * 3 + Math.random() * 2,
  value2: 22 + Math.cos(i / 5) * 2,
}));

const hourlyDistribution = Array.from({ length: 24 }, (_, i) => ({
  name: `${i}时`,
  avg: 22 + Math.sin(i / 3) * 4,
  max: 26 + Math.sin(i / 3) * 5,
  min: 18 + Math.sin(i / 3) * 3,
}));

const correlationData = Array.from({ length: 50 }, () => ({
  temp: 15 + Math.random() * 20,
  humidity: 30 + Math.random() * 50,
  energy: 50 + Math.random() * 100,
}));

const radarData = [
  { metric: "温度稳定性", A: 92, B: 78 },
  { metric: "能耗效率", A: 85, B: 90 },
  { metric: "响应速度", A: 88, B: 72 },
  { metric: "设备可用性", A: 95, B: 88 },
  { metric: "告警处理", A: 78, B: 85 },
  { metric: "数据完整性", A: 96, B: 91 },
];

const anomalies = [
  { date: "03-09", zone: "B区", type: "温度突升", deviation: "+5.3°C", confidence: "96%", cause: "制冷系统短暂停机" },
  { date: "03-08", zone: "D区", type: "周期性波动", deviation: "±2.1°C", confidence: "89%", cause: "外部温度影响" },
  { date: "03-07", zone: "A区", type: "缓慢上升", deviation: "+1.8°C/h", confidence: "92%", cause: "门封老化漏气" },
  { date: "03-06", zone: "F区", type: "数据缺失", deviation: "-", confidence: "100%", cause: "传感器掉线" },
];

const tooltipStyle = { background: 'hsl(220 50% 8% / 0.95)', border: '1px solid hsl(210 60% 22%)', borderRadius: '2px', color: 'hsl(210 40% 88%)', fontSize: 11 };
const axisStyle = { fontSize: 10, fill: 'hsl(215 20% 50%)', fontFamily: 'Rajdhani' };
const gridStroke = "hsl(215 50% 16% / 0.6)";

const DataAnalysis = () => (
  <div className="space-y-5 pb-8">
    <h2 className="section-title title-decorated">数据分析</h2>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: "平均偏差", value: "±0.8°C", sub: "较上月降低12%", icon: TrendingUp, color: "text-accent" },
        { label: "采集量", value: "2.4M", sub: "本月累计", icon: Layers, color: "text-primary" },
        { label: "异常率", value: "3.2%", sub: "AI分析结果", icon: BarChart3, color: "text-warning" },
        { label: "预测准确", value: "94.7%", sub: "ML模型", icon: Calendar, color: "text-primary" },
      ].map((c) => (
        <div key={c.label} className="tech-card corner-decoration p-5">
          <div className="flex items-center gap-2 mb-2">
            <c.icon className={`w-4 h-4 ${c.color}`} />
            <span className="text-[10px] font-display tracking-widest text-muted-foreground uppercase">{c.label}</span>
          </div>
          <div className={`stat-value ${c.color} ${c.color === 'text-primary' ? 'glow-text' : ''}`}>{c.value}</div>
          <div className="text-[10px] text-muted-foreground mt-1 font-heading">{c.sub}</div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="tech-card corner-decoration p-5">
        <h3 className="section-title title-decorated text-sm mb-4">月度温度趋势</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={monthlyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
            <XAxis dataKey="name" tick={axisStyle} axisLine={{ stroke: 'hsl(215 50% 16%)' }} interval={4} />
            <YAxis tick={{ ...axisStyle, fontFamily: 'Orbitron' }} axisLine={{ stroke: 'hsl(215 50% 16%)' }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'Rajdhani' }} />
            <Line type="monotone" dataKey="value" stroke="#2196f3" strokeWidth={2} dot={false} name="实际温度" />
            <Line type="monotone" dataKey="value2" stroke="#26a69a" strokeWidth={2} strokeDasharray="5 5" dot={false} name="预测温度" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="tech-card corner-decoration p-5">
        <h3 className="section-title title-decorated text-sm mb-4">温度分布</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={hourlyDistribution}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
            <XAxis dataKey="name" tick={axisStyle} axisLine={{ stroke: 'hsl(215 50% 16%)' }} interval={3} />
            <YAxis tick={{ ...axisStyle, fontFamily: 'Orbitron' }} axisLine={{ stroke: 'hsl(215 50% 16%)' }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="min" fill="#2196f3" opacity={0.3} name="最低" radius={[2, 2, 0, 0]} />
            <Bar dataKey="avg" fill="#2196f3" name="平均" radius={[2, 2, 0, 0]} />
            <Bar dataKey="max" fill="#ff9800" opacity={0.5} name="最高" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="tech-card corner-decoration p-5">
        <h3 className="section-title title-decorated text-sm mb-4">温湿度-能耗关联</h3>
        <ResponsiveContainer width="100%" height={280}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
            <XAxis dataKey="temp" name="温度" unit="°C" tick={axisStyle} axisLine={{ stroke: 'hsl(215 50% 16%)' }} />
            <YAxis dataKey="energy" name="能耗" unit="kWh" tick={{ ...axisStyle, fontFamily: 'Orbitron' }} axisLine={{ stroke: 'hsl(215 50% 16%)' }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Scatter data={correlationData} fill="#2196f3" fillOpacity={0.5} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="tech-card corner-decoration p-5">
        <h3 className="section-title title-decorated text-sm mb-4">分区性能雷达</h3>
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="hsl(215 50% 16%)" />
            <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: 'hsl(215 20% 50%)', fontFamily: 'Rajdhani' }} />
            <Radar name="A区" dataKey="A" stroke="#2196f3" fill="#2196f3" fillOpacity={0.15} />
            <Radar name="B区" dataKey="B" stroke="#26a69a" fill="#26a69a" fillOpacity={0.1} />
            <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'Rajdhani' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="tech-card corner-decoration p-5">
      <h3 className="section-title title-decorated text-sm mb-4 flex items-center gap-2">
        <BarChart3 className="w-4 h-4 text-warning" />
        AI 异常检测
      </h3>
      <table className="data-table">
        <thead><tr><th>日期</th><th>区域</th><th>类型</th><th>偏差</th><th>置信度</th><th>原因</th></tr></thead>
        <tbody>
          {anomalies.map((a, i) => (
            <tr key={i}>
              <td className="font-display text-xs">{a.date}</td>
              <td className="font-heading font-semibold">{a.zone}</td>
              <td className="text-warning font-heading">{a.type}</td>
              <td className="font-display text-xs">{a.deviation}</td>
              <td><span className="text-accent font-display font-bold">{a.confidence}</span></td>
              <td className="text-muted-foreground text-xs">{a.cause}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default DataAnalysis;
