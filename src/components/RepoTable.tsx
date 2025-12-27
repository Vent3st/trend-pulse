import React, { useState, useMemo } from 'react';
import { Star, GitFork, Users, ExternalLink, Calendar, ChevronUp, ChevronDown, Columns3, Columns2 } from 'lucide-react';

export interface Repo {
  name: string;
  url: string;
  followers: number;
  forks: number;
  stars: number;
  created_at: string;
  description: string;
  // Computed per-day metrics
  watchersPerDay?: number;
  forksPerDay?: number;
  starsPerDay?: number;
}

export interface SortConfig {
  key: keyof Repo;
  direction: 'asc' | 'desc';
}

interface RepoTableProps {
  repos: Repo[];
  loading: boolean;
  sortConfig: SortConfig;
  onSort: (key: keyof Repo) => void;
}

// Calculate percentile threshold for a metric
function getPercentile(values: number[], percentile: number): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.ceil((percentile / 100) * sorted.length) - 1;
  return sorted[Math.max(0, index)];
}

// Format date like "Dec 8" or "Nov 22"
function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Format pre-computed per-day value (1 decimal place)
function formatPerDayValue(value?: number): string {
  if (value === undefined) return '—';
  if (value >= 100) return Math.round(value).toLocaleString();
  return value.toFixed(1);
}

// Sortable header component
function SortableHeader({ 
  label, 
  sortKey, 
  icon, 
  sortConfig, 
  onSort,
  align = 'right',
  className = ''
}: { 
  label: string; 
  sortKey: keyof Repo; 
  icon?: React.ReactNode;
  sortConfig: SortConfig;
  onSort: (key: keyof Repo) => void;
  align?: 'left' | 'right';
  className?: string;
}) {
  const isActive = sortConfig.key === sortKey;
  
  return (
    <th 
      className={`px-4 py-4 text-${align} text-[13px] font-semibold tracking-wide cursor-pointer hover:text-[var(--text-primary)] transition-colors select-none ${isActive ? 'text-[var(--text-primary)] bg-[var(--bg-hover)]' : 'text-[var(--text-secondary)]'} ${className}`}
      onClick={() => onSort(sortKey)}
    >
      <span className={`inline-flex items-center gap-1.5 ${align === 'right' ? 'justify-end' : ''}`}>
        {icon}
        {label}
        <span className="inline-flex flex-col -space-y-1">
          <ChevronUp 
            className={`w-3 h-3 ${isActive && sortConfig.direction === 'asc' ? 'text-[var(--accent-primary)]' : 'text-[var(--text-tertiary)] opacity-50'}`} 
          />
          <ChevronDown 
            className={`w-3 h-3 ${isActive && sortConfig.direction === 'desc' ? 'text-[var(--accent-primary)]' : 'text-[var(--text-tertiary)] opacity-50'}`} 
          />
        </span>
      </span>
    </th>
  );
}

// View mode toggle component
function ViewModeToggle({ 
  expanded, 
  onToggle 
}: { 
  expanded: boolean; 
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="inline-flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-default)] transition-all"
    >
      {expanded ? (
        <>
          <Columns2 className="w-4 h-4" />
          <span>Essential</span>
        </>
      ) : (
        <>
          <Columns3 className="w-4 h-4" />
          <span>Detailed</span>
        </>
      )}
    </button>
  );
}

// Highlighted value component for top performers (watchers/day only)
function HighlightedValue({ 
  formatted, 
  isTop, 
  className = '' 
}: { 
  formatted: string; 
  isTop: boolean;
  className?: string;
}) {
  if (isTop) {
    return (
      <span 
        className={`inline-flex items-center gap-1 ${className}`}
        title="Top 5% velocity"
      >
        <span>{formatted}</span>
        <span className="text-[10px] text-[var(--accent-primary)]">▲</span>
      </span>
    );
  }
  return <span className={className}>{formatted}</span>;
}

