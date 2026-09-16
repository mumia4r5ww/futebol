import React, { useState } from 'react';
import { 
  Play, 
  Calendar, 
  Tv, 
  Radio
} from 'lucide-react';
import { Match, TabType } from '../types';
import { DirectImage } from './DirectImage';
import { UpcomingMatchesList } from './UpcomingMatchesList';
import { getWhatsAppLink, WHATSAPP_DISPLAY_NUMBER } from '../utils/whatsapp';

interface HomeScreenProps {
  matches: Match[];
  onSelectMatch: (match: Match) => void;
  onOpenWhatsApp: (match?: Match) => void;
  onTabChange: (tab: TabType) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  matches,
  onSelectMatch,
  onOpenWhatsApp
}) => {
  const [selectedLeague, setSelectedLeague] = useState<string>('all');

  const superMatch = matches.find((m) => m.isSuperGame) || matches[0];
  const liveMatches = matches.filter((m) => m.status === 'LIVE' && m.id !== superMatch?.id);
  
  const upcomingMatches = matches.filter((m) => {
    if (m.status === 'LIVE' || m.id === superMatch?.id) return false;
    if (selectedLeague === 'all') return true;
    return m.leagueCategory === selectedLeague;
  });

  const leagues = [
    { id: 'all', name: 'Todos' },
    { id: 'brasileirao', name: 'Brasileirão' },
    { id: 'libertadores', name: 'Libertadores' },
    { id: 'champions', name: 'Champions League' },
    { id: 'premier', name: 'Premier League' }
  ];

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Clean Top Banner */}
      <a 
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-[#10b981] hover:bg-[#4edea3] text-[#003824] px-4 py-2.5 flex items-center justify-between transition-colors shadow-sm"
      >
        <div className="flex items-center gap-2 max-w-4xl mx-auto w-full justify-between">
          <span className="font-display font-extrabold text-xs sm:text-sm uppercase tracking-wide truncate">
            Transmissões no WhatsApp • {WHATSAPP_DISPLAY_NUMBER}
          </span>
          <span className="shrink-0 bg-[#003824] text-[#4edea3] px-3 py-1 rounded-lg font-display text-xs font-black uppercase tracking-wider">
            Assistir Agora
          </span>
        </div>
      </a>

      <div className="max-w-xl mx-auto w-full px-3 sm:px-4 py-3 sm:py-4 flex flex-col gap-4">
        
        {/* SUPER JOGO EM DESTAQUE (Hero Card - Mobile-First & High Impact) */}
        {superMatch && (
          <section className="w-full" id="super-match-card">
            <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#191b23] border border-[#272a32] shadow-2xl">
              {/* Background Glow */}
              <div 
                className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-screen"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCSD6kX0UVyzJxvivb-FB4J_LeX9ZGeFtxb7I7Hk4tixL7H5_LOCsMbZQA53gT0m2jFIcMq0ACe9puee-CM0B9iH7JC_TBjmgbmEGQ-ZBR8XRC3ZjrTHanbrGYLYrAOi3sR3bjOxwJl2t5kr7-dtovsvlpYbLZEXRyBNx7E6tVH0Qdo2zOLkDG10hMe1qcmce-dn0oIdnNGiGmOayZbmrVvYBgX954n4iGKX9hn3XUoZLyitqWm193_jw')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0b0e15]/85 via-[#191b23]/95 to-[#191b23]" />

              <div className="relative z-10 p-4 sm:p-5 flex flex-col gap-4">
                {/* Header info / League pill */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10b981] text-[#003824] text-[11px] font-display font-black uppercase tracking-wider shrink-0 shadow-sm">
                      <Radio className="w-3.5 h-3.5 animate-pulse" />
                      HOJE • {superMatch.time || '21:30'}
                    </span>
                    <span className="text-xs font-display font-extrabold text-[#4edea3] uppercase tracking-wide truncate">
                      {superMatch.league}
                    </span>
                  </div>

                  <span className="text-[11px] font-data font-bold text-[#bbcabf] bg-[#0b0e15] px-2.5 py-1 rounded-full border border-[#272a32] shrink-0 truncate max-w-[150px]">
                    {superMatch.round || 'Quartas de Final'}
                  </span>
                </div>

                {/* Scoreboard / Timeboard with Highlighted Badges and Prominent Team Names */}
                <div className="flex items-start justify-between py-2 gap-2">
                  {/* Home Team (Corinthians) */}
                  <div className="flex flex-col items-center flex-1 min-w-0">
                    {/* Glowing High-Contrast Badge Container */}
                    <div className="relative group">
                      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[#10b981] via-white to-[#4edea3] opacity-80 blur-sm group-hover:opacity-100 transition duration-300" />
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white p-2.5 sm:p-3 flex items-center justify-center border-2 border-white shadow-[0_8px_20px_rgba(0,0,0,0.6),0_0_20px_rgba(78,222,163,0.35)]">
                        <DirectImage
                          src={superMatch.homeTeam.logo}
                          alt={superMatch.homeTeam.name}
                          fallbackText={superMatch.homeTeam.shortName}
                          className="w-full h-full object-contain filter drop-shadow-md"
                        />
                      </div>
                    </div>

                    {/* Team Name in Absolute Evidence */}
                    <div className="flex flex-col items-center gap-1 mt-2.5 text-center w-full px-0.5">
                      <span className="font-display font-black text-base sm:text-lg text-white uppercase tracking-tight leading-tight line-clamp-2 text-center drop-shadow-md">
                        {superMatch.homeTeam.name}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#272a32] text-[#4edea3] text-[9px] font-display font-extrabold uppercase tracking-wider border border-[#3c4a42]">
                        MANDANTE
                      </span>
                    </div>
                  </div>

                  {/* Center Match Telemetry */}
                  <div className="flex flex-col items-center px-1 sm:px-3 pt-2 shrink-0">
                    {superMatch.status === 'LIVE' ? (
                      <div className="flex items-center gap-2 font-display text-4xl sm:text-5xl font-black text-white">
                        <span>{superMatch.homeScore}</span>
                        <span className="text-[#4edea3]">:</span>
                        <span>{superMatch.awayScore}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <span className="font-display text-3xl sm:text-4xl font-black text-white tracking-wider">
                          {superMatch.time || '21:30'}
                        </span>
                        <span className="font-display text-[11px] text-[#4edea3] font-black uppercase tracking-wider mt-0.5">
                          Quarta (16/09)
                        </span>
                      </div>
                    )}

                    <div className="mt-2 text-center flex flex-col items-center gap-1">
                      <span className="text-[10px] sm:text-[11px] font-semibold text-[#bbcabf] truncate max-w-[130px] sm:max-w-[160px]">
                        {superMatch.stadium}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] font-data text-[#bbcabf] bg-[#0b0e15] px-2 py-0.5 rounded-md border border-[#272a32]">
                        <Tv className="w-3 h-3 text-[#4edea3] shrink-0" />
                        <span className="truncate max-w-[120px]">{superMatch.channels[0] || 'Ao Vivo'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Away Team (Estudiantes de La Plata) */}
                  <div className="flex flex-col items-center flex-1 min-w-0">
                    {/* Glowing High-Contrast Badge Container */}
                    <div className="relative group">
                      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[#e31b23] via-white to-[#4edea3] opacity-80 blur-sm group-hover:opacity-100 transition duration-300" />
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white p-2.5 sm:p-3 flex items-center justify-center border-2 border-white shadow-[0_8px_20px_rgba(0,0,0,0.6),0_0_20px_rgba(78,222,163,0.35)]">
                        <DirectImage
                          src={superMatch.awayTeam.logo}
                          alt={superMatch.awayTeam.name}
                          fallbackText={superMatch.awayTeam.shortName}
                          className="w-full h-full object-contain filter drop-shadow-md"
                        />
                      </div>
                    </div>

                    {/* Team Name in Absolute Evidence */}
                    <div className="flex flex-col items-center gap-1 mt-2.5 text-center w-full px-0.5">
                      <span className="font-display font-black text-base sm:text-lg text-white uppercase tracking-tight leading-tight line-clamp-2 text-center drop-shadow-md">
                        {superMatch.awayTeam.name}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#272a32] text-[#f87171] text-[9px] font-display font-extrabold uppercase tracking-wider border border-[#f87171]/30">
                        VISITANTE
                      </span>
                    </div>
                  </div>
                </div>

                {/* Big Direct Mobile CTA Button */}
                <a
                  href={getWhatsAppLink(`${superMatch.homeTeam.name} x ${superMatch.awayTeam.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#10b981] hover:bg-[#4edea3] text-[#003824] font-display font-black text-sm uppercase py-4 px-4 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(16,185,129,0.4)] transition-all active:scale-[0.98]"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Assistir Agora</span>
                </a>
              </div>
            </div>
          </section>
        )}

        {/* JOGOS AO VIVO */}
        {liveMatches.length > 0 && (
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-black text-base text-white uppercase">
                Ao Vivo Agora
              </h3>
              <span className="text-xs text-[#4edea3] font-data font-bold">
                {liveMatches.length} Partidas
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {liveMatches.map((match) => (
                <div
                  key={match.id}
                  className="bg-[#191b23] border border-[#272a32] rounded-xl p-3.5 flex flex-col justify-between gap-3 shadow-md hover:border-[#4edea3]/40 transition-colors"
                >
                  <div className="flex items-center justify-between text-[11px] text-[#bbcabf]">
                    <span className="font-display font-bold uppercase truncate max-w-[140px]">
                      {match.league}
                    </span>
                    <span className="text-[#4edea3] font-data font-bold">
                      {match.minute}'
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 border border-white/80 shadow-sm">
                          <DirectImage src={match.homeTeam.logo} alt={match.homeTeam.name} />
                        </div>
                        <span className="font-display font-bold text-xs text-white truncate">
                          {match.homeTeam.name}
                        </span>
                      </div>
                      <span className="font-display font-bold text-base text-[#4edea3]">
                        {match.homeScore}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 border border-white/80 shadow-sm">
                          <DirectImage src={match.awayTeam.logo} alt={match.awayTeam.name} />
                        </div>
                        <span className="font-display font-bold text-xs text-white truncate">
                          {match.awayTeam.name}
                        </span>
                      </div>
                      <span className="font-display font-bold text-base text-white">
                        {match.awayScore}
                      </span>
                    </div>
                  </div>

                  <a
                    href={getWhatsAppLink(`${match.homeTeam.name} x ${match.awayTeam.name}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#272a32] hover:bg-[#10b981] hover:text-[#003824] text-[#4edea3] py-2 rounded-lg font-display font-bold text-xs uppercase flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Assistir Agora</span>
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* COMPETIÇÕES */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {leagues.map((league) => {
              const isActive = selectedLeague === league.id;
              return (
                <button
                  key={league.id}
                  onClick={() => setSelectedLeague(league.id)}
                  className={`px-3 py-1.5 rounded-lg font-display text-xs font-bold whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-[#4edea3] text-[#003824]'
                      : 'bg-[#191b23] text-[#bbcabf] hover:text-white border border-[#272a32]'
                  }`}
                >
                  {league.name}
                </button>
              );
            })}
          </div>
        </section>

        {/* JOGOS DE HOJE */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-black text-base text-white uppercase">
              Jogos de Hoje
            </h3>
            <span className="text-xs text-[#bbcabf] font-data">
              Brasília
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {upcomingMatches.length === 0 ? (
              <div className="p-6 text-center bg-[#191b23] rounded-xl border border-[#272a32] text-xs text-[#bbcabf]">
                Nenhum jogo nesta categoria hoje.
              </div>
            ) : (
              upcomingMatches.map((match) => (
                <div
                  key={match.id}
                  className="bg-[#191b23] border border-[#272a32] rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm hover:border-[#3c4a42] transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-xs font-data font-bold text-[#4edea3] bg-[#0b0e15] px-2 py-1 rounded border border-[#272a32] shrink-0">
                      {match.time || '19:00'}
                    </span>

                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 border border-white/80 shadow-sm">
                        <DirectImage src={match.homeTeam.logo} alt={match.homeTeam.name} />
                      </div>
                      <span className="font-display font-bold text-xs sm:text-sm text-white truncate">
                        {match.homeTeam.name}
                      </span>
                      <span className="text-xs text-[#bbcabf] font-bold px-1">x</span>
                      <span className="font-display font-bold text-xs sm:text-sm text-white truncate">
                        {match.awayTeam.name}
                      </span>
                      <div className="w-7 h-7 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 border border-white/80 shadow-sm">
                        <DirectImage src={match.awayTeam.logo} alt={match.awayTeam.name} />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#272a32]">
                    <div className="flex items-center gap-1 text-[11px] text-[#bbcabf]">
                      <Tv className="w-3.5 h-3.5 text-[#4edea3] shrink-0" />
                      <span className="truncate max-w-[120px]">{match.channels[0] || 'Ao Vivo'}</span>
                    </div>

                    <a
                      href={getWhatsAppLink(`${match.homeTeam.name} x ${match.awayTeam.name}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#10b981] hover:bg-[#4edea3] text-[#003824] px-3.5 py-1.5 rounded-lg font-display text-xs uppercase font-black transition-all shrink-0 active:scale-95"
                    >
                      Assistir Agora
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* PRÓXIMOS JOGOS (BRASILEIRÃO & LIBERTADORES) */}
        <UpcomingMatchesList 
          onSelectMatch={onSelectMatch} 
          onOpenWhatsApp={onOpenWhatsApp} 
        />

        {/* CARD WHATSAPP DIRETO - Clean & Direto */}
        <section className="w-full">
          <div className="rounded-2xl bg-[#191b23] p-5 border border-[#272a32] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
            <div className="flex flex-col gap-1">
              <h4 className="font-display font-black text-base text-white uppercase">
                Transmissões no WhatsApp
              </h4>
              <p className="text-xs text-[#bbcabf]">
                Atendimento rápido pelo número {WHATSAPP_DISPLAY_NUMBER}.
              </p>
            </div>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#10b981] hover:bg-[#4edea3] text-[#003824] font-display font-black text-xs uppercase px-5 py-3 rounded-xl flex items-center justify-center gap-2 shrink-0 transition-all active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Assistir Agora</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};
