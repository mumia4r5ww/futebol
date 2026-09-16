import React, { useState } from 'react';
import { Search, MapPin, Tv, Play } from 'lucide-react';
import { Match } from '../types';
import { DirectImage } from './DirectImage';
import { getWhatsAppLink } from '../utils/whatsapp';

interface MatchesScreenProps {
  matches: Match[];
  onSelectMatch: (match: Match) => void;
  onOpenWhatsApp: (match: Match) => void;
}

export const MatchesScreen: React.FC<MatchesScreenProps> = ({
  matches,
  onSelectMatch
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<'ontem' | 'hoje' | 'amanha' | 'todos'>('todos');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'LIVE'>('all');

  const filteredMatches = matches.filter((match) => {
    if (selectedStatus === 'LIVE' && match.status !== 'LIVE') return false;

    if (selectedDate !== 'todos' && match.date && match.date !== selectedDate) {
      return false;
    }

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      const home = match.homeTeam.name.toLowerCase();
      const away = match.awayTeam.name.toLowerCase();
      const league = match.league.toLowerCase();
      return home.includes(term) || away.includes(term) || league.includes(term);
    }

    return true;
  });

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-3 sm:px-4 py-3 pb-24 gap-3.5">
      {/* Title */}
      <div className="flex flex-col gap-1">
        <h1 className="font-display font-black text-xl text-white uppercase tracking-tight">
          Grade de Jogos
        </h1>
      </div>

      {/* Date Navigation Pills */}
      <div className="flex items-center gap-1.5 bg-[#191b23] p-1.5 rounded-xl border border-[#272a32]">
        <button
          onClick={() => setSelectedDate('todos')}
          className={`flex-1 py-1.5 px-2 rounded-lg font-display text-xs font-bold transition-all ${
            selectedDate === 'todos'
              ? 'bg-[#4edea3] text-[#003824]'
              : 'text-[#bbcabf] hover:text-white'
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setSelectedDate('hoje')}
          className={`flex-1 py-1.5 px-2 rounded-lg font-display text-xs font-bold transition-all ${
            selectedDate === 'hoje'
              ? 'bg-[#4edea3] text-[#003824]'
              : 'text-[#bbcabf] hover:text-white'
          }`}
        >
          Hoje (Ao Vivo)
        </button>
        <button
          onClick={() => setSelectedDate('amanha')}
          className={`flex-1 py-1.5 px-2 rounded-lg font-display text-xs font-bold transition-all ${
            selectedDate === 'amanha'
              ? 'bg-[#4edea3] text-[#003824]'
              : 'text-[#bbcabf] hover:text-white'
          }`}
        >
          Amanhã
        </button>
        <button
          onClick={() => setSelectedDate('ontem')}
          className={`flex-1 py-1.5 px-2 rounded-lg font-display text-xs font-bold transition-all ${
            selectedDate === 'ontem'
              ? 'bg-[#4edea3] text-[#003824]'
              : 'text-[#bbcabf] hover:text-white'
          }`}
        >
          Ontem
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-stretch gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#86948a] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por time ou liga..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#191b23] border border-[#272a32] focus:border-[#4edea3] text-white placeholder-[#86948a] pl-9 pr-4 py-2 rounded-xl text-xs outline-none transition-colors"
          />
        </div>

        <button
          onClick={() => setSelectedStatus(selectedStatus === 'LIVE' ? 'all' : 'LIVE')}
          className={`px-3 py-2 rounded-xl text-xs font-display font-bold border transition-all ${
            selectedStatus === 'LIVE'
              ? 'bg-[#93000a] border-[#ffb4ab] text-white'
              : 'bg-[#191b23] border-[#272a32] text-[#bbcabf]'
          }`}
        >
          {selectedStatus === 'LIVE' ? 'Mostrando Ao Vivo' : 'Filtrar Ao Vivo'}
        </button>
      </div>

      {/* Match Cards List */}
      <div className="flex flex-col gap-2.5">
        {filteredMatches.length === 0 ? (
          <div className="p-8 text-center bg-[#191b23] rounded-xl border border-[#272a32] text-xs text-[#bbcabf]">
            Nenhuma partida encontrada para os filtros selecionados.
          </div>
        ) : (
          filteredMatches.map((match) => {
            const isLive = match.status === 'LIVE';

            return (
              <article
                key={match.id}
                className="bg-[#191b23] border border-[#272a32] hover:border-[#3c4a42] rounded-xl p-3 flex flex-col gap-2.5 shadow-sm transition-colors"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-display text-xs text-[#bbcabf] uppercase font-bold truncate">
                      {match.league}
                    </span>
                    {match.stadium && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#86948a] truncate">
                        <MapPin className="w-3 h-3 text-[#4edea3]" />
                        <span className="truncate max-w-[130px]">{match.stadium}</span>
                      </span>
                    )}
                  </div>

                  {isLive ? (
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#93000a] text-white border border-[#ffb4ab]/30 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] animate-pulse" />
                      <span className="font-data text-xs font-bold">
                        AO VIVO {match.minute ? `${match.minute}'` : ''}
                      </span>
                    </div>
                  ) : (
                    <span className="font-data text-xs text-[#4edea3] font-bold bg-[#0b0e15] px-2.5 py-0.5 rounded border border-[#272a32] shrink-0">
                      {match.dateFormatted || match.time || '19:00'}
                    </span>
                  )}
                </div>

                {/* Teams & Score */}
                <div 
                  className="flex items-center justify-between py-1 cursor-pointer"
                  onClick={() => onSelectMatch(match)}
                >
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-white p-1 flex items-center justify-center border border-white/80 shadow-sm shrink-0">
                      <DirectImage src={match.homeTeam.logo} alt={match.homeTeam.name} />
                    </div>
                    <span className="font-display font-bold text-sm text-white truncate">
                      {match.homeTeam.name}
                    </span>
                  </div>

                  <div className="px-3 shrink-0">
                    {isLive ? (
                      <div className="flex items-center gap-1 text-white font-display text-lg font-black">
                        <span>{match.homeScore}</span>
                        <span className="text-[#4edea3]">:</span>
                        <span>{match.awayScore}</span>
                      </div>
                    ) : (
                      <span className="font-display text-xs font-bold text-[#bbcabf]">
                        x
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-2.5 flex-1 min-w-0 text-right">
                    <span className="font-display font-bold text-sm text-white truncate">
                      {match.awayTeam.name}
                    </span>
                    <div className="w-7 h-7 rounded-lg bg-white p-1 flex items-center justify-center border border-white/80 shadow-sm shrink-0">
                      <DirectImage src={match.awayTeam.logo} alt={match.awayTeam.name} />
                    </div>
                  </div>
                </div>

                {/* Footer & Action CTA */}
                <div className="flex items-center justify-between pt-2 border-t border-[#272a32] gap-2">
                  <div className="flex items-center gap-1 text-[11px] text-[#bbcabf] truncate">
                    <Tv className="w-3.5 h-3.5 text-[#4edea3] shrink-0" />
                    <span className="truncate max-w-[140px]">{match.channels[0] || 'Ao Vivo'}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onSelectMatch(match)}
                      className="text-xs text-[#bbcabf] hover:text-white px-2 py-1 rounded bg-[#0b0e15] border border-[#272a32] font-display font-bold transition-colors"
                    >
                      Detalhes
                    </button>

                    <a
                      href={getWhatsAppLink(`${match.homeTeam.name} x ${match.awayTeam.name}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#10b981] hover:bg-[#4edea3] text-[#003824] px-3.5 py-1.5 rounded-lg font-display text-xs uppercase font-black transition-all active:scale-95 flex items-center gap-1"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Assistir Agora</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};
