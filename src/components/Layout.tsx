import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Clock, Plus, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const Layout = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Clock, label: "Reminders" },
    { path: "/add", icon: Plus, label: "Add" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Content */}
      <div className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </div>

      {/* Bottom Navigation - Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:hidden">
        <div className="flex items-center justify-around h-16">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <NavLink
                key={path}
                to={path}
                className={cn(
                  "flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-colors min-w-0 flex-1",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon size={20} className={cn(
                  "transition-transform",
                  isActive && "scale-110"
                )} />
                <span className="text-xs mt-1 font-medium">{label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Side Navigation - Desktop */}
      <nav className="hidden md:fixed md:left-0 md:top-0 md:bottom-0 md:w-64 md:bg-card md:border-r md:border-border md:flex md:flex-col md:p-6">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-primary">Smart Reminders</h1>
          <p className="text-sm text-muted-foreground">Never miss a deal</p>
        </div>
        
        <div className="space-y-2">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <NavLink
                key={path}
                to={path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon size={20} />
                <span className="font-medium">{label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;