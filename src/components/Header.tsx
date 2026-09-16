import React from 'react';
import { TabType } from '../types';

interface HeaderProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenVipModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onTabChange
}) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#10131a]/95 backdrop-blur-md border-b border-[#272a32]/80 shadow-sm">
      <div className="h-14 px-4 max-w-7xl mx-auto flex items-center justify-between">
        {/* Clean Brand Title without logo or subtitles */}
        <div 
          onClick={() => onTabChange('inicio')}
          className="flex items-center gap-2 cursor-pointer select-none"
          id="header-brand"
        >
          <span className="font-display font-black text-xl tracking-tight text-white uppercase">
            FutAoVivo
          </span>
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#93000a] text-white border border-[#ffb4ab]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] animate-ping" />
            <span className="font-display text-[10px] font-extrabold uppercase tracking-wider">
              AO VIVO
            </span>
          </div>
        </div>

        {/* Clean Quick Link to WhatsApp */}
        <a
          href="https://wa.me/5511993881626?text=Ol%C3%A1%2C%20quero%20assistir%20aos%20jogos%20ao%20vivo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-[#10b981] hover:bg-[#4edea3] text-[#003824] px-3.5 py-1.5 rounded-xl font-display font-black text-xs uppercase tracking-wide transition-all shadow-sm active:scale-95"
        >
          Assistir Agora
        </a>
      </div>
    </header>
  );
};
