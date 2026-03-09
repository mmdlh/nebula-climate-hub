import { Thermometer, Droplets, Wind, Gauge, AlertTriangle, CheckCircle2, Server, Activity } from "lucide-react";
import StatCard from "@/components/StatCard";
import MiniChart from "@/components/MiniChart";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const tempHistory = Array.from({ length: 24 }, (_, i) => ({
  name: `${i}:00`, value: 22 + Math.sin(i / 3) * 4 + Math.random() * 2,
  value2: 18 + Math.cos(i / 4) * 3 + Math.random() * 1.5,
}));

const deviceStatus = [
  { name: "在线", value: 186, color: "#00d4ff" },
  { name: "离线", value: 12, color: "#ff4444" },
  { name: "维护", value: 8, color: "#ffaa00" },
];

const zoneData = [
  { name: "A区", value: 24.5, value2: 22.1 },
  { name: "B区", value: 26.2, value2: 23.8 },
  { name: "C区", value: 21.8, value2: 20.5 },
  { name: "D区", value: 25.1, value2: 24.0 },
  { name: "E区", value: 23.3, value2: 21.7 },
  { name: "F区", value: 27.0, value2: 25.2 },
];

const recentAlarms = [
  { id: 1, zone: "B区-03号", type: "温度过高", value: "32.5°C", time: "14:23", level: "高" },
  { id: 2, zone: "A区-12号", type: "湿度异常", value: "85%", time: "13:45", level: "中" },
  { id: 3, zone: "D区-07号", type: "设备离线", value: "-", time: "12:10", level: "低" },
  { id: 4, zone: "C区-01号", type: "温度波动", value: "±3.2°C", time: "11:30", level: "中" },
  { id: 5, zone: "F区-09号", type: "传感器故障", value: "-", time: "10:55", level: "高" },
];

const levelColors: Record<string, string> = {
  "高": "text-destructive",
  "中": "text-warning",
  "低": "text-primary",
};

const Overview = () => (
  <div className="space-y-6">
    {/* Stats Row */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="平均温度" value="24.6" unit="°C" icon={Thermometer} variant="primary" trend={{ value: 1.2, up: true }} />
      <StatCard title="平均湿度" value="62" unit="%" icon={Droplets} variant="accent" trend={{ value: 0.8, up: false }} />
      <StatCard title="在线设备" value="186" unit="台" icon={Server} variant="default" trend={{ value: 2.5, up: true }} />
      <StatCard title="今日告警" value="17" unit="条" icon={AlertTriangle} variant="warning" trend={{ value: 5.3, up: true }} />
    </div>

    {/* Main Content */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Temperature Trend - 2/3 width */}
      <div className="lg:col-span-2 glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            24小时温度趋势
          </h2>
          <div className="flex gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-primary rounded" />室内温度</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-accent rounded" />目标温度</span>
          </div>
        </div>
        <MiniChart data={tempHistory} color="#00d4ff" color2="#00ff88" height={260} showGrid showAxis />
      </div>

      {/* Device Status Pie */}
      <div className="glass-card p-5">
        <h2 className="section-title flex items-center gap-2 mb-4">
          <Server className="w-4 h-4 text-primary" />
          设备状态
        </h2>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie data={deviceStatus} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" strokeWidth={0}>
              {deviceStatus.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-6 mt-2">
          {deviceStatus.map((item) => (
            <div key={item.name} className="flex items-center gap-2 text-sm">
              <span className="w-2.5 h-2.5 rounded-full glow-dot" style={{ color: item.color, backgroundColor: item.color }} />
              <span className="text-muted-foreground">{item.name}</span>
              <span className="font-display font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Bottom Row */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Zone Comparison */}
      <div className="glass-card p-5">
        <h2 className="section-title flex items-center gap-2 mb-4">
          <Gauge className="w-4 h-4 text-primary" />
          分区温度对比
        </h2>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={zoneData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 25% 18%)" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(210 15% 55%)' }} axisLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'hsl(210 15% 55%)' }} axisLine={false} />
            <Tooltip contentStyle={{ background: 'hsl(215 30% 10% / 0.95)', border: '1px solid hsl(200 40% 25%)', borderRadius: '8px', color: 'hsl(200 60% 92%)', fontSize: 12 }} />
            <Bar dataKey="value" fill="#00d4ff" radius={[4, 4, 0, 0]} name="当前温度" />
            <Bar dataKey="value2" fill="#00ff88" radius={[4, 4, 0, 0]} name="目标温度" opacity={0.6} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Alarms */}
      <div className="glass-card p-5">
        <h2 className="section-title flex items-center gap-2 mb-4">
          <AlertTriangle className="w-4 h-4 text-warning" />
          最近告警
        </h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>位置</th>
              <th>类型</th>
              <th>数值</th>
              <th>时间</th>
              <th>等级</th>
            </tr>
          </thead>
          <tbody>
            {recentAlarms.map((a) => (
              <tr key={a.id}>
                <td className="font-medium">{a.zone}</td>
                <td>{a.type}</td>
                <td className="font-display">{a.value}</td>
                <td className="text-muted-foreground">{a.time}</td>
                <td><span className={`font-semibold ${levelColors[a.level]}`}>{a.level}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Quick Status Bar */}
    <div className="glass-card-accent p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <CheckCircle2 className="w-5 h-5 text-accent" />
        <span className="text-sm font-heading">系统运行状态: <span className="text-accent font-semibold">正常</span></span>
      </div>
      <div className="flex gap-8 text-sm text-muted-foreground">
        <span>运行时长: <span className="text-foreground font-display">1,247</span> 小时</span>
        <span>数据采集频率: <span className="text-foreground font-display">5</span> 秒/次</span>
        <span>上次同步: <span className="text-foreground">2 分钟前</span></span>
      </div>
    </div>
  </div>
);

export default Overview;
