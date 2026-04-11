import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CheckSquare, Compass, ClipboardList, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';
export function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-[390px] min-h-screen bg-white relative flex flex-col shadow-xl">
        <main className="flex-1 overflow-y-auto pb-24">
          {children}
        </main>
        <nav className="fixed bottom-0 w-full max-w-[390px] h-20 bg-white/80 backdrop-blur-lg border-t-[0.5px] border-border flex items-center justify-around px-2 z-50">
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
            <span>Plans</span>
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