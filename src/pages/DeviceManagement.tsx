import { Server, Wifi, WifiOff, Wrench, Clock, Cpu, HardDrive, Signal } from "lucide-react";

const devices = [
  { id: "DEV-001", name: "温控主机-A1", type: "温控主机", zone: "A区", status: "online", ip: "192.168.1.101", uptime: "45天12小时", cpu: 23, mem: 41, firmware: "v3.2.1" },
  { id: "DEV-002", name: "温控主机-B1", type: "温控主机", zone: "B区", status: "online", ip: "192.168.1.102", uptime: "45天12小时", cpu: 31, mem: 55, firmware: "v3.2.1" },
  { id: "DEV-003", name: "传感器阵列-A", type: "传感器组", zone: "A区", status: "online", ip: "192.168.1.201", uptime: "30天8小时", cpu: 12, mem: 28, firmware: "v2.1.0" },
  { id: "DEV-004", name: "空调控制器-C1", type: "空调控制", zone: "C区", status: "maintenance", ip: "192.168.1.301", uptime: "-", cpu: 0, mem: 0, firmware: "v1.8.5" },
  { id: "DEV-005", name: "传感器阵列-D", type: "传感器组", zone: "D区", status: "online", ip: "192.168.1.202", uptime: "22天3小时", cpu: 15, mem: 33, firmware: "v2.1.0" },
  { id: "DEV-006", name: "网关-GW01", type: "通信网关", zone: "全区", status: "online", ip: "192.168.1.1", uptime: "60天0小时", cpu: 45, mem: 62, firmware: "v4.0.3" },
  { id: "DEV-007", name: "温控主机-E1", type: "温控主机", zone: "E区", status: "offline", ip: "192.168.1.103", uptime: "-", cpu: 0, mem: 0, firmware: "v3.1.0" },
  { id: "DEV-008", name: "湿度控制器-F1", type: "湿度控制", zone: "F区", status: "online", ip: "192.168.1.401", uptime: "15天6小时", cpu: 19, mem: 35, firmware: "v2.3.2" },
];

const statusConfig: Record<string, { label: string; icon: typeof Wifi; color: string; bg: string }> = {
  online: { label: "在线", icon: Wifi, color: "text-accent", bg: "bg-accent/15" },
  offline: { label: "离线", icon: WifiOff, color: "text-destructive", bg: "bg-destructive/15" },
  maintenance: { label: "维护中", icon: Wrench, color: "text-warning", bg: "bg-warning/15" },
};

const typeStats = [
  { type: "温控主机", total: 12, online: 10, icon: Cpu },
  { type: "传感器组", total: 48, online: 46, icon: Signal },
  { type: "空调控制", total: 24, online: 22, icon: HardDrive },
  { type: "通信网关", total: 6, online: 6, icon: Server },
];

const DeviceManagement = () => (
  <div className="space-y-6">
    {/* Device Type Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {typeStats.map((ts) => (
        <div key={ts.type} className="glass-card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
              <ts.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">{ts.type}</div>
              <div className="font-display text-2xl font-bold">{ts.total}</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-accent">在线 {ts.online}</span>
            <span className="text-muted-foreground">离线 {ts.total - ts.online}</span>
          </div>
          <div className="progress-bar mt-2">
            <div className="progress-bar-fill" style={{ width: `${(ts.online / ts.total) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>

    {/* Devices Table */}
    <div className="glass-card p-5">
      <h2 className="section-title flex items-center gap-2 mb-4">
        <Server className="w-4 h-4 text-primary" />
        设备列表
      </h2>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr><th>编号</th><th>名称</th><th>类型</th><th>分区</th><th>状态</th><th>IP地址</th><th>运行时长</th><th>CPU</th><th>内存</th><th>固件</th></tr>
          </thead>
          <tbody>
            {devices.map((d) => {
              const st = statusConfig[d.status];
              return (
                <tr key={d.id}>
                  <td className="font-display text-primary">{d.id}</td>
                  <td className="font-medium">{d.name}</td>
                  <td className="text-muted-foreground">{d.type}</td>
                  <td>{d.zone}</td>
                  <td>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${st.color} ${st.bg}`}>
                      <st.icon className="w-3 h-3" />
                      {st.label}
                    </span>
                  </td>
                  <td className="font-mono text-xs text-muted-foreground">{d.ip}</td>
                  <td className="text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3 h-3" />{d.uptime}
                    </span>
                  </td>
                  <td>
                    {d.cpu > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="progress-bar w-12">
                          <div className="progress-bar-fill" style={{ width: `${d.cpu}%`, background: d.cpu > 80 ? '#ff4444' : undefined }} />
                        </div>
                        <span className="text-xs">{d.cpu}%</span>
                      </div>
                    )}
                  </td>
                  <td>
                    {d.mem > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="progress-bar w-12">
                          <div className="progress-bar-fill" style={{ width: `${d.mem}%`, background: d.mem > 80 ? '#ff4444' : undefined }} />
                        </div>
                        <span className="text-xs">{d.mem}%</span>
                      </div>
                    )}
                  </td>
                  <td className="text-xs text-muted-foreground">{d.firmware}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default DeviceManagement;
