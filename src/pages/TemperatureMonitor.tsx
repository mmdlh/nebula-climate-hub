import { Thermometer, MapPin, TrendingUp, TrendingDown, Minus } from "lucide-react";
import MiniChart from "@/components/MiniChart";

const zones = [
  { id: "A", name: "冷藏区A", current: 4.2, target: 4.0, min: 2.0, max: 6.0, humidity: 78, status: "正常" },
  { id: "B", name: "冷冻区B", current: -18.5, target: -18.0, min: -22.0, max: -16.0, humidity: 45, status: "正常" },
  { id: "C", name: "恒温区C", current: 25.1, target: 25.0, min: 22.0, max: 28.0, humidity: 55, status: "正常" },
  { id: "D", name: "加工区D", current: 32.8, target: 30.0, min: 25.0, max: 35.0, humidity: 40, status: "偏高" },
  { id: "E", name: "储存区E", current: 20.3, target: 20.0, min: 18.0, max: 22.0, humidity: 60, status: "正常" },
  { id: "F", name: "出货区F", current: 15.7, target: 16.0, min: 12.0, max: 20.0, humidity: 65, status: "正常" },
];

const genData = (base: number) => Array.from({ length: 48 }, (_, i) => ({
  name: `${Math.floor(i/2)}:${i%2 === 0 ? '00' : '30'}`,
  value: base + Math.sin(i / 5) * 2 + (Math.random() - 0.5) * 1.5,
}));

const sensors = [
  { id: "S-001", zone: "A", temp: 4.1, battery: 92, signal: 98, lastUpdate: "刚刚" },
  { id: "S-002", zone: "A", temp: 4.3, battery: 87, signal: 95, lastUpdate: "10秒前" },
  { id: "S-003", zone: "B", temp: -18.2, battery: 76, signal: 91, lastUpdate: "5秒前" },
  { id: "S-004", zone: "B", temp: -18.8, battery: 95, signal: 99, lastUpdate: "刚刚" },
  { id: "S-005", zone: "C", temp: 25.0, battery: 63, signal: 88, lastUpdate: "15秒前" },
  { id: "S-006", zone: "D", temp: 33.1, battery: 81, signal: 94, lastUpdate: "刚刚" },
  { id: "S-007", zone: "E", temp: 20.1, battery: 55, signal: 85, lastUpdate: "30秒前" },
  { id: "S-008", zone: "F", temp: 15.9, battery: 90, signal: 97, lastUpdate: "刚刚" },
];

const getStatusStyle = (s: string) => s === "正常" ? "text-accent" : s === "偏高" ? "text-warning" : "text-destructive";
const getTempIcon = (current: number, target: number) => {
  const diff = current - target;
  if (Math.abs(diff) < 0.5) return <Minus className="w-4 h-4 text-accent" />;
  return diff > 0 ? <TrendingUp className="w-4 h-4 text-warning" /> : <TrendingDown className="w-4 h-4 text-primary" />;
};

const TemperatureMonitor = () => (
  <div className="space-y-6">
    {/* Zone Cards Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {zones.map((zone) => (
        <div key={zone.id} className="glass-card overflow-hidden group hover:glow-border transition-all duration-300">
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <h3 className="font-heading font-semibold text-lg">{zone.name}</h3>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary ${getStatusStyle(zone.status)}`}>
                {zone.status}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <div className="text-xs text-muted-foreground mb-1">当前温度</div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-display font-bold text-primary glow-text">{zone.current}°C</span>
                  {getTempIcon(zone.current, zone.target)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground mb-1">目标 / 范围</div>
                <div className="font-display text-sm">{zone.target}°C</div>
                <div className="text-xs text-muted-foreground">{zone.min} ~ {zone.max}°C</div>
              </div>
            </div>

            {/* Temperature Range Bar */}
            <div className="mb-3">
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${((zone.current - zone.min) / (zone.max - zone.min)) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>湿度: <span className="text-foreground font-display">{zone.humidity}%</span></span>
              <span>偏差: <span className={Math.abs(zone.current - zone.target) > 1 ? "text-warning" : "text-accent"}>
                {zone.current > zone.target ? "+" : ""}{(zone.current - zone.target).toFixed(1)}°C
              </span></span>
            </div>
          </div>

          <div className="border-t border-border/30 px-2 pb-2">
            <MiniChart data={genData(zone.current)} color={zone.status === "正常" ? "#00d4ff" : "#ffaa00"} height={100} />
          </div>
        </div>
      ))}
    </div>

    {/* Sensors Table */}
    <div className="glass-card p-5">
      <h2 className="section-title flex items-center gap-2 mb-4">
        <Thermometer className="w-4 h-4 text-primary" />
        传感器列表
      </h2>
      <table className="data-table">
        <thead>
          <tr><th>编号</th><th>分区</th><th>温度</th><th>电量</th><th>信号强度</th><th>更新时间</th></tr>
        </thead>
        <tbody>
          {sensors.map((s) => (
            <tr key={s.id}>
              <td className="font-display text-primary">{s.id}</td>
              <td>{s.zone}区</td>
              <td className="font-display">{s.temp}°C</td>
              <td>
                <div className="flex items-center gap-2">
                  <div className="progress-bar w-16">
                    <div className="progress-bar-fill" style={{
                      width: `${s.battery}%`,
                      background: s.battery < 60 ? '#ffaa00' : undefined,
                    }} />
                  </div>
                  <span className="text-xs text-muted-foreground">{s.battery}%</span>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full glow-dot ${s.signal > 90 ? 'text-accent bg-accent' : 'text-warning bg-warning'}`} />
                  <span className="text-xs">{s.signal}%</span>
                </div>
              </td>
              <td className="text-muted-foreground text-xs">{s.lastUpdate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default TemperatureMonitor;
