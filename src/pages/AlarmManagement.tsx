import { Bell, AlertTriangle, AlertOctagon, Info, CheckCircle2, Filter } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const alarmStats = [
  { label: "今日告警", value: 17, icon: Bell, color: "text-warning" },
  { label: "紧急告警", value: 3, icon: AlertOctagon, color: "text-destructive" },
  { label: "已处理", value: 12, icon: CheckCircle2, color: "text-accent" },
  { label: "待处理", value: 5, icon: AlertTriangle, color: "text-warning" },
];

const alarmsByType = [
  { name: "温度过高", value: 35, color: "#ff4444" },
  { name: "温度过低", value: 18, color: "#00d4ff" },
  { name: "湿度异常", value: 22, color: "#ffaa00" },
  { name: "设备故障", value: 15, color: "#ff6b6b" },
  { name: "通信中断", value: 10, color: "#888" },
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
  { id: "ALM-2024-0892", time: "2024-03-09 14:23:15", zone: "B区-03号冷藏柜", type: "温度过高", detail: "当前温度32.5°C，超出上限28°C", level: "紧急", status: "待处理" },
  { id: "ALM-2024-0891", time: "2024-03-09 13:45:30", zone: "A区-12号储存架", type: "湿度异常", detail: "湿度85%，超出正常范围60-75%", level: "一般", status: "处理中" },
  { id: "ALM-2024-0890", time: "2024-03-09 12:10:45", zone: "D区-07号传感器", type: "设备离线", detail: "设备已离线超过30分钟", level: "提示", status: "待处理" },
  { id: "ALM-2024-0889", time: "2024-03-09 11:30:00", zone: "C区-01号恒温箱", type: "温度波动", detail: "温度波动±3.2°C，超出稳定阈值±1°C", level: "一般", status: "已处理" },
  { id: "ALM-2024-0888", time: "2024-03-09 10:55:20", zone: "F区-09号出货口", type: "传感器故障", detail: "温度传感器读数异常，疑似硬件故障", level: "紧急", status: "处理中" },
  { id: "ALM-2024-0887", time: "2024-03-09 09:20:10", zone: "B区-01号冷冻柜", type: "温度过低", detail: "当前温度-24.5°C，低于下限-22°C", level: "一般", status: "已处理" },
  { id: "ALM-2024-0886", time: "2024-03-09 08:15:00", zone: "E区-05号储存区", type: "通信中断", detail: "网关GW-03通信中断，影响5个传感器", level: "紧急", status: "已处理" },
];

const levelStyle: Record<string, string> = {
  "紧急": "text-destructive bg-destructive/15",
  "一般": "text-warning bg-warning/15",
  "提示": "text-primary bg-primary/15",
};
const statusStyle: Record<string, string> = {
  "待处理": "text-warning",
  "处理中": "text-primary",
  "已处理": "text-accent",
};

const AlarmManagement = () => (
  <div className="space-y-6">
    {/* Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {alarmStats.map((s) => (
        <div key={s.label} className="glass-card p-5 flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl bg-secondary flex items-center justify-center`}>
            <s.icon className={`w-6 h-6 ${s.color}`} />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
            <div className="stat-value">{s.value}</div>
          </div>
        </div>
      ))}
    </div>

    {/* Charts Row */}
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Weekly Chart */}
      <div className="lg:col-span-3 glass-card p-5">
        <h2 className="section-title mb-4">本周告警趋势</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weeklyAlarms}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 25% 18%)" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(210 15% 55%)' }} axisLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'hsl(210 15% 55%)' }} axisLine={false} />
            <Tooltip contentStyle={{ background: 'hsl(215 30% 10% / 0.95)', border: '1px solid hsl(200 40% 25%)', borderRadius: '8px', color: 'hsl(200 60% 92%)', fontSize: 12 }} />
            <Bar dataKey="high" stackId="a" fill="#ff4444" name="紧急" radius={[0, 0, 0, 0]} />
            <Bar dataKey="mid" stackId="a" fill="#ffaa00" name="一般" />
            <Bar dataKey="low" stackId="a" fill="#00d4ff" name="提示" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Type Pie */}
      <div className="lg:col-span-2 glass-card p-5">
        <h2 className="section-title mb-4">告警类型分布</h2>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie data={alarmsByType} cx="50%" cy="50%" outerRadius={70} dataKey="value" strokeWidth={0}>
              {alarmsByType.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Pie>
            <Tooltip contentStyle={{ background: 'hsl(215 30% 10% / 0.95)', border: '1px solid hsl(200 40% 25%)', borderRadius: '8px', color: 'hsl(200 60% 92%)', fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {alarmsByType.map((a) => (
            <div key={a.name} className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: a.color }} />
              <span className="text-muted-foreground">{a.name}</span>
              <span className="font-display ml-auto">{a.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Alarm List */}
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title flex items-center gap-2">
          <Bell className="w-4 h-4 text-warning" />
          告警记录
        </h2>
        <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg bg-secondary">
          <Filter className="w-3.5 h-3.5" />筛选
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr><th>编号</th><th>时间</th><th>位置</th><th>类型</th><th>详情</th><th>等级</th><th>状态</th></tr>
          </thead>
          <tbody>
            {alarmList.map((a) => (
              <tr key={a.id}>
                <td className="font-display text-primary text-xs">{a.id}</td>
                <td className="text-xs text-muted-foreground whitespace-nowrap">{a.time}</td>
                <td className="font-medium text-sm">{a.zone}</td>
                <td className="text-sm">{a.type}</td>
                <td className="text-xs text-muted-foreground max-w-[240px] truncate">{a.detail}</td>
                <td><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${levelStyle[a.level]}`}>{a.level}</span></td>
                <td className={`text-sm font-medium ${statusStyle[a.status]}`}>{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default AlarmManagement;
