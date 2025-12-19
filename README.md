# Trend Pulse

A high-performance dashboard displaying trending GitHub repositories across multiple time periods.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)

## Features

- 📊 **Top 100 Repositories** - Ranked by stars across 7, 30, and 90 day periods
- 🔄 **True Follower Counts** - Deep-fetched `subscribers_count` bypassing GitHub API limitations
- 🎨 **Modern UI** - Vercel-inspired design with Inter typography
- ⚡ **Sortable Columns** - Click headers to sort by any metric
- 📱 **Responsive** - Works on all screen sizes
- 🔄 **Auto-Updates** - GitHub Action refreshes data every 6 hours

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
| `scripts/deep_fetch.py` | Gets true follower counts & merges data |

Data is auto-updated via `.github/workflows/update-data.yml`

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Fonts**: Inter, Space Grotesk, JetBrains Mono
- **Data**: Python scripts + GitHub API

## License

MIT
