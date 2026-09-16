export type MatchStatus = 'LIVE' | 'SCHEDULED' | 'FINISHED' | 'PRE_MATCH';

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  badgeAlt?: string;
  primaryColor?: string;
}

export interface MatchStats {
  possessionHome: number;
  possessionAway: number;
  xgHome: number;
  xgAway: number;
  shotsHome?: number;
  shotsAway?: number;
  shotsOnTargetHome?: number;
  shotsOnTargetAway?: number;
  cornersHome?: number;
  cornersAway?: number;
  foulsHome?: number;
  foulsAway?: number;
}

export interface MatchEvent {
  id: string;
  minute: number;
  type: 'goal' | 'yellow_card' | 'red_card' | 'sub';
  player: string;
  team: 'home' | 'away';
  detail?: string;
}

export interface Match {
  id: string;
  league: string;
  leagueCategory: 'brasileirao' | 'champions' | 'libertadores' | 'premier' | 'laliga' | 'seriea' | 'outros';
  round?: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  status: MatchStatus;
  statusText?: string;
  time?: string;
  minute?: number;
  half?: string;
  channels: string[];
  broadcastLink: string;
  whatsappLink?: string;
  eventsSummaryHome?: string;
  eventsSummaryAway?: string;
  stats?: MatchStats;
  events?: MatchEvent[];
  isSuperGame?: boolean;
  date?: string; // 'hoje', 'ontem', 'amanha'
  dateFormatted?: string; // e.g. '16/09 às 19:30'
  stadium?: string; // e.g. 'Nilton Santos'
  location?: string; // e.g. 'Quito, Equador'
}

export interface LeagueStanding {
  position: number;
  team: string;
  logo: string;
  points: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  form: ('W' | 'D' | 'L')[];
}

export interface TopScorer {
  rank: number;
  name: string;
  team: string;
  teamLogo: string;
  goals: number;
  assists: number;
  matches: number;
}

export type TabType = 'inicio' | 'jogos' | 'ligas' | 'admin' | 'contato';
