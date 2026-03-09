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
  { label: "光照", value: "45K lux", icon: Sun, color: "text-warning" },
  { label: "气压", value: "1013 hPa", icon: Gauge, color: "text-primary" },
  { label: "空气质量", value: "优", icon: Fan, color: "text-accent" },
];

const schedules = [
  { time: "06:00", action: "启动制冷系统", target: "全区空调", detail: "目标温度逐步降至设定值", status: "已执行" },
  { time: "08:00", action: "切换高速风", target: "A/B区空调", detail: "早高峰开门频繁加大冷量", status: "已执行" },
  { time: "12:00", action: "午间节能模式", target: "C/D区空调", detail: "降低风速温度上浮1°C", status: "已执行" },
  { time: "14:00", action: "恢复正常模式", target: "C/D区空调", detail: "恢复设定温度和风速", status: "执行中" },
  { time: "18:00", action: "夜间节能", target: "全区空调", detail: "温度上浮2°C低速运行", status: "待执行" },
  { time: "22:00", action: "最低功率运行", target: "E/F区空调", detail: "维持最低温控需求", status: "待执行" },
];

const statusColor: Record<string, string> = {
  "运行": "text-accent bg-accent/10 border border-accent/25",
  "待机": "text-muted-foreground bg-muted border border-border",
};

const scheduleColor: Record<string, string> = {
  "已执行": "text-accent",
  "执行中": "text-primary animate-pulse-glow",
  "待执行": "text-muted-foreground",
};

const EnvironmentControl = () => (
  <div className="space-y-5 pb-8">
    <h2 className="section-title title-decorated">环境控制</h2>

    {/* Env Params */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {envParams.map((p) => (
        <div key={p.label} className="tech-card p-4 text-center hover:tech-card-accent transition-all duration-300">
          <p.icon className={`w-6 h-6 mx-auto mb-2 ${p.color}`} />
          <div className="text-[9px] font-display tracking-[0.2em] text-muted-foreground uppercase mb-1">{p.label}</div>
          <div className="font-display font-bold text-lg">{p.value}</div>
        </div>
      ))}
    </div>

    {/* HVAC */}
    <div className="tech-card corner-decoration p-5">
      <h3 className="section-title title-decorated text-sm mb-4 flex items-center gap-2">
        <Fan className="w-4 h-4 text-primary" />
        暖通设备控制
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {hvacUnits.map((u) => (
          <div key={u.id} className="bg-secondary/40 rounded-sm p-4 border border-border/60 hover:border-primary/30 transition-all">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-heading font-bold tracking-wider">{u.name}</h4>
              <span className={`text-[10px] px-2 py-0.5 rounded-sm font-display font-bold ${statusColor[u.status]}`}>{u.status}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-[9px] font-display tracking-widest text-muted-foreground">ZONE</span>
                <div className="font-heading font-semibold">{u.zone}</div>
              </div>
              <div>
                <span className="text-[9px] font-display tracking-widest text-muted-foreground">MODE</span>
                <div className="font-heading font-semibold text-primary">{u.mode}</div>
              </div>
              {u.setTemp !== 0 && (
                <>
                  <div>
                    <span className="text-[9px] font-display tracking-widest text-muted-foreground">SET</span>
                    <div className="font-display font-bold text-lg">{u.setTemp}°C</div>
                  </div>
                  <div>
                    <span className="text-[9px] font-display tracking-widest text-muted-foreground">CURRENT</span>
                    <div className="font-display font-bold text-lg text-primary glow-text">{u.currentTemp}°C</div>
                  </div>
                </>
              )}
              <div>
                <span className="text-[9px] font-display tracking-widest text-muted-foreground">LOAD</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="progress-bar flex-1">
                    <div className="progress-bar-fill" style={{ width: `${u.power}%` }} />
                  </div>
                  <span className="text-[10px] font-display">{u.power}%</span>
                </div>
              </div>
              <div>
                <span className="text-[9px] font-display tracking-widest text-muted-foreground">FAN</span>
                <div className="font-heading font-semibold">{u.fan}</div>
              </div>
            </div>
            <div className="flex gap-2 mt-3 pt-3 border-t border-border/30">
              <button className="flex-1 py-1.5 text-[10px] font-display tracking-wider rounded-sm bg-primary/10 border border-primary/25 text-primary hover:bg-primary/20 transition-colors flex items-center justify-center gap-1">
                <ArrowUpDown className="w-3 h-3" />调温
              </button>
              <button className="flex-1 py-1.5 text-[10px] font-display tracking-wider rounded-sm bg-secondary border border-border text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1">
                <Power className="w-3 h-3" />开关
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Schedule */}
    <div className="tech-card corner-decoration p-5">
      <h3 className="section-title title-decorated text-sm mb-4 flex items-center gap-2">
        <Gauge className="w-4 h-4 text-primary" />
        智能调度
      </h3>
      <div className="relative">
        <div className="absolute left-[72px] top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg, hsl(205 100% 55% / 0.4), hsl(205 100% 55% / 0.1))' }} />
        <div className="space-y-3">
          {schedules.map((s, i) => (
            <div key={i} className="flex items-start gap-4 pl-2">
              <div className="font-display text-xs text-primary w-12 text-right shrink-0 pt-1 tracking-wider">{s.time}</div>
              <div className="relative">
                <div className={`w-2.5 h-2.5 rounded-full border-2 border-primary mt-1.5 ${s.status === "执行中" ? "bg-primary glow-dot text-primary" : "bg-background"}`} />
              </div>
              <div className="flex-1 bg-secondary/30 border border-border/30 rounded-sm p-3">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold tracking-wider text-sm">{s.action}</span>
                  <span className={`text-[10px] font-display font-bold tracking-wider ${scheduleColor[s.status]}`}>{s.status}</span>
                </div>
                <div className="text-[10px] text-muted-foreground mt-1 font-heading">{s.target} · {s.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default EnvironmentControl;
