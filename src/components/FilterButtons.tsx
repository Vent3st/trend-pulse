import React from 'react';

export type TimeFilter = '7d' | '30d' | '90d';

interface FilterButtonsProps {
  activeFilter: TimeFilter;
  onFilterChange: (filter: TimeFilter) => void;
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({ activeFilter, onFilterChange }) => {
  const filters: { id: TimeFilter; label: string }[] = [
    { id: '7d', label: 'Last 7 Days' },
    { id: '30d', label: 'Last 30 Days' },
    { id: '90d', label: 'Last 90 Days' },
  ];

  return (
    <div 
      className="inline-flex p-1 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-default)]"
      role="tablist"
      aria-label="Filter repositories by time period"
      style={{ fontFamily: 'var(--font-inter)' }}
    >
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id;
        return (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            role="tab"
            aria-selected={isActive}
            className={`
              px-4 py-2 text-sm font-medium rounded-md transition-all duration-150
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]
              ${isActive 
                ? 'bg-white text-black font-semibold shadow-sm' 
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
              }
            `}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
};
