import { Zap, TrendingDown, DollarSign, Leaf, Battery } from "lucide-react";
import StatCard from "@/components/StatCard";
import MiniChart from "@/components/MiniChart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const monthlyEnergy = [
  { name: "1月", cooling: 4200, heating: 1800, lighting: 900, other: 600 },
  { name: "2月", cooling: 3800, heating: 2100, lighting: 850, other: 550 },
  { name: "3月", cooling: 4500, heating: 1200, lighting: 900, other: 620 },
  { name: "4月", cooling: 5100, heating: 600, lighting: 880, other: 580 },
  { name: "5月", cooling: 6200, heating: 200, lighting: 920, other: 610 },
  { name: "6月", cooling: 7800, heating: 0, lighting: 950, other: 650 },
];

const dailyPower = Array.from({ length: 24 }, (_, i) => ({
  name: `${String(i).padStart(2,'0')}:00`,
  value: 80 + Math.sin(i / 3) * 40 + Math.random() * 20,
  value2: 100,
}));

const zoneEnergy = [
  { zone: "冷藏区 A", power: 2450, percent: 28, efficiency: 92 },
  { zone: "冷冻区 B", power: 3120, percent: 36, efficiency: 88 },
  { zone: "恒温区 C", power: 980, percent: 11, efficiency: 95 },
  { zone: "加工区 D", power: 860, percent: 10, efficiency: 91 },
  { zone: "储存区 E", power: 720, percent: 8, efficiency: 94 },
  { zone: "出货区 F", power: 570, percent: 7, efficiency: 89 },
];

const tooltipStyle = { background: 'hsl(220 50% 8% / 0.95)', border: '1px solid hsl(210 60% 22%)', borderRadius: '2px', color: 'hsl(210 40% 88%)', fontSize: 11 };

const EnergyManagement = () => (
  <div className="space-y-5 pb-8">
    <h2 className="section-title title-decorated">能耗管理</h2>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="今日能耗" value="8,720" unit="kWh" icon={Zap} variant="primary" trend={{ value: 3.2, up: false }} />
      <StatCard title="月度费用" value="¥52,340" icon={DollarSign} variant="warning" trend={{ value: 1.5, up: false }} />
      <StatCard title="节能率" value="12.8" unit="%" icon={Leaf} variant="accent" trend={{ value: 2.1, up: true }} />
      <StatCard title="碳排放" value="4.2" unit="吨" icon={TrendingDown} variant="default" trend={{ value: 5.0, up: false }} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2 tech-card corner-decoration p-5">
        <h3 className="section-title title-decorated text-sm mb-4">月度能耗分析</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyEnergy}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 50% 16% / 0.6)" />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'hsl(215 20% 50%)', fontFamily: 'Rajdhani' }} axisLine={{ stroke: 'hsl(215 50% 16%)' }} />
            <YAxis tick={{ fontSize: 10, fill: 'hsl(215 20% 50%)', fontFamily: 'Orbitron' }} axisLine={{ stroke: 'hsl(215 50% 16%)' }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'Rajdhani' }} />
            <Bar dataKey="cooling" stackId="a" fill="#2196f3" name="制冷" />
            <Bar dataKey="heating" stackId="a" fill="#f44336" name="制热" />
            <Bar dataKey="lighting" stackId="a" fill="#ff9800" name="照明" />
            <Bar dataKey="other" stackId="a" fill="#607d8b" name="其他" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="tech-card corner-decoration p-5">
        <h3 className="section-title title-decorated text-sm mb-4">分区能耗</h3>
        <div className="space-y-5">
          {zoneEnergy.map((z) => (
            <div key={z.zone}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-heading font-semibold">{z.zone}</span>
                <span className="font-display text-primary text-xs">{z.power} kWh</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${z.percent}%` }} />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1 font-heading">
                <span>占比 {z.percent}%</span>
                <span>效率 <span className="text-accent font-display font-semibold">{z.efficiency}%</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="tech-card corner-decoration p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="section-title title-decorated text-sm flex items-center gap-2">
          <Battery className="w-4 h-4 text-primary" />
          实时功率
        </h3>
        <div className="flex gap-4 text-[10px] font-heading">
          <span className="flex items-center gap-1.5"><span className="w-4 h-[2px] bg-primary rounded" />实际功率</span>
          <span className="flex items-center gap-1.5"><span className="w-4 h-[2px] bg-warning rounded opacity-60" />额定功率</span>
        </div>
      </div>
      <MiniChart data={dailyPower} color="#2196f3" color2="#ff9800" height={220} showGrid showAxis />
    </div>
  </div>
);

export default EnergyManagement;
