import { Bell, AlertTriangle, AlertOctagon, CheckCircle2, Filter } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const alarmStats = [
  { label: "今日告警", value: 17, icon: Bell, color: "text-warning", bg: "bg-warning/10 border-warning/25" },
  { label: "紧急告警", value: 3, icon: AlertOctagon, color: "text-destructive", bg: "bg-destructive/10 border-destructive/25" },
  { label: "已处理", value: 12, icon: CheckCircle2, color: "text-accent", bg: "bg-accent/10 border-accent/25" },
  { label: "待处理", value: 5, icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10 border-warning/25" },
];

const alarmsByType = [
  { name: "温度过高", value: 35, color: "#f44336" },
  { name: "温度过低", value: 18, color: "#2196f3" },
  { name: "湿度异常", value: 22, color: "#ff9800" },
  { name: "设备故障", value: 15, color: "#ef5350" },
  { name: "通信中断", value: 10, color: "#607d8b" },
];

const weeklyAlarms = [
  { name: "周一", high: 5, mid: 8, low: 12 },
  { name: "周二", high: 3, mid: 6, low: 9 },
  { name: "周三", high: 7, mid: 10, low: 15 },
  { name: "周四", high: 2, mid: 5, low: 8 },
  { name: "周五", high: 4, mid: 7, low: 11 },
  { name: "周六", high: 1, mid: 3, low: 6 },
  { name: "周日", high: 3, mid: 4, low: 7 },
];

const alarmList = [
  { id: "ALM-0892", time: "03-09 14:23", zone: "B区-03号冷藏柜", type: "温度过高", detail: "当前32.5°C 超出上限28°C", level: "紧急", status: "待处理" },
  { id: "ALM-0891", time: "03-09 13:45", zone: "A区-12号储存架", type: "湿度异常", detail: "湿度85% 超出范围60-75%", level: "一般", status: "处理中" },
  { id: "ALM-0890", time: "03-09 12:10", zone: "D区-07号传感器", type: "设备离线", detail: "离线超过30分钟", level: "提示", status: "待处理" },
  { id: "ALM-0889", time: "03-09 11:30", zone: "C区-01号恒温箱", type: "温度波动", detail: "波动±3.2°C 超出阈值±1°C", level: "一般", status: "已处理" },
  { id: "ALM-0888", time: "03-09 10:55", zone: "F区-09号出货口", type: "传感器故障", detail: "读数异常 疑似硬件故障", level: "紧急", status: "处理中" },
  { id: "ALM-0887", time: "03-09 09:20", zone: "B区-01号冷冻柜", type: "温度过低", detail: "当前-24.5°C 低于下限-22°C", level: "一般", status: "已处理" },
  { id: "ALM-0886", time: "03-09 08:15", zone: "E区-05号储存区", type: "通信中断", detail: "网关GW-03中断 影响5个传感器", level: "紧急", status: "已处理" },
];

const levelStyle: Record<string, string> = {
  "紧急": "text-destructive bg-destructive/10 border border-destructive/25",
  "一般": "text-warning bg-warning/10 border border-warning/25",
  "提示": "text-primary bg-primary/10 border border-primary/25",
};
const statusStyle: Record<string, string> = {
  "待处理": "text-warning",
  "处理中": "text-primary animate-pulse-glow",
  "已处理": "text-accent",
};

const tooltipStyle = { background: 'hsl(220 50% 8% / 0.95)', border: '1px solid hsl(210 60% 22%)', borderRadius: '2px', color: 'hsl(210 40% 88%)', fontSize: 11 };

const AlarmManagement = () => (
  <div className="space-y-5 pb-8">
    <h2 className="section-title title-decorated">报警管理</h2>

    {/* Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {alarmStats.map((s) => (
        <div key={s.label} className="tech-card corner-decoration p-5 flex items-center gap-4">
          <div className={`w-12 h-12 rounded-sm border flex items-center justify-center ${s.bg}`}>
            <s.icon className={`w-6 h-6 ${s.color}`} />
          </div>
          <div>
            <div className="text-[10px] font-display tracking-widest text-muted-foreground uppercase">{s.label}</div>
            <div className={`stat-value ${s.color}`}>{s.value}</div>
          </div>
        </div>
      ))}
    </div>

    {/* Charts Row */}
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
      <div className="lg:col-span-3 tech-card corner-decoration p-5">
        <h3 className="section-title title-decorated text-sm mb-4">本周告警趋势</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weeklyAlarms}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 50% 16% / 0.6)" />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'hsl(215 20% 50%)', fontFamily: 'Rajdhani' }} axisLine={{ stroke: 'hsl(215 50% 16%)' }} />
            <YAxis tick={{ fontSize: 10, fill: 'hsl(215 20% 50%)', fontFamily: 'Orbitron' }} axisLine={{ stroke: 'hsl(215 50% 16%)' }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="high" stackId="a" fill="#f44336" name="紧急" />
            <Bar dataKey="mid" stackId="a" fill="#ff9800" name="一般" />
            <Bar dataKey="low" stackId="a" fill="#2196f3" name="提示" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="lg:col-span-2 tech-card corner-decoration p-5">
        <h3 className="section-title title-decorated text-sm mb-4">告警分布</h3>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie data={alarmsByType} cx="50%" cy="50%" outerRadius={70} innerRadius={40} dataKey="value" strokeWidth={0}>
              {alarmsByType.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-2 mt-3">
          {alarmsByType.map((a) => (
            <div key={a.name} className="flex items-center gap-2 text-[10px] font-heading">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: a.color }} />
              <span className="text-muted-foreground flex-1">{a.name}</span>
              <span className="font-display font-semibold">{a.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Alarm List */}
    <div className="tech-card corner-decoration p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="section-title title-decorated text-sm flex items-center gap-2">
          <Bell className="w-4 h-4 text-warning" />
          告警记录
        </h3>
        <button className="flex items-center gap-1.5 text-[10px] font-display tracking-wider text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 border border-border rounded-sm bg-secondary/50">
          <Filter className="w-3 h-3" />筛选
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead><tr><th>编号</th><th>时间</th><th>位置</th><th>类型</th><th>详情</th><th>等级</th><th>状态</th></tr></thead>
          <tbody>
            {alarmList.map((a) => (
              <tr key={a.id}>
                <td className="font-display text-primary text-[10px]">{a.id}</td>
                <td className="text-[10px] text-muted-foreground font-display whitespace-nowrap">{a.time}</td>
                <td className="font-heading font-semibold text-sm">{a.zone}</td>
                <td className="text-sm font-heading">{a.type}</td>
                <td className="text-xs text-muted-foreground max-w-[200px] truncate">{a.detail}</td>
                <td><span className={`text-[10px] font-display font-bold px-2 py-0.5 rounded-sm ${levelStyle[a.level]}`}>{a.level}</span></td>
                <td className={`text-xs font-heading font-semibold ${statusStyle[a.status]}`}>{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default AlarmManagement;
