# Trend Pulse

A high-performance dashboard displaying trending GitHub repositories across multiple time periods.

**Live Site**: https://trend-pulse-kappa.vercel.app

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)

## Features

- 📊 **Top 100 Repositories** - Ranked by watchers across 7, 30, and 90 day periods
- 👁️ **True Watcher Counts** - Deep-fetched `subscribers_count` bypassing GitHub API limitations
- 📈 **Velocity Metrics** - Watchers/day, Forks/day, Stars/day with sortable columns
- 🏆 **Top 5% Highlighting** - Temporal analysis highlights top performers in watchers/day
- 🎨 **Modern UI** - Vercel-inspired dark theme with card shadows and hover effects
- ⚡ **Column Expansion** - Toggle between Essential (5 cols) and Detailed (9 cols) views
- 📱 **Responsive** - Works on all screen sizes
- 🔄 **Hourly Auto-Updates** - GitHub Action refreshes data every hour

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

### Vercel (Recommended)
```bash
vercel
```

### Netlify
Connect repo via Netlify dashboard - auto-detects Next.js

## Data Pipeline

| Script | Purpose |
|--------|---------|
| `scripts/fetch_trending.py` | Fetches from GitHub Search API |
| `scripts/deep_fetch.py` | Gets true watcher counts & merges data |

Data is auto-updated via `.github/workflows/update-data.yml`

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Fonts**: Inter, Space Grotesk, JetBrains Mono
- **Data**: Python scripts + GitHub API

---

## Worklog

### December 30-31, 2025 - Major UX Overhaul

#### GitHub Actions & Security
- Fixed 403 permission error on `git push` by adding `permissions: contents: write`
- Fixed silent data fetching failure with URL encoding (`urllib.parse.quote`)
- Changed workflow schedule from 6 hours → 1 hour for fresher data
- Added security headers in `next.config.mjs` (X-Frame-Options, X-XSS-Protection, etc.)
- Added input validation for API route filter parameter
- Configured workflow to use personal email for GitHub contribution graph credit

#### UI/UX Enhancements
- **Renamed "Followers" → "Watchers"** to match GitHub terminology
- **Column Expansion Toggle**: Essential (5 cols) vs Detailed (9 cols) views
- **Velocity Metrics**: Added watchers/day, forks/day, stars/day columns
- **Top 5% Highlighting**: Temporal analysis with ▲ indicator for top performers
- **Left-Aligned Hero**: Improved F-pattern scanning (15-20% faster per NNG research)
- **Card Shadows**: Subtle depth with hover lift effect (`translateY(-2px)`)
- **Moved "Live Analytics" Badge**: From hero to table header
- **Updated Stat Cards**: Total Watchers, Total Forks, Total Stars
- **Filter Label Clarity**: "Time Period" → "Repos Created In"
- **Decimal Rounding**: Per-day metrics show 1 decimal place (e.g., 3.4, not 3.42)

#### Documentation Created
- `docs/DESIGN_RECOMMENDATIONS.md` - Color psychology, layout best practices
- `docs/COLUMN_OVERLOAD_ANALYSIS.md` - Research-backed UX solutions (Miller's Law, NNG)
- `UX_RECOMMENDATIONS.md` - Critical improvement priorities

#### Branch Protection
- Enabled protection on `main` branch
- Prevents force push and deletion
- Allows automated commits (no status checks required)

---

## License

MIT
