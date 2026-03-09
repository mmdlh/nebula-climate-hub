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
  name: `${i}:00`,
  value: 80 + Math.sin(i / 3) * 40 + Math.random() * 20,
  value2: 100,
}));

const zoneEnergy = [
  { zone: "冷藏区A", power: 2450, percent: 28, efficiency: 92 },
  { zone: "冷冻区B", power: 3120, percent: 36, efficiency: 88 },
  { zone: "恒温区C", power: 980, percent: 11, efficiency: 95 },
  { zone: "加工区D", power: 860, percent: 10, efficiency: 91 },
  { zone: "储存区E", power: 720, percent: 8, efficiency: 94 },
  { zone: "出货区F", power: 570, percent: 7, efficiency: 89 },
];

const tooltipStyle = { background: 'hsl(215 30% 10% / 0.95)', border: '1px solid hsl(200 40% 25%)', borderRadius: '8px', color: 'hsl(200 60% 92%)', fontSize: 12 };

const EnergyManagement = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="今日能耗" value="8,720" unit="kWh" icon={Zap} variant="primary" trend={{ value: 3.2, up: false }} />
      <StatCard title="月度费用" value="¥52,340" icon={DollarSign} variant="warning" trend={{ value: 1.5, up: false }} />
      <StatCard title="节能率" value="12.8" unit="%" icon={Leaf} variant="accent" trend={{ value: 2.1, up: true }} />
      <StatCard title="碳排放" value="4.2" unit="吨" icon={TrendingDown} variant="default" trend={{ value: 5.0, up: false }} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Monthly Breakdown */}
      <div className="lg:col-span-2 glass-card p-5">
        <h2 className="section-title mb-4">月度能耗分析</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyEnergy}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 25% 18%)" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(210 15% 55%)' }} axisLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'hsl(210 15% 55%)' }} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12, color: 'hsl(210 15% 55%)' }} />
            <Bar dataKey="cooling" stackId="a" fill="#00d4ff" name="制冷" />
            <Bar dataKey="heating" stackId="a" fill="#ff6b6b" name="制热" />
            <Bar dataKey="lighting" stackId="a" fill="#ffaa00" name="照明" />
            <Bar dataKey="other" stackId="a" fill="#888" name="其他" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Zone Breakdown */}
      <div className="glass-card p-5">
        <h2 className="section-title mb-4">分区能耗</h2>
        <div className="space-y-4">
          {zoneEnergy.map((z) => (
            <div key={z.zone}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-heading">{z.zone}</span>
                <span className="font-display text-primary">{z.power} kWh</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${z.percent}%` }} />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>占比 {z.percent}%</span>
                <span>效率 <span className="text-accent">{z.efficiency}%</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Daily Power Curve */}
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title flex items-center gap-2">
          <Battery className="w-4 h-4 text-primary" />
          实时功率曲线
        </h2>
        <div className="flex gap-4 text-xs">
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-primary rounded" />实际功率</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-warning rounded" />额定功率</span>
        </div>
      </div>
      <MiniChart data={dailyPower} color="#00d4ff" color2="#ffaa00" height={220} showGrid showAxis />
    </div>
  </div>
);

export default EnergyManagement;
