import { Thermometer, Droplets, Wind, Gauge, AlertTriangle, CheckCircle2, Server, Activity } from "lucide-react";
import StatCard from "@/components/StatCard";
import MiniChart from "@/components/MiniChart";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const tempHistory = Array.from({ length: 24 }, (_, i) => ({
  name: `${String(i).padStart(2,'0')}:00`, value: 22 + Math.sin(i / 3) * 4 + Math.random() * 2,
  value2: 18 + Math.cos(i / 4) * 3 + Math.random() * 1.5,
}));

const deviceStatus = [
  { name: "在线", value: 186, color: "#2196f3" },
  { name: "离线", value: 12, color: "#f44336" },
  { name: "维护", value: 8, color: "#ff9800" },
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

const tooltipStyle = { background: 'hsl(220 50% 8% / 0.95)', border: '1px solid hsl(210 60% 22%)', borderRadius: '2px', color: 'hsl(210 40% 88%)', fontSize: 11 };

const Overview = () => (
  <div className="space-y-5 pb-8">
    {/* Page Title */}
    <div className="flex items-center justify-between">
      <h2 className="section-title title-decorated">系统总览</h2>
      <div className="flex items-center gap-2 text-[10px] font-display tracking-wider text-muted-foreground">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-glow" />
        实时数据
      </div>
    </div>

    {/* Stats Row */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="平均温度" value="24.6" unit="°C" icon={Thermometer} variant="primary" trend={{ value: 1.2, up: true }} />
      <StatCard title="平均湿度" value="62" unit="%" icon={Droplets} variant="accent" trend={{ value: 0.8, up: false }} />
      <StatCard title="在线设备" value="186" unit="台" icon={Server} variant="default" trend={{ value: 2.5, up: true }} />
      <StatCard title="今日告警" value="17" unit="条" icon={AlertTriangle} variant="warning" trend={{ value: 5.3, up: true }} />
    </div>

    {/* Main Content */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Temperature Trend */}
      <div className="lg:col-span-2 tech-card corner-decoration p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title title-decorated flex items-center gap-2 text-sm">
            <Activity className="w-4 h-4 text-primary" />
            24H 温度趋势
          </h3>
          <div className="flex gap-4 text-[10px] font-heading">
            <span className="flex items-center gap-1.5"><span className="w-4 h-[2px] bg-primary rounded" />室内温度</span>
            <span className="flex items-center gap-1.5"><span className="w-4 h-[2px] bg-accent rounded opacity-60" style={{ borderTop: '2px dashed' }} />目标温度</span>
          </div>
        </div>
        <MiniChart data={tempHistory} color="#2196f3" color2="#26a69a" height={260} showGrid showAxis />
      </div>

      {/* Device Status Pie */}
      <div className="tech-card corner-decoration p-5 scan-line">
        <h3 className="section-title title-decorated text-sm mb-4">
          设备状态
        </h3>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie data={deviceStatus} cx="50%" cy="50%" innerRadius={50} outerRadius={72} dataKey="value" strokeWidth={0}>
              {deviceStatus.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[30%] text-center pointer-events-none">
          <div className="font-display text-2xl font-bold text-primary glow-text">206</div>
          <div className="text-[9px] font-display tracking-widest text-muted-foreground">TOTAL</div>
        </div>
        <div className="flex justify-center gap-5 mt-3">
          {deviceStatus.map((item) => (
            <div key={item.name} className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full glow-dot" style={{ color: item.color, backgroundColor: item.color }} />
              <span className="text-muted-foreground font-heading">{item.name}</span>
              <span className="font-display font-semibold text-sm">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Bottom Row */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Zone Comparison */}
      <div className="tech-card corner-decoration p-5">
        <h3 className="section-title title-decorated text-sm mb-4 flex items-center gap-2">
          <Gauge className="w-4 h-4 text-primary" />
          分区温度对比
        </h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={zoneData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 50% 16% / 0.6)" />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'hsl(215 20% 50%)', fontFamily: 'Rajdhani' }} axisLine={{ stroke: 'hsl(215 50% 16%)' }} />
            <YAxis tick={{ fontSize: 10, fill: 'hsl(215 20% 50%)', fontFamily: 'Orbitron' }} axisLine={{ stroke: 'hsl(215 50% 16%)' }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="value" fill="#2196f3" radius={[2, 2, 0, 0]} name="当前温度" />
            <Bar dataKey="value2" fill="#26a69a" radius={[2, 2, 0, 0]} name="目标温度" opacity={0.7} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Alarms */}
      <div className="tech-card corner-decoration p-5">
        <h3 className="section-title title-decorated text-sm mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-warning" />
          最近告警
        </h3>
        <table className="data-table">
          <thead>
            <tr><th>位置</th><th>类型</th><th>数值</th><th>时间</th><th>等级</th></tr>
          </thead>
          <tbody>
            {recentAlarms.map((a) => (
              <tr key={a.id}>
                <td className="font-heading font-semibold">{a.zone}</td>
                <td className="font-heading">{a.type}</td>
                <td className="font-display text-xs">{a.value}</td>
                <td className="text-muted-foreground font-display text-xs">{a.time}</td>
                <td><span className={`font-display font-bold text-xs ${levelColors[a.level]}`}>{a.level}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* System Status Bar */}
    <div className="tech-card-accent p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <CheckCircle2 className="w-5 h-5 text-accent" />
        <span className="text-sm font-heading">系统运行状态: <span className="text-accent font-bold">正常运行</span></span>
      </div>
      <div className="flex gap-8 text-xs text-muted-foreground font-heading">
        <span>运行时长: <span className="text-foreground font-display">1,247</span> h</span>
        <span>采集频率: <span className="text-foreground font-display">5</span> s</span>
        <span>上次同步: <span className="text-foreground">2 分钟前</span></span>
      </div>
    </div>
  </div>
);

export default Overview;
