import React, { useState } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  MessageSquare, 
  Share2, 
  Tv, 
  Check, 
  Clock, 
  ShieldAlert, 
  ArrowRightLeft, 
  Activity, 
  Radio,
  MapPin
} from 'lucide-react';
import { Match } from '../types';
import { DirectImage } from './DirectImage';
import { getWhatsAppLink } from '../utils/whatsapp';

interface MatchDetailModalProps {
  match: Match | null;
  onClose: () => void;
  onOpenWhatsApp: (match: Match) => void;
}

export const MatchDetailModal: React.FC<MatchDetailModalProps> = ({
  match,
  onClose,
  onOpenWhatsApp
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeTab, setActiveTab] = useState<'stats' | 'timeline' | 'lineups'>('stats');
  const [copiedLink, setCopiedLink] = useState(false);
  const [currentStreamServer, setCurrentStreamServer] = useState('Servidor 1 • 1080p 60fps');

  if (!match) return null;

  const isLive = match.status === 'LIVE';

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#191b23] border border-[#272a32] rounded-2xl overflow-hidden shadow-2xl flex flex-col my-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#272a32] bg-[#10131a]">
          <div className="flex items-center gap-2 min-w-0">
            {isLive ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#93000a] text-white text-[10px] font-display font-extrabold uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] animate-ping" />
                AO VIVO {match.minute ? `${match.minute}'` : ''}
              </span>
            ) : (
              <span className="bg-[#272a32] text-[#4edea3] px-2 py-0.5 rounded-full text-[10px] font-data font-bold">
                {match.time || '19:00'}
              </span>
            )}
            <span className="text-xs text-[#bbcabf] font-display font-bold truncate">
              {match.league} {match.round ? `• ${match.round}` : ''}
            </span>
            {match.stadium && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#4edea3] bg-[#0b0e15] px-2 py-0.5 rounded border border-[#272a32]">
                <MapPin className="w-3 h-3 text-[#4edea3]" />
                <span className="truncate max-w-[160px]">{match.stadium}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 text-[#bbcabf] hover:text-white rounded-lg bg-[#272a32] transition-colors"
              title="Compartilhar Link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-[#4edea3]" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#bbcabf] hover:text-white rounded-lg bg-[#272a32] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Video Player Area */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden group">
          {/* Animated Stadium/Field Visual Simulation */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-screen scale-105"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCSD6kX0UVyzJxvivb-FB4J_LeX9ZGeFtxb7I7Hk4tixL7H5_LOCsMbZQA53gT0m2jFIcMq0ACe9puee-CM0B9iH7JC_TBjmgbmEGQ-ZBR8XRC3ZjrTHanbrGYLYrAOi3sR3bjOxwJl2t5kr7-dtovsvlpYbLZEXRyBNx7E6tVH0Qdo2zOLkDG10hMe1qcmce-dn0oIdnNGiGmOayZbmrVvYBgX954n4iGKX9hn3XUoZLyitqWm193_jw')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* Telemetry Overlay in Player */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-xs font-data">
            <Radio className="w-3.5 h-3.5 text-[#4edea3] animate-pulse" />
            <span className="text-white font-bold">{currentStreamServer}</span>
          </div>

          <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 text-[10px] font-display uppercase tracking-wider text-[#4edea3]">
            <span>FULL HD 1080P</span>
          </div>

          {/* Center Teams Scoreboard inside player */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="flex items-center gap-4 sm:gap-6 bg-[#10131a]/80 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/10 shadow-2xl">
              {/* Home */}
              <div className="flex flex-col items-center gap-1.5 w-24 sm:w-28">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white p-1.5 flex items-center justify-center border-2 border-white shadow-lg">
                  <DirectImage src={match.homeTeam.logo} alt={match.homeTeam.name} />
                </div>
                <span className="font-display font-black text-xs sm:text-sm text-white line-clamp-2 max-w-full text-center uppercase tracking-tight">
                  {match.homeTeam.name}
                </span>
              </div>

              {/* Score */}
              <div className="flex flex-col items-center px-1">
                <div className="flex items-center gap-1 text-white font-display text-3xl sm:text-4xl font-black tracking-tight">
                  <span>{match.homeScore}</span>
                  <span className="text-[#4edea3]">:</span>
                  <span>{match.awayScore}</span>
                </div>
                <span className="font-data text-[10px] text-[#4edea3] font-bold mt-0.5">
                  {isLive ? `${match.minute}' (${match.half || '2ºT'})` : match.time}
                </span>
              </div>

              {/* Away */}
              <div className="flex flex-col items-center gap-1.5 w-24 sm:w-28">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white p-1.5 flex items-center justify-center border-2 border-white shadow-lg">
                  <DirectImage src={match.awayTeam.logo} alt={match.awayTeam.name} />
                </div>
                <span className="font-display font-black text-xs sm:text-sm text-white line-clamp-2 max-w-full text-center uppercase tracking-tight">
                  {match.awayTeam.name}
                </span>
              </div>
            </div>

            {/* Simulated Live Action Ticker */}
            {isLive && (
              <div className="inline-flex items-center gap-2 bg-[#10b981]/90 text-[#003824] px-3 py-1 rounded-full text-xs font-display font-black shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#003824] animate-ping" />
                <span>TRANSMISSÃO AO VIVO • ÁUDIO ORIGINAL</span>
              </div>
            )}
          </div>

          {/* Player Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 flex items-center justify-between z-20 opacity-90 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white hover:text-[#4edea3] transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
              </button>
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="text-white hover:text-[#4edea3] transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <span className="text-[11px] font-data text-[#bbcabf]">
                {match.channels[0] || 'Ao Vivo'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentStreamServer(currentStreamServer.includes('1') ? 'Servidor 2 • 1080p 60fps' : 'Servidor 1 • 1080p 60fps')}
                className="text-[10px] font-display font-bold text-[#bbcabf] hover:text-white bg-[#272a32] px-2 py-1 rounded transition-colors"
              >
                Trocar Servidor
              </button>
              <button className="text-white hover:text-[#4edea3] transition-colors">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* WhatsApp Transmission CTA */}
        <div className="p-4 bg-[#10131a] border-b border-[#272a32]">
          <a
            href={getWhatsAppLink(`${match.homeTeam.name} x ${match.awayTeam.name}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#10b981] hover:bg-[#4edea3] text-[#003824] py-3.5 px-4 rounded-xl font-display font-black text-sm uppercase flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98]"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Assistir Agora</span>
          </a>
        </div>

        {/* Tabs: Stats, Timeline, Lineups */}
        <div className="flex border-b border-[#272a32] bg-[#191b23]">
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 py-3 text-xs font-display font-bold uppercase transition-all ${
              activeTab === 'stats'
                ? 'text-[#4edea3] border-b-2 border-[#4edea3] bg-[#272a32]/50'
                : 'text-[#bbcabf] hover:text-white'
            }`}
          >
            Estatísticas
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex-1 py-3 text-xs font-display font-bold uppercase transition-all ${
              activeTab === 'timeline'
                ? 'text-[#4edea3] border-b-2 border-[#4edea3] bg-[#272a32]/50'
                : 'text-[#bbcabf] hover:text-white'
            }`}
          >
            Lances & Gols
          </button>
          <button
            onClick={() => setActiveTab('lineups')}
            className={`flex-1 py-3 text-xs font-display font-bold uppercase transition-all ${
              activeTab === 'lineups'
                ? 'text-[#4edea3] border-b-2 border-[#4edea3] bg-[#272a32]/50'
                : 'text-[#bbcabf] hover:text-white'
            }`}
          >
            Escalações
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-5 overflow-y-auto max-h-72">
          {activeTab === 'stats' && (
            <div className="flex flex-col gap-4">
              {/* Possession */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-display font-bold text-white">
                  <span>{match.stats?.possessionHome || 55}%</span>
                  <span className="text-[#bbcabf] uppercase text-[11px]">Posse de Bola</span>
                  <span>{match.stats?.possessionAway || 45}%</span>
                </div>
                <div className="w-full bg-[#32353d] h-2 rounded-full overflow-hidden flex">
                  <div className="bg-[#4edea3] h-full" style={{ width: `${match.stats?.possessionHome || 55}%` }} />
                  <div className="bg-[#41495b] h-full" style={{ width: `${match.stats?.possessionAway || 45}%` }} />
                </div>
              </div>

              {/* xG */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-display font-bold text-white">
                  <span className="text-[#4edea3]">{match.stats?.xgHome || 1.45}</span>
                  <span className="text-[#bbcabf] uppercase text-[11px]">Gols Esperados (xG)</span>
                  <span className="text-[#4edea3]">{match.stats?.xgAway || 0.95}</span>
                </div>
                <div className="w-full bg-[#32353d] h-2 rounded-full overflow-hidden flex">
                  <div 
                    className="bg-[#4edea3] h-full" 
                    style={{ width: `${((match.stats?.xgHome || 1.45) / ((match.stats?.xgHome || 1.45) + (match.stats?.xgAway || 0.95))) * 100}%` }} 
                  />
                  <div className="bg-[#41495b] h-full flex-1" />
                </div>
              </div>

              {/* Shots, Corners, Fouls grid */}
              <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-[#272a32]">
                <div className="bg-[#0b0e15] p-2.5 rounded-xl border border-[#272a32]">
                  <span className="text-sm font-display font-bold text-white">
                    {match.stats?.shotsHome || 12} vs {match.stats?.shotsAway || 8}
                  </span>
                  <span className="block text-[10px] text-[#bbcabf] uppercase font-display mt-0.5">Finalizações</span>
                </div>
                <div className="bg-[#0b0e15] p-2.5 rounded-xl border border-[#272a32]">
                  <span className="text-sm font-display font-bold text-white">
                    {match.stats?.cornersHome || 6} vs {match.stats?.cornersAway || 4}
                  </span>
                  <span className="block text-[10px] text-[#bbcabf] uppercase font-display mt-0.5">Escanteios</span>
                </div>
                <div className="bg-[#0b0e15] p-2.5 rounded-xl border border-[#272a32]">
                  <span className="text-sm font-display font-bold text-white">
                    {match.stats?.foulsHome || 9} vs {match.stats?.foulsAway || 11}
                  </span>
                  <span className="block text-[10px] text-[#bbcabf] uppercase font-display mt-0.5">Faltas</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="flex flex-col gap-3">
              {match.events && match.events.length > 0 ? (
                match.events.map((ev) => (
                  <div 
                    key={ev.id}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border ${
                      ev.team === 'home' 
                        ? 'bg-[#0b0e15]/80 border-[#272a32]' 
                        : 'bg-[#0b0e15]/80 border-[#272a32] flex-row-reverse text-right'
                    }`}
                  >
                    <span className="w-8 h-8 rounded-lg bg-[#272a32] text-[#4edea3] font-data font-bold text-xs flex items-center justify-center shrink-0 border border-[#3c4a42]">
                      {ev.minute}'
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="font-display font-bold text-xs text-white">
                        {ev.player}
                      </span>
                      <span className="text-[11px] text-[#bbcabf]">
                        {ev.detail || (ev.type === 'goal' ? 'Gol' : 'Lance')}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-[#bbcabf]">
                  Nenhum lance chave registrado até o momento.
                </div>
              )}
            </div>
          )}

          {activeTab === 'lineups' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <span className="font-display font-bold text-xs text-[#4edea3] uppercase">
                  {match.homeTeam.name} (4-3-3)
                </span>
                <ul className="text-xs text-[#bbcabf] flex flex-col gap-1 font-data">
                  <li className="text-white font-semibold">1. Rossi (G)</li>
                  <li>2. Varela</li>
                  <li>3. Fabrício Bruno</li>
                  <li>4. Léo Pereira</li>
                  <li>6. Ayrton Lucas</li>
                  <li>5. Pulgar</li>
                  <li>8. Gerson</li>
                  <li className="text-[#4edea3] font-bold">14. Arrascaeta ⚽</li>
                  <li>7. Luiz Araújo</li>
                  <li className="text-[#4edea3] font-bold">9. Pedro ⚽</li>
                  <li>11. Everton Cebolinha</li>
                </ul>
              </div>

              <div className="flex flex-col gap-2 text-right">
                <span className="font-display font-bold text-xs text-[#4edea3] uppercase">
                  {match.awayTeam.name} (4-2-3-1)
                </span>
                <ul className="text-xs text-[#bbcabf] flex flex-col gap-1 font-data">
                  <li className="text-white font-semibold">21. Weverton (G)</li>
                  <li>2. Marcos Rocha</li>
                  <li className="text-[#f59e0b]">15. G. Gómez 🟨</li>
                  <li>26. Murilo</li>
                  <li>22. Piquerez</li>
                  <li>8. Zé Rafael</li>
                  <li>25. Richard Ríos</li>
                  <li className="text-[#4edea3] font-bold">23. R. Veiga ⚽</li>
                  <li>41. Estêvão</li>
                  <li>7. Dudu</li>
                  <li>42. Flaco López</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
