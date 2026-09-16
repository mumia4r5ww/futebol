import React from 'react';
import { X, Play } from 'lucide-react';
import { Match } from '../types';
import { DirectImage } from './DirectImage';
import { getWhatsAppLink, WHATSAPP_DISPLAY_NUMBER } from '../utils/whatsapp';

interface VipModalProps {
  isOpen: boolean;
  onClose: () => void;
  match?: Match | null;
}

export const VipModal: React.FC<VipModalProps> = ({
  isOpen,
  onClose,
  match
}) => {
  if (!isOpen) return null;

  const matchLabel = match ? `${match.homeTeam.name} x ${match.awayTeam.name}` : undefined;
  const whatsappUrl = getWhatsAppLink(matchLabel);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-sm bg-[#191b23] border border-[#272a32] rounded-2xl p-5 flex flex-col gap-4 shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#bbcabf] hover:text-white rounded-lg bg-[#272a32] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-display font-bold text-[#4edea3] uppercase">
            WhatsApp Oficial
          </span>
          <h3 className="font-display font-black text-lg text-white uppercase tracking-tight">
            Assistir no WhatsApp
          </h3>
          <p className="text-xs text-[#bbcabf]">
            Número direto: {WHATSAPP_DISPLAY_NUMBER}
          </p>
        </div>

        {match && (
          <div className="bg-[#0b0e15] p-3 rounded-xl border border-[#272a32] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-md bg-white p-0.5 flex items-center justify-center shrink-0 border border-white/80">
                <DirectImage src={match.homeTeam.logo} alt={match.homeTeam.name} />
              </div>
              <span className="text-xs font-display font-bold text-white truncate max-w-[150px]">
                {match.homeTeam.name} x {match.awayTeam.name}
              </span>
              <div className="w-6 h-6 rounded-md bg-white p-0.5 flex items-center justify-center shrink-0 border border-white/80">
                <DirectImage src={match.awayTeam.logo} alt={match.awayTeam.name} />
              </div>
            </div>
            <span className="text-xs font-data text-[#4edea3] font-bold shrink-0">
              {match.status === 'LIVE' ? `AO VIVO ${match.minute}'` : match.time}
            </span>
          </div>
        )}

        {/* CTA Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#10b981] hover:bg-[#4edea3] text-[#003824] py-3 px-4 rounded-xl font-display font-black text-sm uppercase flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98]"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Assistir Agora</span>
        </a>
      </div>
    </div>
  );
};
