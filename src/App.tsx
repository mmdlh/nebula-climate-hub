import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Overview from "./pages/Overview";
import TemperatureMonitor from "./pages/TemperatureMonitor";
import DeviceManagement from "./pages/DeviceManagement";
import AlarmManagement from "./pages/AlarmManagement";
import DataAnalysis from "./pages/DataAnalysis";
import EnergyManagement from "./pages/EnergyManagement";
import EnvironmentControl from "./pages/EnvironmentControl";
import SystemSettings from "./pages/SystemSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Overview />} />
            <Route path="/temperature" element={<TemperatureMonitor />} />
            <Route path="/devices" element={<DeviceManagement />} />
            <Route path="/alarms" element={<AlarmManagement />} />
            <Route path="/analysis" element={<DataAnalysis />} />
            <Route path="/energy" element={<EnergyManagement />} />
            <Route path="/environment" element={<EnvironmentControl />} />
            <Route path="/settings" element={<SystemSettings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
