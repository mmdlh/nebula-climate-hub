import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard, Thermometer, Server, Bell,
  BarChart3, Zap, Wind, Settings
} from "lucide-react";
import techBg from "@/assets/tech-bg.jpg";

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
    <div className="min-h-screen tech-bg">
      {/* Background image */}
      <div className="fixed inset-0 z-0">
        <img src={techBg} alt="" className="w-full h-full object-cover opacity-50" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background/50" />
      </div>
      {/* Ambient glow spots */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="header-bar sticky top-0 z-50 h-[68px]">
        <div className="flex items-center h-full px-5 relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mr-4 shrink-0">
            {/* Hexagon logo container */}
            <div className="relative w-10 h-10 flex items-center justify-center">
              <svg viewBox="0 0 40 40" className="absolute inset-0 w-full h-full">
                <polygon
                  points="20,2 36,11 36,29 20,38 4,29 4,11"
                  fill="none"
                  stroke="hsl(205 100% 55%)"
                  strokeWidth="1.5"
                  opacity="0.6"
                />
                <polygon
                  points="20,6 32,13 32,27 20,34 8,27 8,13"
                  fill="hsl(205 100% 55% / 0.1)"
                  stroke="hsl(205 100% 55%)"
                  strokeWidth="0.5"
                  opacity="0.4"
                />
              </svg>
              <Thermometer className="w-4 h-4 text-primary relative z-10" />
            </div>
            <div>
              <h1 className="text-lg font-display font-bold text-primary glow-text tracking-[0.2em] leading-tight">
                SMART TEMP
              </h1>
              <p className="text-[9px] font-display tracking-[0.3em] text-muted-foreground uppercase">
                智能温控平台 V3.0
              </p>
            </div>
          </div>

          {/* Divider line */}
          <div className="h-8 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent mx-3 shrink-0" />

          {/* Navigation */}
          <nav className="flex-1 flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `nav-item flex-1 min-w-0 ${isActive ? "active" : ""}`
                }
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span className="text-[10px] font-heading font-semibold truncate tracking-wider">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Right side info */}
          <div className="h-8 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent mx-3 shrink-0" />
          <div className="shrink-0 text-right">
            <div className="text-[10px] font-display text-primary tracking-widest animate-pulse-glow">● ONLINE</div>
            <div className="text-[9px] text-muted-foreground font-heading tracking-wider">SYS NORMAL</div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10 p-5 animate-fade-in">
        <Outlet />
      </main>

      {/* Footer bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 h-6 flex items-center justify-between px-5 text-[9px] font-display tracking-wider text-muted-foreground border-t border-border/30 bg-background/80 backdrop-blur-sm">
        <span>SMART TEMPERATURE CONTROL SYSTEM</span>
        <div className="flex gap-6">
          <span>数据延迟: <span className="text-accent">2ms</span></span>
          <span>采集节点: <span className="text-primary">206</span></span>
          <span>网络: <span className="text-accent">正常</span></span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
