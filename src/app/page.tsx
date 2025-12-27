'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { RepoTable, Repo, SortConfig } from '@/components/RepoTable';
import { FilterButtons, TimeFilter } from '@/components/FilterButtons';
import { TrendingUp, Eye, Clock, GitFork, Star } from 'lucide-react';

// Calculate days since creation (minimum 1 to avoid division by zero)
function getDaysSinceCreation(dateStr: string): number {
  if (!dateStr) return 1;
  const created = new Date(dateStr);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - created.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(diffDays, 1);
}

export default function Dashboard() {
  const [filter, setFilter] = useState<TimeFilter>('30d');
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'followers', direction: 'desc' });

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const response = await fetch(`/api/data?filter=${filter}`);
        const data = await response.json();
        setRepos(data);
        setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      } catch (error) {
        console.error('Failed to load repo data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [filter]);

  const sortedRepos = useMemo(() => {
    if (!repos.length) return [];
    
    // Add computed per-day metrics
    const reposWithMetrics = repos.map(repo => {
      const days = getDaysSinceCreation(repo.created_at);
      return {
        ...repo,
        watchersPerDay: repo.followers / days,
        forksPerDay: repo.forks / days,
        starsPerDay: repo.stars / days,
      };
    });
    
    return reposWithMetrics.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      const aStr = String(aVal || '');
      const bStr = String(bVal || '');
      return sortConfig.direction === 'asc' 
        ? aStr.localeCompare(bStr) 
        : bStr.localeCompare(aStr);
    });
  }, [repos, sortConfig]);

  const stats = useMemo(() => {
    if (!repos.length) return { totalWatchers: 0, totalStars: 0, totalForks: 0 };
    const totalWatchers = repos.reduce((acc, r) => acc + r.followers, 0);
    const totalStars = repos.reduce((acc, r) => acc + r.stars, 0);
    const totalForks = repos.reduce((acc, r) => acc + r.forks, 0);
    return {
      totalWatchers,
      totalStars,
      totalForks,
    };
  }, [repos]);

  const handleSort = (key: keyof Repo) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Ambient glow effect */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ background: 'var(--gradient-glow)' }}
        aria-hidden="true"
      />
      
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero Header - Left aligned for faster scanning */}
        <header className="mb-16" style={{ fontFamily: 'var(--font-inter)' }}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            <span className="gradient-text">Trend Pulse</span>
          </h1>
          
          <p className="text-[17px] sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Discover trending GitHub repositories ranked by{' '}
            <span className="text-[var(--text-primary)] font-medium">true watcher counts</span>
            —real engagement metrics, not just stars.
          </p>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <StatCard
            icon={<Eye className="w-5 h-5" />}
            label="Total Watchers"
            value={stats.totalWatchers.toLocaleString()}
            color="var(--accent-primary)"
          />
          <StatCard
            icon={<GitFork className="w-5 h-5" />}
            label="Total Forks"
            value={stats.totalForks.toLocaleString()}
            color="var(--accent-purple)"
          />
          <StatCard
            icon={<Star className="w-5 h-5" />}
            label="Total Stars"
            value={stats.totalStars.toLocaleString()}
            color="var(--accent-blue)"
          />
        </section>

        {/* Controls */}
        <div 
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          <div>
            <h2 className="text-[13px] font-semibold text-[var(--text-secondary)] mb-3 tracking-wide uppercase">
              Repos Created In
            </h2>
            <FilterButtons activeFilter={filter} onFilterChange={setFilter} />
          </div>
          
          {lastUpdated && (
            <div className="flex items-center gap-2 text-[14px] text-[var(--text-tertiary)]">
              <Clock className="w-4 h-4" />
              <span>Updated {lastUpdated}</span>
            </div>
          )}
        </div>

        {/* Table */}
        <section className="rounded-xl overflow-hidden border border-[var(--border-default)] bg-[var(--bg-card)]">
          <div 
            className="px-6 py-4 flex items-center justify-between border-b border-[var(--border-subtle)]"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            <h3 className="text-[15px] font-semibold text-[var(--text-primary)]">
              Top {repos.length} Repositories
            </h3>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium rounded-full bg-[var(--bg-elevated)] border border-[var(--border-default)] text-[var(--text-secondary)]">
              <TrendingUp className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              Live Repository Analytics
            </div>
          </div>
          <RepoTable 
            repos={sortedRepos} 
            loading={loading} 
            sortConfig={sortConfig}
            onSort={handleSort}
          />
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-[var(--border-subtle)] text-center" style={{ fontFamily: 'var(--font-inter)' }}>
          <p className="text-sm text-[var(--text-secondary)]">
            Data refreshed every 6 hours via Deep Fetch
          </p>
          <p className="text-xs text-[var(--text-tertiary)] mt-2">
            © 2025 Trend Pulse • GitHub Search API + Individual Repo Lookups
          </p>
        </footer>
      </main>
    </div>
  );
}

function StatCard({ 
  icon, 
  label, 
  value, 
  color 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  color: string;
}) {
  return (
    <div className="glass-card p-6 animate-fade-in-up">
      <div className="flex items-center gap-4">
        <div 
          className="flex items-center justify-center w-10 h-10 rounded-lg"
          style={{ background: `${color}20`, color }}
        >
          {icon}
        </div>
        <div>
          <p 
            className="text-[13px] font-medium text-[var(--text-secondary)] mb-1"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {label}
          </p>
          <p 
            className="text-2xl font-bold tabular-nums text-[var(--text-primary)]"
            style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
