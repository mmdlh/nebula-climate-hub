import { Thermometer, MapPin, TrendingUp, TrendingDown, Minus } from "lucide-react";
import MiniChart from "@/components/MiniChart";

const zones = [
  { id: "A", name: "冷藏区 A", current: 4.2, target: 4.0, min: 2.0, max: 6.0, humidity: 78, status: "正常" },
  { id: "B", name: "冷冻区 B", current: -18.5, target: -18.0, min: -22.0, max: -16.0, humidity: 45, status: "正常" },
  { id: "C", name: "恒温区 C", current: 25.1, target: 25.0, min: 22.0, max: 28.0, humidity: 55, status: "正常" },
  { id: "D", name: "加工区 D", current: 32.8, target: 30.0, min: 25.0, max: 35.0, humidity: 40, status: "偏高" },
  { id: "E", name: "储存区 E", current: 20.3, target: 20.0, min: 18.0, max: 22.0, humidity: 60, status: "正常" },
  { id: "F", name: "出货区 F", current: 15.7, target: 16.0, min: 12.0, max: 20.0, humidity: 65, status: "正常" },
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

const getStatusStyle = (s: string) => s === "正常" ? "text-accent bg-accent/15 border-accent/30" : "text-warning bg-warning/15 border-warning/30";
const getTempIcon = (current: number, target: number) => {
  const diff = current - target;
  if (Math.abs(diff) < 0.5) return <Minus className="w-4 h-4 text-accent" />;
  return diff > 0 ? <TrendingUp className="w-4 h-4 text-warning" /> : <TrendingDown className="w-4 h-4 text-primary" />;
};

const TemperatureMonitor = () => (
  <div className="space-y-5 pb-8">
    <div className="flex items-center justify-between">
      <h2 className="section-title title-decorated">温度监控</h2>
      <div className="flex items-center gap-2 text-[10px] font-display tracking-wider text-muted-foreground">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
        6 个监控区域
      </div>
    </div>

    {/* Zone Cards Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {zones.map((zone) => (
        <div key={zone.id} className="tech-card corner-decoration group hover:tech-card-accent transition-all duration-300 overflow-hidden">
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <h3 className="font-heading font-bold text-lg tracking-wider">{zone.name}</h3>
              </div>
              <span className={`text-[10px] font-display font-bold px-3 py-1 border rounded-sm tracking-wider ${getStatusStyle(zone.status)}`}>
                {zone.status}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <div className="text-[10px] font-display tracking-widest text-muted-foreground mb-1">CURRENT</div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-display font-bold text-primary glow-text">{zone.current}</span>
                  <span className="text-sm text-muted-foreground font-display">°C</span>
                  {getTempIcon(zone.current, zone.target)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-display tracking-widest text-muted-foreground mb-1">TARGET</div>
                <div className="font-display text-lg font-semibold text-accent">{zone.target}°C</div>
                <div className="text-[10px] text-muted-foreground font-display">{zone.min} ~ {zone.max}°C</div>
              </div>
            </div>

            <div className="mb-3">
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${((zone.current - zone.min) / (zone.max - zone.min)) * 100}%` }} />
              </div>
            </div>

            <div className="flex justify-between text-[10px] text-muted-foreground font-heading">
              <span>湿度: <span className="text-foreground font-display font-semibold">{zone.humidity}%</span></span>
              <span>偏差: <span className={`font-display font-semibold ${Math.abs(zone.current - zone.target) > 1 ? "text-warning" : "text-accent"}`}>
                {zone.current > zone.target ? "+" : ""}{(zone.current - zone.target).toFixed(1)}°C
              </span></span>
            </div>
          </div>

          <div className="border-t border-border/30 px-2 pb-1">
            <MiniChart data={genData(zone.current)} color={zone.status === "正常" ? "#2196f3" : "#ff9800"} height={90} />
          </div>
        </div>
      ))}
    </div>

    {/* Sensors Table */}
    <div className="tech-card corner-decoration p-5">
      <h3 className="section-title title-decorated text-sm mb-4 flex items-center gap-2">
        <Thermometer className="w-4 h-4 text-primary" />
        传感器列表
      </h3>
      <table className="data-table">
        <thead>
          <tr><th>编号</th><th>分区</th><th>温度</th><th>电量</th><th>信号</th><th>更新</th></tr>
        </thead>
        <tbody>
          {sensors.map((s) => (
            <tr key={s.id}>
              <td className="font-display text-primary text-xs">{s.id}</td>
              <td className="font-heading font-semibold">{s.zone}区</td>
              <td className="font-display text-sm">{s.temp}°C</td>
              <td>
                <div className="flex items-center gap-2">
                  <div className="progress-bar w-16">
                    <div className="progress-bar-fill" style={{ width: `${s.battery}%`, background: s.battery < 60 ? '#ff9800' : undefined }} />
                  </div>
                  <span className="text-[10px] font-display text-muted-foreground">{s.battery}%</span>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full glow-dot ${s.signal > 90 ? 'text-accent bg-accent' : 'text-warning bg-warning'}`} />
                  <span className="text-[10px] font-display">{s.signal}%</span>
                </div>
              </td>
              <td className="text-muted-foreground text-xs font-heading">{s.lastUpdate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default TemperatureMonitor;
