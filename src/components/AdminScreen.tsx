import React, { useState } from 'react';
import { 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Check, 
  Copy, 
  ExternalLink, 
  Plus, 
  RefreshCw, 
  Save, 
  Code2, 
  Sliders, 
  Tv, 
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { Match, Team } from '../types';
import { DirectImage } from './DirectImage';

interface AdminScreenProps {
  matches: Match[];
  onUpdateMatch: (updatedMatch: Match) => void;
  onAddMatch: (newMatch: Match) => void;
  onResetMatches: () => void;
}

export const AdminScreen: React.FC<AdminScreenProps> = ({
  matches,
  onUpdateMatch,
  onAddMatch,
  onResetMatches
}) => {
  const [selectedMatchId, setSelectedMatchId] = useState<string>(matches[0]?.id || '');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [saveNotification, setSaveNotification] = useState<string | null>(null);

  // Active match being edited
  const activeMatch = matches.find((m) => m.id === selectedMatchId) || matches[0];

  // Match edit state
  const [homeTeamName, setHomeTeamName] = useState(activeMatch?.homeTeam.name || '');
  const [homeTeamLogo, setHomeTeamLogo] = useState(activeMatch?.homeTeam.logo || '');
  const [awayTeamName, setAwayTeamName] = useState(activeMatch?.awayTeam.name || '');
  const [awayTeamLogo, setAwayTeamLogo] = useState(activeMatch?.awayTeam.logo || '');
  const [homeScore, setHomeScore] = useState(activeMatch?.homeScore || 0);
  const [awayScore, setAwayScore] = useState(activeMatch?.awayScore || 0);
  const [minute, setMinute] = useState(activeMatch?.minute || 75);
  const [status, setStatus] = useState<Match['status']>(activeMatch?.status || 'LIVE');
  const [channels, setChannels] = useState(activeMatch?.channels.join(', ') || '');
  const [whatsappLink, setWhatsappLink] = useState(activeMatch?.whatsappLink || '');
  const [broadcastLink, setBroadcastLink] = useState(activeMatch?.broadcastLink || '');

  // When switching selected match, update local state
  const handleSelectMatch = (match: Match) => {
    setSelectedMatchId(match.id);
    setHomeTeamName(match.homeTeam.name);
    setHomeTeamLogo(match.homeTeam.logo);
    setAwayTeamName(match.awayTeam.name);
    setAwayTeamLogo(match.awayTeam.logo);
    setHomeScore(match.homeScore);
    setAwayScore(match.awayScore);
    setMinute(match.minute || 0);
    setStatus(match.status);
    setChannels(match.channels.join(', '));
    setWhatsappLink(match.whatsappLink || '');
    setBroadcastLink(match.broadcastLink || '');
  };

  const handleSaveMatch = () => {
    if (!activeMatch) return;

    const updated: Match = {
      ...activeMatch,
      homeScore: Number(homeScore),
      awayScore: Number(awayScore),
      minute: Number(minute),
      status: status,
      channels: channels.split(',').map((c) => c.trim()).filter(Boolean),
      whatsappLink,
      broadcastLink,
      homeTeam: {
        ...activeMatch.homeTeam,
        name: homeTeamName,
        logo: homeTeamLogo
      },
      awayTeam: {
        ...activeMatch.awayTeam,
        name: awayTeamName,
        logo: awayTeamLogo
      }
    };

    onUpdateMatch(updated);
    setSaveNotification('Alterações salvas com sucesso no aplicativo!');
    setTimeout(() => setSaveNotification(null), 3500);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-3 sm:px-4 py-3 pb-24 gap-4">
      {/* Clean Header */}
      <div className="flex flex-col gap-1">
        <h1 className="font-display font-black text-xl text-white uppercase tracking-tight">
          Painel de Gerenciamento
        </h1>
        <p className="text-xs text-[#bbcabf]">
          Edite partidas, placares e links de transmissão em tempo real.
        </p>
      </div>

      {/* Notification */}
      {saveNotification && (
        <div className="bg-[#10b981] text-[#003824] px-4 py-3 rounded-xl font-display font-bold text-sm flex items-center gap-2 shadow-lg animate-fade-in">
          <Check className="w-5 h-5" />
          <span>{saveNotification}</span>
        </div>
      )}

      {/* Selector: Which Match to Manage */}
      <div className="bg-[#191b23] rounded-2xl border border-[#272a32] p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#4edea3]" />
            <h3 className="font-display font-black text-base text-white uppercase tracking-tight">
              Selecione a Partida para Editar
            </h3>
          </div>
          <button
            onClick={onResetMatches}
            className="text-xs text-[#bbcabf] hover:text-[#ff5555] flex items-center gap-1 transition-colors"
            title="Restaurar partidas originais"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restaurar Padrão</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {matches.map((m) => {
            const isSelected = m.id === selectedMatchId;
            return (
              <button
                key={m.id}
                onClick={() => handleSelectMatch(m)}
                className={`p-2.5 rounded-xl border text-left flex items-center justify-between gap-2 transition-all ${
                  isSelected
                    ? 'bg-[#272a32] border-[#4edea3] shadow-[0_0_12px_rgba(78,222,163,0.2)]'
                    : 'bg-[#0b0e15]/60 border-[#272a32] hover:border-[#3c4a42]'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <div className="w-6 h-6 rounded bg-white p-0.5 shrink-0 flex items-center justify-center border border-white/80 shadow-sm">
                    <DirectImage src={m.homeTeam.logo} alt={m.homeTeam.name} />
                  </div>
                  <span className="font-display font-bold text-xs text-white truncate">
                    {m.homeTeam.name} vs {m.awayTeam.name}
                  </span>
                </div>
                <span className={`text-[10px] font-data px-1.5 py-0.5 rounded ${
                  m.status === 'LIVE' ? 'bg-[#93000a] text-white' : 'bg-[#272a32] text-[#bbcabf]'
                }`}>
                  {m.status === 'LIVE' ? `${m.homeScore}:${m.awayScore}` : m.time || 'Breve'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Editor Form */}
      {activeMatch && (
        <div className="bg-[#191b23] rounded-2xl border border-[#272a32] p-5 flex flex-col gap-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#272a32] pb-3">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#4edea3]" />
              <h3 className="font-display font-black text-lg text-white uppercase tracking-tight">
                Editar Links Diretos e Placar
              </h3>
            </div>
            <span className="text-xs font-data text-[#bbcabf]">
              ID: {activeMatch.id}
            </span>
          </div>

          {/* Teams Direct Image Links Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Home Team */}
            <div className="bg-[#0b0e15]/80 rounded-xl p-4 border border-[#272a32] flex flex-col gap-3">
              <span className="font-display font-bold text-xs text-[#4edea3] uppercase">
                Time Mandante
              </span>

              {/* Team Name */}
              <div>
                <label className="text-[11px] font-display text-[#bbcabf] mb-1 block">Nome do Time</label>
                <input
                  type="text"
                  value={homeTeamName}
                  onChange={(e) => setHomeTeamName(e.target.value)}
                  className="w-full bg-[#191b23] border border-[#272a32] focus:border-[#4edea3] text-white px-3 py-2 rounded-lg text-xs outline-none"
                />
              </div>

              {/* Team Direct Logo URL */}
              <div>
                <label className="text-[11px] font-display text-[#bbcabf] mb-1 block">
                  Link Direto da Imagem (URL do Escudo)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={homeTeamLogo}
                    onChange={(e) => setHomeTeamLogo(e.target.value)}
                    placeholder="https://... (URL direta da imagem)"
                    className="w-full bg-[#191b23] border border-[#272a32] focus:border-[#4edea3] text-white px-3 py-2 rounded-lg text-xs outline-none font-mono"
                  />
                  <button
                    onClick={() => copyToClipboard(homeTeamLogo, 'home-logo')}
                    className="shrink-0 bg-[#272a32] hover:bg-[#32353d] text-[#4edea3] px-2.5 rounded-lg text-xs flex items-center justify-center"
                    title="Copiar Link Direto"
                  >
                    {copiedKey === 'home-logo' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Live Preview */}
              <div className="flex items-center gap-3 bg-[#191b23] p-2.5 rounded-lg border border-[#272a32]">
                <div className="w-12 h-12 rounded-lg bg-[#272a32] p-1.5 flex items-center justify-center border border-[#3c4a42]">
                  <DirectImage src={homeTeamLogo} alt={homeTeamName} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-display font-bold text-white truncate">{homeTeamName}</span>
                  <span className="text-[10px] text-[#bbcabf] truncate font-mono">{homeTeamLogo}</span>
                </div>
              </div>
            </div>

            {/* Away Team */}
            <div className="bg-[#0b0e15]/80 rounded-xl p-4 border border-[#272a32] flex flex-col gap-3">
              <span className="font-display font-bold text-xs text-[#4edea3] uppercase">
                Time Visitante
              </span>

              {/* Team Name */}
              <div>
                <label className="text-[11px] font-display text-[#bbcabf] mb-1 block">Nome do Time</label>
                <input
                  type="text"
                  value={awayTeamName}
                  onChange={(e) => setAwayTeamName(e.target.value)}
                  className="w-full bg-[#191b23] border border-[#272a32] focus:border-[#4edea3] text-white px-3 py-2 rounded-lg text-xs outline-none"
                />
              </div>

              {/* Team Direct Logo URL */}
              <div>
                <label className="text-[11px] font-display text-[#bbcabf] mb-1 block">
                  Link Direto da Imagem (URL do Escudo)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={awayTeamLogo}
                    onChange={(e) => setAwayTeamLogo(e.target.value)}
                    placeholder="https://... (URL direta da imagem)"
                    className="w-full bg-[#191b23] border border-[#272a32] focus:border-[#4edea3] text-white px-3 py-2 rounded-lg text-xs outline-none font-mono"
                  />
                  <button
                    onClick={() => copyToClipboard(awayTeamLogo, 'away-logo')}
                    className="shrink-0 bg-[#272a32] hover:bg-[#32353d] text-[#4edea3] px-2.5 rounded-lg text-xs flex items-center justify-center"
                    title="Copiar Link Direto"
                  >
                    {copiedKey === 'away-logo' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Live Preview */}
              <div className="flex items-center gap-3 bg-[#191b23] p-2.5 rounded-lg border border-[#272a32]">
                <div className="w-12 h-12 rounded-lg bg-[#272a32] p-1.5 flex items-center justify-center border border-[#3c4a42]">
                  <DirectImage src={awayTeamLogo} alt={awayTeamName} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-display font-bold text-white truncate">{awayTeamName}</span>
                  <span className="text-[10px] text-[#bbcabf] truncate font-mono">{awayTeamLogo}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scores and Telemetry */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0b0e15]/60 p-4 rounded-xl border border-[#272a32]">
            <div>
              <label className="text-[11px] font-display text-[#bbcabf] mb-1 block">Gols Mandante</label>
              <input
                type="number"
                min="0"
                value={homeScore}
                onChange={(e) => setHomeScore(Number(e.target.value))}
                className="w-full bg-[#191b23] border border-[#272a32] text-white px-3 py-2 rounded-lg text-sm font-data font-bold outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-display text-[#bbcabf] mb-1 block">Gols Visitante</label>
              <input
                type="number"
                min="0"
                value={awayScore}
                onChange={(e) => setAwayScore(Number(e.target.value))}
                className="w-full bg-[#191b23] border border-[#272a32] text-white px-3 py-2 rounded-lg text-sm font-data font-bold outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-display text-[#bbcabf] mb-1 block">Minuto do Jogo</label>
              <input
                type="number"
                min="0"
                max="120"
                value={minute}
                onChange={(e) => setMinute(Number(e.target.value))}
                className="w-full bg-[#191b23] border border-[#272a32] text-white px-3 py-2 rounded-lg text-sm font-data font-bold outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-display text-[#bbcabf] mb-1 block">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Match['status'])}
                className="w-full bg-[#191b23] border border-[#272a32] text-white px-3 py-2 rounded-lg text-xs font-display font-bold outline-none"
              >
                <option value="LIVE">AO VIVO</option>
                <option value="SCHEDULED">AGENDADO</option>
                <option value="PRE_MATCH">PRÉ-JOGO</option>
                <option value="FINISHED">FINALIZADO</option>
              </select>
            </div>
          </div>

          {/* Links Configuration */}
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-[11px] font-display text-[#bbcabf] mb-1 block flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#4edea3]" />
                <span>Link do Grupo ou Transmissão no WhatsApp</span>
              </label>
              <input
                type="url"
                value={whatsappLink}
                onChange={(e) => setWhatsappLink(e.target.value)}
                placeholder="https://chat.whatsapp.com/..."
                className="w-full bg-[#0b0e15] border border-[#272a32] focus:border-[#4edea3] text-white px-3 py-2 rounded-lg text-xs outline-none font-mono"
              />
            </div>

            <div>
              <label className="text-[11px] font-display text-[#bbcabf] mb-1 block flex items-center gap-1.5">
                <Tv className="w-3.5 h-3.5 text-[#4edea3]" />
                <span>Canais de Transmissão (separados por vírgula)</span>
              </label>
              <input
                type="text"
                value={channels}
                onChange={(e) => setChannels(e.target.value)}
                placeholder="Premiere, SporTV, ESPN"
                className="w-full bg-[#0b0e15] border border-[#272a32] focus:border-[#4edea3] text-white px-3 py-2 rounded-lg text-xs outline-none"
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveMatch}
            className="w-full bg-[#4edea3] hover:bg-[#6ffbbe] text-[#003824] py-3.5 px-4 rounded-xl font-display font-black text-sm uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(78,222,163,0.3)] transition-all active:scale-[0.98]"
          >
            <Save className="w-5 h-5" />
            <span>Salvar Alterações no Aplicativo</span>
          </button>
        </div>
      )}
    </div>
  );
};
