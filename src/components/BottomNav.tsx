import React from 'react';
import { PlayCircle, CalendarDays, Trophy, SlidersHorizontal, MessageCircle } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  liveCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  liveCount = 4
}) => {
  const navItems: { id: TabType; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'inicio', label: 'Início', icon: PlayCircle, badge: liveCount },
    { id: 'jogos', label: 'Jogos', icon: CalendarDays },
    { id: 'ligas', label: 'Ligas', icon: Trophy },
    { id: 'admin', label: 'Admin', icon: SlidersHorizontal },
    { id: 'contato', label: 'Contato', icon: MessageCircle }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0b0e15]/95 backdrop-blur-xl border-t border-[#272a32] shadow-[0_-8px_30px_rgba(0,0,0,0.7)] pb-safe">
      <div className="max-w-md md:max-w-xl mx-auto flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => onTabChange(item.id)}
              className={`relative flex flex-col items-center justify-center min-w-[56px] py-1.5 px-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-[#4edea3]'
                  : 'text-[#86948a] hover:text-[#e1e2ec]'
              } active:scale-95`}
            >
              {/* Active top glow bar */}
              {isActive && (
                <div className="absolute -top-2 w-8 h-1 bg-[#4edea3] rounded-full shadow-[0_0_10px_#4edea3]" />
              )}

              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.5]' : 'stroke-2'}`} />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2.5 w-4 h-4 rounded-full bg-[#ef4444] text-[9px] font-extrabold text-white flex items-center justify-center animate-pulse">
                    {item.badge}
                  </span>
                )}
              </div>

              <span className={`text-[11px] font-semibold mt-1 tracking-tight ${
                isActive ? 'font-bold text-white' : 'text-[#86948a]'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
