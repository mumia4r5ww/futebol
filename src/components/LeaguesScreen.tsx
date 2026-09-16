import React, { useState } from 'react';
import { Trophy, Award, TrendingUp } from 'lucide-react';
import { STANDINGS_BRASILEIRAO, TOP_SCORERS } from '../data/mockData';
import { DirectImage } from './DirectImage';

export const LeaguesScreen: React.FC = () => {
  const [activeLeague, setActiveLeague] = useState<string>('brasileirao');

  const leaguesList = [
    { id: 'brasileirao', name: 'Brasileirão Série A', badge: '🇧🇷' },
    { id: 'champions', name: 'Champions League', badge: '⭐' },
    { id: 'libertadores', name: 'Libertadores', badge: '🏆' },
    { id: 'premier', name: 'Premier League', badge: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { id: 'laliga', name: 'La Liga', badge: '🇪🇸' }
  ];

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-3 sm:px-4 py-3 pb-24 gap-4">
      {/* Title */}
      <div className="flex flex-col gap-1">
        <h1 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
          Ligas & Classificação
        </h1>
        <p className="text-xs text-[#bbcabf]">
          Tabela atualizada rodada a rodada, zonas de classificação e artilharia dos principais torneios.
        </p>
      </div>

      {/* League Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 no-scrollbar">
        {leaguesList.map((league) => {
          const isActive = activeLeague === league.id;
          return (
            <button
              key={league.id}
              onClick={() => setActiveLeague(league.id)}
              className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl font-display text-xs font-bold transition-all ${
                isActive
                  ? 'bg-[#4edea3] text-[#003824] shadow-[0_0_15px_rgba(78,222,163,0.35)]'
                  : 'bg-[#191b23] text-[#bbcabf] hover:text-white border border-[#272a32]'
              }`}
            >
              <span>{league.badge}</span>
              <span>{league.name}</span>
            </button>
          );
        })}
      </div>

      {/* Standings Table Card */}
      <div className="bg-[#191b23] rounded-2xl border border-[#272a32] overflow-hidden shadow-xl">
        {/* Table Header */}
        <div className="p-4 border-b border-[#272a32] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#4edea3]" />
            <h2 className="font-display font-black text-base text-white uppercase tracking-tight">
              Tabela de Classificação
            </h2>
          </div>
          <span className="font-data text-xs text-[#bbcabf]">
            28ª Rodada
          </span>
        </div>

        {/* Legend */}
        <div className="bg-[#0b0e15]/60 px-4 py-2 border-b border-[#272a32] flex items-center gap-4 text-[11px] font-display text-[#bbcabf] overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded bg-[#10b981]" />
            <span>Fase de Grupos Libertadores (1º ao 4º)</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded bg-[#3b82f6]" />
            <span>Pré-Libertadores (5º e 6º)</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded bg-[#ef4444]" />
            <span>Rebaixamento (Z-4)</span>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#272a32] text-[11px] font-display text-[#bbcabf] uppercase bg-[#10131a]/50">
                <th className="py-2.5 pl-4 pr-2 w-12 text-center">Pos</th>
                <th className="py-2.5 px-3">Clube</th>
                <th className="py-2.5 px-2 text-center font-bold text-white">PTS</th>
                <th className="py-2.5 px-2 text-center">J</th>
                <th className="py-2.5 px-2 text-center">V</th>
                <th className="py-2.5 px-2 text-center">E</th>
                <th className="py-2.5 px-2 text-center">D</th>
                <th className="py-2.5 px-2 text-center">SG</th>
                <th className="py-2.5 pr-4 pl-2 text-center hidden sm:table-cell">Forma</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#272a32]/60 text-xs font-data">
              {STANDINGS_BRASILEIRAO.map((row) => {
                const isLibertadores = row.position <= 4;
                const isPreLibertadores = row.position === 5 || row.position === 6;
                const isRelegation = row.position >= 17;

                return (
                  <tr 
                    key={row.position} 
                    className="hover:bg-[#272a32]/40 transition-colors"
                  >
                    {/* Position */}
                    <td className="py-3 pl-4 pr-2 text-center">
                      <div className="flex items-center justify-center">
                        <span className={`w-6 h-6 rounded-md flex items-center justify-center font-display font-black text-xs ${
                          isLibertadores
                            ? 'bg-[#10b981]/20 text-[#4edea3] border border-[#4edea3]/40'
                            : isPreLibertadores
                            ? 'bg-[#3b82f6]/20 text-[#60a5fa] border border-[#60a5fa]/40'
                            : isRelegation
                            ? 'bg-[#ef4444]/20 text-[#f87171] border border-[#f87171]/40'
                            : 'text-[#bbcabf]'
                        }`}>
                          {row.position}
                        </span>
                      </div>
                    </td>

                    {/* Team */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center p-0.5 shrink-0 border border-white/80 shadow-sm">
                          <DirectImage
                            src={row.logo}
                            alt={row.team}
                            fallbackText={row.team.slice(0, 3)}
                          />
                        </div>
                        <span className="font-display font-extrabold text-white text-xs sm:text-sm">
                          {row.team}
                        </span>
                      </div>
                    </td>

                    {/* Stats */}
                    <td className="py-3 px-2 text-center font-display font-black text-sm text-[#4edea3]">
                      {row.points}
                    </td>
                    <td className="py-3 px-2 text-center text-[#bbcabf]">{row.played}</td>
                    <td className="py-3 px-2 text-center text-white">{row.won}</td>
                    <td className="py-3 px-2 text-center text-[#bbcabf]">{row.drawn}</td>
                    <td className="py-3 px-2 text-center text-[#bbcabf]">{row.lost}</td>
                    <td className="py-3 px-2 text-center text-white font-semibold">{row.goalDiff > 0 ? `+${row.goalDiff}` : row.goalDiff}</td>

                    {/* Recent Form */}
                    <td className="py-3 pr-4 pl-2 text-center hidden sm:table-cell">
                      <div className="flex items-center justify-center gap-1">
                        {row.form.map((res, i) => (
                          <span
                            key={i}
                            className={`w-4 h-4 rounded text-[9px] font-display font-bold flex items-center justify-center text-white ${
                              res === 'W' ? 'bg-[#10b981]' : res === 'D' ? 'bg-[#6b7280]' : 'bg-[#ef4444]'
                            }`}
                          >
                            {res === 'W' ? 'V' : res === 'D' ? 'E' : 'D'}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Scorers (Artilharia) */}
      <div className="bg-[#191b23] rounded-2xl border border-[#272a32] p-4 sm:p-5 flex flex-col gap-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#4edea3]" />
            <h3 className="font-display font-black text-base text-white uppercase tracking-tight">
              Artilharia do Campeonato
            </h3>
          </div>
          <span className="font-display text-xs text-[#4edea3] font-bold">
            Gols & Assistências
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TOP_SCORERS.map((scorer) => (
            <div
              key={scorer.rank}
              className="bg-[#0b0e15]/70 rounded-xl p-3 border border-[#272a32] flex items-center justify-between gap-3 hover:border-[#3c4a42] transition-all"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-6 h-6 rounded-md bg-[#272a32] text-[#4edea3] font-display font-black text-xs flex items-center justify-center shrink-0">
                  {scorer.rank}º
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#272a32] p-1 flex items-center justify-center shrink-0 border border-[#3c4a42]/50">
                  <DirectImage
                    src={scorer.teamLogo}
                    alt={scorer.team}
                    fallbackText={scorer.team.slice(0, 3)}
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-display font-extrabold text-sm text-white truncate">
                    {scorer.name}
                  </span>
                  <span className="text-[11px] text-[#bbcabf] truncate">
                    {scorer.team} • {scorer.matches} jogos
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0">
                <span className="font-display font-black text-base text-[#4edea3]">
                  {scorer.goals} <span className="text-[10px] uppercase text-[#bbcabf] font-normal">gols</span>
                </span>
                <span className="text-[10px] text-[#bbcabf] font-data">
                  {scorer.assists} assist.
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
