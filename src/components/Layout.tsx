import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard, Thermometer, Server, Bell,
  BarChart3, Zap, Wind, Settings
} from "lucide-react";

const navItems = [
  { path: "/", label: "系统总览", icon: LayoutDashboard },
  { path: "/temperature", label: "温度监控", icon: Thermometer },
  { path: "/devices", label: "设备管理", icon: Server },
  { path: "/alarms", label: "报警管理", icon: Bell },
  { path: "/analysis", label: "数据分析", icon: BarChart3 },
  { path: "/energy", label: "能耗管理", icon: Zap },
  { path: "/environment", label: "环境控制", icon: Wind },
  { path: "/settings", label: "系统设置", icon: Settings },
];

const Layout = () => {
  return (
    <div className="min-h-screen bg-background tech-grid">
      {/* Header */}
      <header className="sticky top-0 z-50 h-16 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="flex items-center h-full px-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mr-6 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center glow-border">
              <Thermometer className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-xl font-display font-bold text-primary glow-text tracking-wider whitespace-nowrap">
              智能温控平台
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 flex items-center justify-end gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `nav-item flex-1 max-w-[140px] min-w-0 ${isActive ? "active" : ""}`
                }
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span className="text-xs font-heading font-medium truncate">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="p-6 animate-fade-in">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
