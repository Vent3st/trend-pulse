# GitHub Trend Pulse - Changelog

## [1.0.0] - 2025-12-19

### 🎉 Initial Release

Built a modern, high-performance Next.js dashboard for visualizing trending GitHub repositories with true follower counts.

---

### Features Implemented

#### Core Functionality
- **Deep Fetch Analytics**: Bypasses GitHub Search API limitation where `watchers` mirrors `stars`. Uses individual repo lookups to get true `subscribers_count` (real followers).
- **Time Period Filters**: 7 days, 30 days, 90 days
- **Real-time Stats**: Total Followers, Total Stars, Average Followers
- **Sortable Data**: All repos pre-sorted by true follower count (descending)

#### Data Pipeline
- Markdown deep-fetch files parsed and merged with raw JSON for descriptions
- 100 repos per time period with ~90% description coverage
- JSON data served via Next.js API route (`/api/data`)

#### UI/UX
- **Vercel-inspired dark theme**: Pure black (#000000) background
- **High contrast text**: Pure white (#ffffff) for primary, #b4b4b4 for secondary
- **Typography**:
  - Headers: Space Grotesk (gradient accent)
  - Table content: Inter (optimized for screen readability)
  - Numbers: JetBrains Mono (tabular figures)
- **Responsive design**: Mobile-friendly table with hidden columns on small screens
- **Accessibility**: ARIA labels, focus states, semantic HTML

---

### Design Iterations

| Version | Change | Reason |
|---------|--------|--------|
| v0.1 | Initial dark theme | Base implementation |
| v0.2 | Increased text contrast | User feedback: eye strain |
| v0.3 | Added Inter font for table | Better data readability |
| v0.4 | Simplified dates (Dec 8 vs 2025-12-08) | Cleaner presentation |
| v0.5 | Unified font usage across controls | Consistency |

---

### Tech Stack
- **Framework**: Next.js 14.2.30
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Space Grotesk, Inter, JetBrains Mono)
- **Data**: Static JSON (can be replaced with API)

---

### File Structure
```
workspace/github_trending_puller/
├── src/
│   ├── app/
│   │   ├── api/data/route.ts    # API endpoint
│   │   ├── globals.css          # Theme & utilities
│   │   ├── layout.tsx           # Root layout + fonts
│   │   └── page.tsx             # Main dashboard
│   ├── components/
│   │   ├── FilterButtons.tsx    # Time period selector
│   │   └── RepoTable.tsx        # Data table
│   └── data/
│       ├── repos_last_7_days.json
│       ├── repos_last_30_days.json
│       └── repos_last_3_months.json
├── package.json
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

### Data Sources
Deep-fetch markdown files located at:
```
workspace/trending_dashboard/scripts/
├── repos_last_7_days_deep.md
├── repos_last_30_days_deep.md
└── repos_last_3_months_deep.md
```

---

## Contributors
- XtianC

