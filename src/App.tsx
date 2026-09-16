/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType, Match } from './types';
import { INITIAL_MATCHES } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { MatchesScreen } from './components/MatchesScreen';
import { LeaguesScreen } from './components/LeaguesScreen';
import { AdminScreen } from './components/AdminScreen';
import { ContactScreen } from './components/ContactScreen';
import { MatchDetailModal } from './components/MatchDetailModal';
import { VipModal } from './components/VipModal';

const STORAGE_KEY = 'futaovivo_matches_data_v4';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('inicio');
  const [matches, setMatches] = useState<Match[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge with any new initial matches by id
          const existingIds = new Set(parsed.map((m: Match) => m.id));
          const missingMatches = INITIAL_MATCHES.filter((m) => !existingIds.has(m.id));
          return [...parsed, ...missingMatches];
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_MATCHES;
  });

  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);
  const [vipModalMatch, setVipModalMatch] = useState<Match | null>(null);

  // Save to localStorage whenever matches change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(matches));
    } catch {
      // Ignore storage limit
    }
  }, [matches]);

  // Handle Match Update
  const handleUpdateMatch = (updatedMatch: Match) => {
    setMatches((prev) =>
      prev.map((m) => (m.id === updatedMatch.id ? updatedMatch : m))
    );
    if (selectedMatch?.id === updatedMatch.id) {
      setSelectedMatch(updatedMatch);
    }
  };

  // Handle Add Match
  const handleAddMatch = (newMatch: Match) => {
    setMatches((prev) => [newMatch, ...prev]);
  };

  // Handle Reset to Defaults
  const handleResetMatches = () => {
    setMatches(INITIAL_MATCHES);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  // Quick WhatsApp VIP trigger
  const handleOpenWhatsApp = (match?: Match) => {
    setVipModalMatch(match || null);
    setIsVipModalOpen(true);
  };

  const liveCount = matches.filter((m) => m.status === 'LIVE').length;

  return (
    <div className="min-h-screen bg-[#10131a] text-[#e1e2ec] flex flex-col font-sans selection:bg-[#4edea3] selection:text-[#003824]">
      {/* Top Telemetry Header */}
      <Header
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenVipModal={() => handleOpenWhatsApp()}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-16 flex flex-col items-center">
        {currentTab === 'inicio' && (
          <HomeScreen
            matches={matches}
            onSelectMatch={setSelectedMatch}
            onOpenWhatsApp={handleOpenWhatsApp}
            onTabChange={setCurrentTab}
          />
        )}

        {currentTab === 'jogos' && (
          <MatchesScreen
            matches={matches}
            onSelectMatch={setSelectedMatch}
            onOpenWhatsApp={handleOpenWhatsApp}
          />
        )}

        {currentTab === 'ligas' && <LeaguesScreen />}

        {currentTab === 'admin' && (
          <AdminScreen
            matches={matches}
            onUpdateMatch={handleUpdateMatch}
            onAddMatch={handleAddMatch}
            onResetMatches={handleResetMatches}
          />
        )}

        {currentTab === 'contato' && (
          <ContactScreen onOpenWhatsApp={() => handleOpenWhatsApp()} />
        )}
      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNav
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        liveCount={liveCount}
      />

      {/* Match Detail & Live Telemetry Stream Modal */}
      {selectedMatch && (
        <MatchDetailModal
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
          onOpenWhatsApp={(m) => {
            setSelectedMatch(null);
            handleOpenWhatsApp(m);
          }}
        />
      )}

      {/* VIP WhatsApp Access Modal */}
      <VipModal
        isOpen={isVipModalOpen}
        onClose={() => setIsVipModalOpen(false)}
        match={vipModalMatch}
      />
    </div>
  );
}
