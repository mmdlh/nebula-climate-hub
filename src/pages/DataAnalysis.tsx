import { BarChart3, TrendingUp, Calendar, Layers } from "lucide-react";
import MiniChart from "@/components/MiniChart";
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

const tooltipStyle = { background: 'hsl(215 30% 10% / 0.95)', border: '1px solid hsl(200 40% 25%)', borderRadius: '8px', color: 'hsl(200 60% 92%)', fontSize: 12 };

const DataAnalysis = () => (
  <div className="space-y-6">
    {/* Summary Cards */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: "平均偏差", value: "±0.8°C", sub: "较上月降低12%", icon: TrendingUp, variant: "text-accent" },
        { label: "数据采集量", value: "2.4M", sub: "本月累计", icon: Layers, variant: "text-primary" },
        { label: "异常检出率", value: "3.2%", sub: "AI分析结果", icon: BarChart3, variant: "text-warning" },
        { label: "预测准确率", value: "94.7%", sub: "机器学习模型", icon: Calendar, variant: "text-primary" },
      ].map((c) => (
        <div key={c.label} className="glass-card p-5">
          <div className="flex items-center gap-2 mb-2">
            <c.icon className={`w-4 h-4 ${c.variant}`} />
            <span className="text-sm text-muted-foreground">{c.label}</span>
          </div>
          <div className={`stat-value ${c.variant}`}>{c.value}</div>
          <div className="text-xs text-muted-foreground mt-1">{c.sub}</div>
        </div>
      ))}
    </div>

    {/* Main Charts */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Monthly Trend */}
      <div className="glass-card p-5">
        <h2 className="section-title mb-4">月度温度趋势</h2>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={monthlyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 25% 18%)" />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'hsl(210 15% 55%)' }} axisLine={false} interval={4} />
            <YAxis tick={{ fontSize: 11, fill: 'hsl(210 15% 55%)' }} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12, color: 'hsl(210 15% 55%)' }} />
            <Line type="monotone" dataKey="value" stroke="#00d4ff" strokeWidth={2} dot={false} name="实际温度" />
            <Line type="monotone" dataKey="value2" stroke="#00ff88" strokeWidth={2} strokeDasharray="5 5" dot={false} name="预测温度" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Hourly Distribution */}
      <div className="glass-card p-5">
        <h2 className="section-title mb-4">每日温度分布</h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={hourlyDistribution}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 25% 18%)" />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'hsl(210 15% 55%)' }} axisLine={false} interval={3} />
            <YAxis tick={{ fontSize: 11, fill: 'hsl(210 15% 55%)' }} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="min" fill="#00d4ff" opacity={0.4} name="最低" radius={[2, 2, 0, 0]} />
            <Bar dataKey="avg" fill="#00d4ff" name="平均" radius={[2, 2, 0, 0]} />
            <Bar dataKey="max" fill="#ffaa00" opacity={0.6} name="最高" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Scatter - Correlation */}
      <div className="glass-card p-5">
        <h2 className="section-title mb-4">温湿度-能耗关联</h2>
        <ResponsiveContainer width="100%" height={280}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 25% 18%)" />
            <XAxis dataKey="temp" name="温度" unit="°C" tick={{ fontSize: 11, fill: 'hsl(210 15% 55%)' }} axisLine={false} />
            <YAxis dataKey="energy" name="能耗" unit="kWh" tick={{ fontSize: 11, fill: 'hsl(210 15% 55%)' }} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={correlationData} fill="#00d4ff" fillOpacity={0.6} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Radar - Zone Comparison */}
      <div className="glass-card p-5">
        <h2 className="section-title mb-4">分区性能对比</h2>
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="hsl(215 25% 18%)" />
            <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: 'hsl(210 15% 55%)' }} />
            <Radar name="A区" dataKey="A" stroke="#00d4ff" fill="#00d4ff" fillOpacity={0.2} />
            <Radar name="B区" dataKey="B" stroke="#00ff88" fill="#00ff88" fillOpacity={0.15} />
            <Legend wrapperStyle={{ fontSize: 12, color: 'hsl(210 15% 55%)' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Anomaly Detection */}
    <div className="glass-card p-5">
      <h2 className="section-title flex items-center gap-2 mb-4">
        <BarChart3 className="w-4 h-4 text-warning" />
        AI异常检测结果
      </h2>
      <table className="data-table">
        <thead><tr><th>日期</th><th>区域</th><th>异常类型</th><th>偏差值</th><th>置信度</th><th>可能原因</th></tr></thead>
        <tbody>
          {anomalies.map((a, i) => (
            <tr key={i}>
              <td className="font-display text-sm">{a.date}</td>
              <td className="font-medium">{a.zone}</td>
              <td className="text-warning">{a.type}</td>
              <td className="font-display">{a.deviation}</td>
              <td><span className="text-accent font-display">{a.confidence}</span></td>
              <td className="text-muted-foreground text-sm">{a.cause}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default DataAnalysis;
