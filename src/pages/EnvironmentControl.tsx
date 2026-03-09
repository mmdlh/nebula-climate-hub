import { Wind, Droplets, Sun, Gauge, Power, ThermometerSun, Fan, ArrowUpDown } from "lucide-react";

const hvacUnits = [
  { id: 1, name: "中央空调-1号", zone: "A/B区", mode: "制冷", setTemp: 4, currentTemp: 4.2, power: 85, fan: "高速", status: "运行" },
  { id: 2, name: "中央空调-2号", zone: "C/D区", mode: "制冷", setTemp: 25, currentTemp: 25.1, power: 62, fan: "中速", status: "运行" },
  { id: 3, name: "中央空调-3号", zone: "E/F区", mode: "送风", setTemp: 20, currentTemp: 20.3, power: 30, fan: "低速", status: "运行" },
  { id: 4, name: "新风系统-1号", zone: "全区", mode: "换气", setTemp: 22, currentTemp: 22.5, power: 45, fan: "自动", status: "运行" },
  { id: 5, name: "除湿机-1号", zone: "A区", mode: "除湿", setTemp: 0, currentTemp: 0, power: 55, fan: "高速", status: "运行" },
  { id: 6, name: "加湿器-1号", zone: "D区", mode: "加湿", setTemp: 0, currentTemp: 0, power: 0, fan: "-", status: "待机" },
];

const envParams = [
  { label: "室外温度", value: "31.5°C", icon: ThermometerSun, color: "text-warning" },
  { label: "室外湿度", value: "72%", icon: Droplets, color: "text-primary" },
  { label: "风速", value: "3.2 m/s", icon: Wind, color: "text-accent" },
  { label: "光照强度", value: "45,000 lux", icon: Sun, color: "text-warning" },
  { label: "气压", value: "1013 hPa", icon: Gauge, color: "text-primary" },
  { label: "空气质量", value: "优", icon: Fan, color: "text-accent" },
];

const schedules = [
  { time: "06:00", action: "启动制冷系统", target: "全区空调", detail: "目标温度逐步降至设定值", status: "已执行" },
  { time: "08:00", action: "切换高速风", target: "A/B区空调", detail: "早高峰开门频繁，加大冷量", status: "已执行" },
  { time: "12:00", action: "午间节能模式", target: "C/D区空调", detail: "降低风速，温度上浮1°C", status: "已执行" },
  { time: "14:00", action: "恢复正常模式", target: "C/D区空调", detail: "恢复设定温度和风速", status: "执行中" },
  { time: "18:00", action: "夜间节能", target: "全区空调", detail: "温度上浮2°C，低速运行", status: "待执行" },
  { time: "22:00", action: "最低功率运行", target: "E/F区空调", detail: "维持最低温控需求", status: "待执行" },
];

const statusColor: Record<string, string> = {
  "运行": "text-accent bg-accent/15",
  "待机": "text-muted-foreground bg-secondary",
  "故障": "text-destructive bg-destructive/15",
};

const scheduleColor: Record<string, string> = {
  "已执行": "text-accent",
  "执行中": "text-primary animate-pulse-glow",
  "待执行": "text-muted-foreground",
};

const EnvironmentControl = () => (
  <div className="space-y-6">
    {/* Environment Params */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {envParams.map((p) => (
        <div key={p.label} className="glass-card p-4 text-center">
          <p.icon className={`w-6 h-6 mx-auto mb-2 ${p.color}`} />
          <div className="text-xs text-muted-foreground mb-1">{p.label}</div>
          <div className="font-display font-bold text-lg">{p.value}</div>
        </div>
      ))}
    </div>

    {/* HVAC Controls */}
    <div className="glass-card p-5">
      <h2 className="section-title flex items-center gap-2 mb-4">
        <Fan className="w-4 h-4 text-primary" />
        暖通设备控制
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {hvacUnits.map((u) => (
          <div key={u.id} className="bg-secondary/50 rounded-xl p-4 border border-border/50 hover:border-primary/30 transition-all">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading font-semibold">{u.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[u.status]}`}>{u.status}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-xs text-muted-foreground">覆盖区域</span>
                <div className="font-medium">{u.zone}</div>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">运行模式</span>
                <div className="font-medium text-primary">{u.mode}</div>
              </div>
              {u.setTemp !== 0 && (
                <>
                  <div>
                    <span className="text-xs text-muted-foreground">设定温度</span>
                    <div className="font-display font-bold">{u.setTemp}°C</div>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">当前温度</span>
                    <div className="font-display font-bold text-primary">{u.currentTemp}°C</div>
                  </div>
                </>
              )}
              <div>
                <span className="text-xs text-muted-foreground">负载</span>
                <div className="flex items-center gap-2">
                  <div className="progress-bar flex-1">
                    <div className="progress-bar-fill" style={{ width: `${u.power}%` }} />
                  </div>
                  <span className="text-xs font-display">{u.power}%</span>
                </div>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">风速</span>
                <div className="font-medium">{u.fan}</div>
              </div>
            </div>
            <div className="flex gap-2 mt-3 pt-3 border-t border-border/30">
              <button className="flex-1 py-1.5 text-xs rounded-lg bg-primary/15 text-primary hover:bg-primary/25 transition-colors flex items-center justify-center gap-1">
                <ArrowUpDown className="w-3 h-3" />调温
              </button>
              <button className="flex-1 py-1.5 text-xs rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1">
                <Power className="w-3 h-3" />开关
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Schedule */}
    <div className="glass-card p-5">
      <h2 className="section-title flex items-center gap-2 mb-4">
        <Gauge className="w-4 h-4 text-primary" />
        智能调度计划
      </h2>
      <div className="relative">
        <div className="absolute left-[72px] top-0 bottom-0 w-px bg-border/50" />
        <div className="space-y-4">
          {schedules.map((s, i) => (
            <div key={i} className="flex items-start gap-4 pl-2">
              <div className="font-display text-sm text-primary w-12 text-right shrink-0 pt-0.5">{s.time}</div>
              <div className="relative">
                <div className={`w-3 h-3 rounded-full border-2 border-primary mt-1.5 ${s.status === "执行中" ? "bg-primary glow-dot text-primary" : "bg-background"}`} />
              </div>
              <div className="flex-1 bg-secondary/30 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-semibold text-sm">{s.action}</span>
                  <span className={`text-xs font-medium ${scheduleColor[s.status]}`}>{s.status}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{s.target} · {s.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default EnvironmentControl;
