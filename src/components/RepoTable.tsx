import React from 'react';
import { Star, GitFork, Users, ExternalLink, Calendar, ChevronUp, ChevronDown } from 'lucide-react';

export interface Repo {
  name: string;
  url: string;
  followers: number;
  forks: number;
  stars: number;
  created_at: string;
  description: string;
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

// Format date like "Dec 8" or "Nov 22"
function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Sortable header component
function SortableHeader({ 
  label, 
  sortKey, 
  icon, 
  sortConfig, 
  onSort,
  align = 'right'
}: { 
  label: string; 
  sortKey: keyof Repo; 
  icon?: React.ReactNode;
  sortConfig: SortConfig;
  onSort: (key: keyof Repo) => void;
  align?: 'left' | 'right';
}) {
  const isActive = sortConfig.key === sortKey;
  
  return (
    <th 
      className={`px-6 py-4 text-${align} text-[13px] font-semibold tracking-wide text-[var(--text-secondary)] cursor-pointer hover:text-[var(--text-primary)] transition-colors select-none`}
      onClick={() => onSort(sortKey)}
    >
      <span className={`inline-flex items-center gap-2 ${align === 'right' ? 'justify-end' : ''}`}>
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

export const RepoTable: React.FC<RepoTableProps> = ({ repos, loading, sortConfig, onSort }) => {
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
            <div className="skeleton h-6 w-20 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto" style={{ fontFamily: 'var(--font-inter)' }}>
      <table className="w-full">
        <thead>
          <tr className="bg-[var(--bg-elevated)]">
            <th className="px-6 py-4 text-left text-[13px] font-semibold tracking-wide text-[var(--text-secondary)]">
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
              label="Followers"
              sortKey="followers"
              icon={<Users className="w-4 h-4 text-[var(--accent-primary)]" />}
              sortConfig={sortConfig}
              onSort={onSort}
            />
            <th className="hidden sm:table-cell">
              <SortableHeader
                label="Forks"
                sortKey="forks"
                icon={<GitFork className="w-4 h-4" />}
                sortConfig={sortConfig}
                onSort={onSort}
              />
            </th>
            <SortableHeader
              label="Stars"
              sortKey="stars"
              icon={<Star className="w-4 h-4 text-amber-400" />}
              sortConfig={sortConfig}
              onSort={onSort}
            />
            <th className="hidden md:table-cell">
              <SortableHeader
                label="Created"
                sortKey="created_at"
                icon={<Calendar className="w-4 h-4" />}
                sortConfig={sortConfig}
                onSort={onSort}
              />
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-subtle)]">
          {repos.map((repo, index) => (
            <tr 
              key={repo.name} 
              className="table-row-hover"
            >
              {/* Rank */}
              <td className="px-6 py-5 text-[15px] font-medium tabular-nums text-[var(--text-tertiary)]">
                {index + 1}
              </td>
              
              {/* Repository name & description */}
              <td className="px-6 py-5">
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
              
              {/* Followers - primary metric */}
              <td className="px-6 py-5 text-right">
                <span className="text-[16px] font-bold tabular-nums text-[var(--accent-primary)]">
                  {repo.followers.toLocaleString()}
                </span>
              </td>
              
              {/* Forks */}
              <td className="px-6 py-5 text-right text-[15px] font-medium tabular-nums text-[var(--text-secondary)] hidden sm:table-cell">
                {repo.forks.toLocaleString()}
              </td>
              
              {/* Stars */}
              <td className="px-6 py-5 text-right text-[15px] font-medium tabular-nums text-[var(--text-secondary)]">
                {repo.stars.toLocaleString()}
              </td>
              
              {/* Created date */}
              <td className="px-6 py-5 text-right text-[14px] font-medium text-[var(--text-tertiary)] hidden md:table-cell">
                {formatDate(repo.created_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
