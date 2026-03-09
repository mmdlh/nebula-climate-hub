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
      { label: "紧急告警通知", value: "短信+邮件+APP", desc: "紧急级别告警的通知方式" },
      { label: "一般告警通知", value: "APP推送", desc: "一般级别告警的通知方式" },
      { label: "告警静默时段", value: "无", desc: "在此时段内不发送通知" },
      { label: "重复告警间隔", value: "15分钟", desc: "同一告警重复通知的最短间隔" },
    ],
  },
  {
    title: "安全设置",
    icon: Shield,
    items: [
      { label: "双因素认证", value: "已启用", desc: "登录时需要额外验证" },
      { label: "会话超时", value: "30分钟", desc: "无操作自动退出登录" },
      { label: "密码策略", value: "强密码", desc: "至少8位，包含大小写和数字" },
      { label: "操作审计", value: "已启用", desc: "记录所有关键操作" },
    ],
  },
];

const systemInfo = [
  { icon: Database, label: "数据库状态", value: "正常", extra: "已用空间: 128GB / 500GB" },
  { icon: Clock, label: "系统运行时间", value: "1,247小时", extra: "上次重启: 2024-01-15" },
  { icon: Globe, label: "网络状态", value: "正常", extra: "延迟: 2ms | 带宽: 1Gbps" },
  { icon: Key, label: "许可证", value: "企业版", extra: "有效期至: 2025-12-31" },
  { icon: Users, label: "在线用户", value: "8人", extra: "管理员3 | 操作员5" },
  { icon: Shield, label: "安全评分", value: "96/100", extra: "上次评估: 3天前" },
];

const logs = [
  { time: "14:23:15", user: "admin", action: "修改温控参数", detail: "A区目标温度: 4.0°C → 3.5°C", type: "config" },
  { time: "13:50:02", user: "operator01", action: "确认告警", detail: "ALM-2024-0891 已标记为处理中", type: "alarm" },
  { time: "12:30:00", user: "system", action: "自动备份", detail: "数据库完整备份完成 (12.3GB)", type: "system" },
  { time: "11:15:30", user: "admin", action: "新增用户", detail: "添加操作员 operator03", type: "user" },
  { time: "10:00:00", user: "system", action: "定时巡检", detail: "206台设备巡检完成，2台异常", type: "system" },
  { time: "09:00:00", user: "system", action: "日报生成", detail: "2024-03-08日报已发送", type: "system" },
];

const typeColor: Record<string, string> = {
  config: "text-primary bg-primary/15",
  alarm: "text-warning bg-warning/15",
  system: "text-muted-foreground bg-secondary",
  user: "text-accent bg-accent/15",
};

const SystemSettings = () => (
  <div className="space-y-6">
    {/* System Info */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {systemInfo.map((s) => (
        <div key={s.label} className="glass-card p-4">
          <s.icon className="w-5 h-5 text-primary mb-2" />
          <div className="text-xs text-muted-foreground">{s.label}</div>
          <div className="font-display font-bold text-lg mt-1">{s.value}</div>
          <div className="text-xs text-muted-foreground mt-1">{s.extra}</div>
        </div>
      ))}
    </div>

    {/* Settings Sections */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {settingSections.map((section) => (
        <div key={section.title} className="glass-card p-5">
          <h2 className="section-title flex items-center gap-2 mb-4">
            <section.icon className="w-4 h-4 text-primary" />
            {section.title}
          </h2>
          <div className="space-y-4">
            {section.items.map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                <div>
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
                <span className="text-sm font-display text-primary shrink-0 ml-4">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    {/* Operation Logs */}
    <div className="glass-card p-5">
      <h2 className="section-title flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-primary" />
        操作日志
      </h2>
      <table className="data-table">
        <thead>
          <tr><th>时间</th><th>用户</th><th>操作</th><th>详情</th><th>类型</th></tr>
        </thead>
        <tbody>
          {logs.map((l, i) => (
            <tr key={i}>
              <td className="font-display text-sm text-muted-foreground">{l.time}</td>
              <td className="font-medium">{l.user}</td>
              <td>{l.action}</td>
              <td className="text-sm text-muted-foreground">{l.detail}</td>
              <td><span className={`text-xs px-2 py-0.5 rounded-full ${typeColor[l.type]}`}>{l.type}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default SystemSettings;
