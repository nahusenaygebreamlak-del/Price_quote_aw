import React from 'react';
import { LayoutDashboard, Settings, User, Building2 } from './Icons';
import { ThemeColor } from '../types';

interface SidebarProps {
  currentTheme: ThemeColor;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTheme }) => {
  const themeTextColors: Record<ThemeColor, string> = {
    blue: 'text-blue-600',
    indigo: 'text-indigo-600',
    emerald: 'text-emerald-600',
    rose: 'text-rose-600',
    amber: 'text-amber-600',
    slate: 'text-slate-600',
  };

  const activeClass = `bg-white shadow-sm border-r-4 ${themeTextColors[currentTheme]} border-${currentTheme}-600`;

  return (
    <div className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3 border-b border-gray-100">
        <div className={`p-2 rounded-lg ${themeTextColors[currentTheme]} bg-gray-50`}>
           <Settings size={24} />
        </div>
        <span className="font-bold text-xl text-gray-800">AdminPanel</span>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">Menu</div>
        
        <button className="flex items-center w-full gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors text-left">
          <LayoutDashboard size={20} />
          <span className="font-medium">Dashboard</span>
        </button>

        <button className={`flex items-center w-full gap-3 px-4 py-3 rounded-lg transition-all text-left ${activeClass}`}>
          <Building2 size={20} />
          <span className="font-medium">Company Settings</span>
        </button>

        <button className="flex items-center w-full gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors text-left">
          <User size={20} />
          <span className="font-medium">Users</span>
        </button>
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-bold">
            JD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">John Doe</span>
            <span className="text-xs text-gray-500">Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
};