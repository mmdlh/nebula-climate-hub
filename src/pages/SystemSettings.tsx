import { Settings, Shield, Bell, Database, Clock, Users, Globe, Key } from "lucide-react";

const settingSections = [
  {
    title: "温控参数",
    icon: Settings,
    items: [
      { label: "默认采集频率", value: "5秒", desc: "传感器数据采集间隔" },
      { label: "温度偏差阈值", value: "±2°C", desc: "超出此范围触发告警" },
      { label: "湿度偏差阈值", value: "±10%", desc: "超出此范围触发告警" },
      { label: "数据保留周期", value: "365天", desc: "历史数据自动清理周期" },
    ],
  },
  {
    title: "告警设置",
    icon: Bell,
    items: [
      { label: "紧急告警通知", value: "SMS+APP", desc: "紧急级别告警通知方式" },
      { label: "一般告警通知", value: "APP", desc: "一般级别告警通知方式" },
      { label: "告警静默时段", value: "无", desc: "此时段内不发送通知" },
      { label: "重复告警间隔", value: "15分钟", desc: "同一告警最短重复间隔" },
    ],
  },
  {
    title: "安全设置",
    icon: Shield,
    items: [
      { label: "双因素认证", value: "已启用", desc: "登录时需要额外验证" },
      { label: "会话超时", value: "30分钟", desc: "无操作自动退出" },
      { label: "密码策略", value: "强密码", desc: "8位+大小写+数字" },
      { label: "操作审计", value: "已启用", desc: "记录所有关键操作" },
    ],
  },
];

const systemInfo = [
  { icon: Database, label: "数据库", value: "正常", extra: "128GB/500GB" },
  { icon: Clock, label: "运行时间", value: "1,247h", extra: "01-15重启" },
  { icon: Globe, label: "网络", value: "正常", extra: "2ms 1Gbps" },
  { icon: Key, label: "许可证", value: "企业版", extra: "至2025-12" },
  { icon: Users, label: "在线用户", value: "8人", extra: "管3 操5" },
  { icon: Shield, label: "安全评分", value: "96", extra: "3天前评估" },
];

const logs = [
  { time: "14:23:15", user: "admin", action: "修改温控参数", detail: "A区目标温度 4.0→3.5°C", type: "config" },
  { time: "13:50:02", user: "operator01", action: "确认告警", detail: "ALM-0891 标记处理中", type: "alarm" },
  { time: "12:30:00", user: "system", action: "自动备份", detail: "完整备份 12.3GB", type: "system" },
  { time: "11:15:30", user: "admin", action: "新增用户", detail: "添加 operator03", type: "user" },
  { time: "10:00:00", user: "system", action: "定时巡检", detail: "206台完成 2台异常", type: "system" },
  { time: "09:00:00", user: "system", action: "日报生成", detail: "03-08日报已发送", type: "system" },
];

const typeColor: Record<string, string> = {
  config: "text-primary bg-primary/10 border border-primary/20",
  alarm: "text-warning bg-warning/10 border border-warning/20",
  system: "text-muted-foreground bg-muted border border-border",
  user: "text-accent bg-accent/10 border border-accent/20",
};

const SystemSettings = () => (
  <div className="space-y-5 pb-8">
    <h2 className="section-title title-decorated">系统设置</h2>

    {/* System Info */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {systemInfo.map((s) => (
        <div key={s.label} className="tech-card p-4 hover:tech-card-accent transition-all duration-300">
          <s.icon className="w-5 h-5 text-primary mb-2" />
          <div className="text-[9px] font-display tracking-[0.2em] text-muted-foreground uppercase">{s.label}</div>
          <div className="font-display font-bold text-xl text-primary glow-text mt-1">{s.value}</div>
          <div className="text-[10px] text-muted-foreground mt-1 font-heading">{s.extra}</div>
        </div>
      ))}
    </div>

    {/* Settings */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {settingSections.map((section) => (
        <div key={section.title} className="tech-card corner-decoration p-5">
          <h3 className="section-title title-decorated text-sm mb-4 flex items-center gap-2">
            <section.icon className="w-4 h-4 text-primary" />
            {section.title}
          </h3>
          <div className="space-y-3">
            {section.items.map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-border/20 last:border-0">
                <div>
                  <div className="text-sm font-heading font-semibold">{item.label}</div>
                  <div className="text-[10px] text-muted-foreground">{item.desc}</div>
                </div>
                <span className="text-xs font-display font-bold text-primary shrink-0 ml-4">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    {/* Logs */}
    <div className="tech-card corner-decoration p-5">
      <h3 className="section-title title-decorated text-sm mb-4 flex items-center gap-2">
        <Clock className="w-4 h-4 text-primary" />
        操作日志
      </h3>
      <table className="data-table">
        <thead><tr><th>时间</th><th>用户</th><th>操作</th><th>详情</th><th>类型</th></tr></thead>
        <tbody>
          {logs.map((l, i) => (
            <tr key={i}>
              <td className="font-display text-[10px] text-muted-foreground">{l.time}</td>
              <td className="font-heading font-semibold">{l.user}</td>
              <td className="font-heading">{l.action}</td>
              <td className="text-xs text-muted-foreground">{l.detail}</td>
              <td><span className={`text-[10px] font-display font-bold px-2 py-0.5 rounded-sm ${typeColor[l.type]}`}>{l.type}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default SystemSettings;
