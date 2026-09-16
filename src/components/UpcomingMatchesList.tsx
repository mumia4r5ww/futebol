import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Tv, 
  Clock,
  Play
} from 'lucide-react';
import { Match } from '../types';
import { UPCOMING_BRASILEIRAO_MATCHES, UPCOMING_LIBERTADORES_MATCHES } from '../data/mockData';
import { DirectImage } from './DirectImage';
import { getWhatsAppLink } from '../utils/whatsapp';

interface UpcomingMatchesListProps {
  onSelectMatch: (match: Match) => void;
  onOpenWhatsApp: (match: Match) => void;
}

export const UpcomingMatchesList: React.FC<UpcomingMatchesListProps> = ({
  onSelectMatch
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'brasileirao' | 'libertadores'>('all');
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>('all');

  const allUpcoming = [
    ...UPCOMING_LIBERTADORES_MATCHES,
    ...UPCOMING_BRASILEIRAO_MATCHES
  ];

  const filteredMatches = allUpcoming.filter((match) => {
    if (selectedCategory === 'brasileirao' && match.leagueCategory !== 'brasileirao') return false;
    if (selectedCategory === 'libertadores' && match.leagueCategory !== 'libertadores') return false;
    
    if (selectedDateFilter !== 'all') {
      if (!match.dateFormatted?.includes(selectedDateFilter)) return false;
    }
    return true;
  });

  return (
    <section className="flex flex-col gap-3.5 w-full">
      {/* Clean Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#191b23] p-4 rounded-xl border border-[#272a32]">
        <div className="flex items-center gap-2.5">
          <Calendar className="w-5 h-5 text-[#4edea3]" />
          <div>
            <h2 className="font-display font-black text-base sm:text-lg text-white uppercase tracking-tight">
              Próximos Jogos
            </h2>
          </div>
        </div>

        {/* Competition Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-lg text-xs font-display font-bold uppercase transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#4edea3] text-[#003824]'
                : 'bg-[#0b0e15] text-[#bbcabf] hover:text-white border border-[#272a32]'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setSelectedCategory('brasileirao')}
            className={`px-3 py-1 rounded-lg text-xs font-display font-bold uppercase transition-colors ${
              selectedCategory === 'brasileirao'
                ? 'bg-[#4edea3] text-[#003824]'
                : 'bg-[#0b0e15] text-[#bbcabf] hover:text-white border border-[#272a32]'
            }`}
          >
            Brasileirão
          </button>
          <button
            onClick={() => setSelectedCategory('libertadores')}
            className={`px-3 py-1 rounded-lg text-xs font-display font-bold uppercase transition-colors ${
              selectedCategory === 'libertadores'
                ? 'bg-[#4edea3] text-[#003824]'
                : 'bg-[#0b0e15] text-[#bbcabf] hover:text-white border border-[#272a32]'
            }`}
          >
            Libertadores
          </button>
        </div>
      </div>

      {/* Date Quick Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        {[
          { label: 'Todas as Datas', value: 'all' },
          { label: '16/09', value: '16/09' },
          { label: '17/09', value: '17/09' },
          { label: '19/09', value: '19/09' },
          { label: '20/09', value: '20/09' },
        ].map((pill) => (
          <button
            key={pill.value}
            onClick={() => setSelectedDateFilter(pill.value)}
            className={`px-2.5 py-1 rounded-md text-xs font-display font-bold whitespace-nowrap transition-colors ${
              selectedDateFilter === pill.value
                ? 'bg-[#4edea3] text-[#003824]'
                : 'bg-[#191b23] text-[#bbcabf] hover:text-white border border-[#272a32]'
            }`}
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredMatches.map((match) => {
          const isLibertadores = match.leagueCategory === 'libertadores';

          return (
            <div
              key={match.id}
              onClick={() => onSelectMatch(match)}
              className="bg-[#191b23] hover:bg-[#1e222b] border border-[#272a32] hover:border-[#4edea3]/40 rounded-xl p-3.5 transition-colors cursor-pointer flex flex-col justify-between gap-3 shadow-sm"
            >
              {/* Top Row: League & Date */}
              <div className="flex items-center justify-between text-xs text-[#bbcabf] border-b border-[#272a32] pb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`text-[10px] font-display font-bold uppercase px-2 py-0.5 rounded ${
                      isLibertadores
                        ? 'bg-[#e31b23]/15 text-[#ff716a]'
                        : 'bg-[#10b981]/15 text-[#4edea3]'
                    }`}
                  >
                    {isLibertadores ? 'Libertadores' : 'Brasileirão'}
                  </span>
                  <span className="font-data font-semibold text-white truncate">
                    {match.dateFormatted || match.time}
                  </span>
                </div>

                {match.stadium && (
                  <div className="flex items-center gap-1 text-[11px] text-[#bbcabf] truncate">
                    <MapPin className="w-3 h-3 text-[#4edea3] shrink-0" />
                    <span className="truncate max-w-[120px] sm:max-w-[150px]">{match.stadium}</span>
                  </div>
                )}
              </div>

              {/* Teams Row */}
              <div className="flex items-center justify-between py-1">
                {/* Home Team */}
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-white p-1 flex items-center justify-center border border-white/80 shadow-sm shrink-0">
                    <DirectImage src={match.homeTeam.logo} alt={match.homeTeam.name} />
                  </div>
                  <span className="font-display font-bold text-xs sm:text-sm text-white truncate">
                    {match.homeTeam.name}
                  </span>
                </div>

                {/* VS */}
                <span className="font-display font-bold text-xs text-[#bbcabf] px-2 shrink-0">
                  x
                </span>

                {/* Away Team */}
                <div className="flex items-center gap-2 flex-1 min-w-0 justify-end text-right">
                  <span className="font-display font-bold text-xs sm:text-sm text-white truncate">
                    {match.awayTeam.name}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-white p-1 flex items-center justify-center border border-white/80 shadow-sm shrink-0">
                    <DirectImage src={match.awayTeam.logo} alt={match.awayTeam.name} />
                  </div>
                </div>
              </div>

              {/* Channels & Assistir Agora CTA */}
              <div className="flex items-center justify-between pt-2 border-t border-[#272a32] gap-2">
                <div className="flex items-center gap-1 text-[11px] text-[#bbcabf] truncate">
                  <Tv className="w-3.5 h-3.5 text-[#4edea3] shrink-0" />
                  <span className="truncate max-w-[130px]">{match.channels[0] || 'Ao Vivo'}</span>
                </div>

                <a
                  href={getWhatsAppLink(`${match.homeTeam.name} x ${match.awayTeam.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="bg-[#10b981] hover:bg-[#4edea3] text-[#003824] px-3 py-1.5 rounded-lg text-xs font-display font-black uppercase transition-all shrink-0 active:scale-95"
                >
                  Assistir Agora
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
