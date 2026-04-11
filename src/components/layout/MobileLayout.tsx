import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CheckSquare, Compass, ClipboardList, BookOpen, BarChart2, WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';
export function MobileLayout({ children }: { children: React.ReactNode }) {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  return (
    <div className="min-h-screen bg-[#F0F2F5] flex justify-center overflow-x-hidden">
      <div className="w-full max-w-[390px] min-h-screen bg-white relative flex flex-col shadow-2xl border-x-[0.5px] border-border">
        {isOffline && (
          <div className="bg-muted text-muted-foreground text-[10px] py-1 px-4 flex items-center justify-center gap-2 animate-in fade-in slide-in-from-top-1">
            <WifiOff className="w-3 h-3" />
            <span>Offline Mode — All changes saved locally</span>
          </div>
        )}
        <main className="flex-1 overflow-y-auto pb-[calc(80px+env(safe-area-inset-bottom))]">
          {children}
        </main>
        <nav className={cn(
          "fixed bottom-0 w-full max-w-[390px] bg-white/90 backdrop-blur-xl border-t-[0.5px] border-border flex items-center justify-around px-2 z-50",
          "h-[calc(80px+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)]"
        )}>
          <NavLink to="/" className={({ isActive }) => cn("bottom-nav-item", isActive && "active")}>
            <Home className="w-5 h-5" />
            <span>Home</span>
          </NavLink>
          <NavLink to="/check-in" className={({ isActive }) => cn("bottom-nav-item", isActive && "active")}>
            <CheckSquare className="w-5 h-5" />
            <span>Check-in</span>
          </NavLink>
          <NavLink to="/frames" className={({ isActive }) => cn("bottom-nav-item", isActive && "active")}>
            <Compass className="w-5 h-5" />
            <span>Frames</span>
          </NavLink>
          <NavLink to="/commitments" className={({ isActive }) => cn("bottom-nav-item", isActive && "active")}>
            <ClipboardList className="w-5 h-5" />
            <span>Commitments</span>
          </NavLink>
          <NavLink to="/ledger" className={({ isActive }) => cn("bottom-nav-item", isActive && "active")}>
            <BookOpen className="w-5 h-5" />
            <span>Ledger</span>
          </NavLink>
          <NavLink to="/insights" className={({ isActive }) => cn("bottom-nav-item", isActive && "active")}>
            <BarChart2 className="w-5 h-5" />
            <span>Insights</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
}