export const RepoTable: React.FC<RepoTableProps> = ({ repos, loading, sortConfig, onSort }) => {
  const [expanded, setExpanded] = useState(false);

  // Calculate 95th percentile threshold for watchers/day highlighting
  const watchersPerDayThreshold = useMemo(() => {
    if (!repos.length) return 0;
    return getPercentile(repos.map(r => r.watchersPerDay || 0), 95);
  }, [repos]);

  // Check if value is in top 5%
  const isTopWatchersPerDay = (value: number): boolean => {
    return value >= watchersPerDayThreshold && watchersPerDayThreshold > 0;
  };

  if (loading) {
    return (
      <div className="p-6" style={{ fontFamily: 'var(--font-inter)' }}>
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="flex items-center gap-4 py-5 border-b border-[var(--border-subtle)]"
          >
            <div className="skeleton h-6 w-10 rounded" />
            <div className="flex-1 space-y-3">
              <div className="skeleton h-5 w-56 rounded" />
              <div className="skeleton h-4 w-80 rounded" />
            </div>
            <div className="skeleton h-6 w-20 rounded" />
            <div className="skeleton h-6 w-20 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'var(--font-inter)' }}>
      {/* View Toggle Header */}
      <div className="px-6 py-3 flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--bg-card)]">
        {expanded ? (
          <span className="text-[12px] text-[var(--text-tertiary)] flex items-center gap-1.5">
            <span className="text-[var(--accent-primary)]">▲</span>
            Top 5% watchers/day
          </span>
        ) : (
          <span />
        )}
        <ViewModeToggle expanded={expanded} onToggle={() => setExpanded(!expanded)} />
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[var(--bg-elevated)]">
              <th className="px-4 py-4 text-left text-[13px] font-semibold tracking-wide text-[var(--text-secondary)] w-12">
                #
              </th>
              <SortableHeader
                label="Repository"
                sortKey="name"
                sortConfig={sortConfig}
                onSort={onSort}
                align="left"
              />
              <SortableHeader
                label="Watchers"
                sortKey="followers"
                icon={<Users className="w-4 h-4 text-[var(--accent-primary)]" />}
                sortConfig={sortConfig}
                onSort={onSort}
              />
              {expanded && (
                <SortableHeader
                  label="Forks"
                  sortKey="forks"
                  icon={<GitFork className="w-4 h-4" />}
                  sortConfig={sortConfig}
                  onSort={onSort}
                />
              )}
              <SortableHeader
                label="Stars"
                sortKey="stars"
                icon={<Star className="w-4 h-4 text-amber-400" />}
                sortConfig={sortConfig}
                onSort={onSort}
              />
              <SortableHeader
                label="Created"
                sortKey="created_at"
                icon={<Calendar className="w-4 h-4" />}
                sortConfig={sortConfig}
                onSort={onSort}
                className="hidden sm:table-cell"
              />
              {expanded && (
                <>
                  <SortableHeader
                    label="👁️/day"
                    sortKey="watchersPerDay"
                    sortConfig={sortConfig}
                    onSort={onSort}
                  />
                  <SortableHeader
                    label="🍴/day"
                    sortKey="forksPerDay"
                    sortConfig={sortConfig}
                    onSort={onSort}
                  />
                  <SortableHeader
                    label="⭐/day"
                    sortKey="starsPerDay"
                    sortConfig={sortConfig}
                    onSort={onSort}
                  />
                </>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)]">
            {repos.map((repo, index) => (
              <tr 
                key={repo.name} 
                className="table-row-hover"
              >
                {/* Rank */}
                <td className="px-4 py-5 text-[15px] font-medium tabular-nums text-[var(--text-tertiary)]">
                  {index + 1}
                </td>
                
                {/* Repository name & description */}
                <td className="px-4 py-5">
                  <div className="flex flex-col gap-1.5">
                    <a 
                      href={repo.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 text-[15px] font-semibold text-[var(--text-primary)] hover:text-[var(--accent-blue)] transition-colors"
                    >
                      <span className="group-hover:underline underline-offset-2">
                        {repo.name}
                      </span>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-70 transition-opacity text-[var(--text-tertiary)]" />
                    </a>
                    {repo.description && (
                      <p className="text-[13px] leading-relaxed text-[var(--text-tertiary)] line-clamp-1 max-w-lg">
                        {repo.description}
                      </p>
                    )}
                  </div>
                </td>
                
                {/* Watchers - primary metric */}
                <td className="px-4 py-5 text-right">
                  <span className="text-[16px] font-bold tabular-nums text-[var(--accent-primary)]">
                    {repo.followers.toLocaleString()}
                  </span>
                </td>
                
                {/* Forks - expanded only */}
                {expanded && (
                  <td className="px-4 py-5 text-right text-[15px] font-medium tabular-nums text-[var(--text-secondary)]">
                    {repo.forks.toLocaleString()}
                  </td>
                )}
                
                {/* Stars */}
                <td className="px-4 py-5 text-right text-[15px] font-medium tabular-nums text-[var(--text-secondary)]">
                  {repo.stars.toLocaleString()}
                </td>
                
                {/* Created date */}
                <td className="px-4 py-5 text-right text-[14px] font-medium text-[var(--text-tertiary)] hidden sm:table-cell">
                  {formatDate(repo.created_at)}
                </td>
                
                {/* Velocity metrics - expanded only */}
                {expanded && (
                  <>
                    <td className="px-4 py-5 text-right">
                      <HighlightedValue
                          formatted={formatPerDayValue(repo.watchersPerDay)}
                        isTop={isTopWatchersPerDay(repo.watchersPerDay || 0)}
                        className="text-[13px] font-semibold tabular-nums text-[var(--accent-primary)]"
                      />
                    </td>
                    <td className="px-4 py-5 text-right text-[13px] font-medium tabular-nums text-[var(--text-tertiary)]">
                      {formatPerDayValue(repo.forksPerDay)}
                    </td>
                    <td className="px-4 py-5 text-right text-[13px] font-medium tabular-nums text-[var(--text-tertiary)]">
                      {formatPerDayValue(repo.starsPerDay)}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
