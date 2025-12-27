# GitHub Trend Pulse - TODO & Roadmap

## ✅ Completed

- [x] Core dashboard with 7d/30d/90d filters
- [x] Deep-fetch data integration (true watcher counts)
- [x] Vercel-inspired dark theme
- [x] Inter font for improved table readability
- [x] Simplified date formatting (Dec 8)
- [x] Stats cards (Total Watchers, Forks, Stars)
- [x] Responsive design
- [x] Description display under repo names
- [x] Column sorting (click headers to sort)
- [x] GitHub Action hourly auto-refresh
- [x] Security hardening (headers, input validation)
- [x] Velocity metrics (/day columns)
- [x] Column expansion toggle (Essential/Detailed views)
- [x] Top 5% highlighting for watchers/day
- [x] Left-aligned hero for better scanning
- [x] Card shadow effects with hover lift
- [x] Renamed "Followers" → "Watchers" to match GitHub

---

## 🔜 Short-Term (Next Session)

### UI Enhancements
- [ ] Add search/filter by repo name
- [ ] Reduce repos from 100 to 50
- [ ] Loading skeleton improvements

### Analytics
- [ ] Add language/topic badges
- [ ] Show repo age indicator

---

## 📋 Medium-Term

### Features
- [ ] Compare mode (side-by-side repo comparison)
- [ ] Bookmark/save repos locally
- [ ] Export to CSV/JSON
- [ ] Dark/Light theme toggle
- [ ] Keyboard navigation (j/k to move, enter to open)

### Data Enrichment
- [ ] Fetch repo topics/tags
- [ ] Add language breakdown
- [ ] Show recent commit activity
- [ ] License information

### Performance
- [ ] Implement ISR (Incremental Static Regeneration)
- [ ] Optimize bundle size

---

## 🎯 Long-Term Vision

### API & Backend
- [ ] Move to real-time API (vs static JSON)
- [ ] Rate-limited GitHub API proxy
- [ ] User authentication for saved preferences
- [ ] Webhook for instant updates

### Advanced Analytics
- [ ] Historical trending data (time series)
- [ ] Predict "rising" repos before they trend
- [ ] Category classification (AI/ML, DevTools, etc.)
- [ ] Community sentiment analysis

### Integrations
- [ ] RSS feed for new trending repos
- [ ] Slack/Discord notifications
- [ ] Browser extension
- [ ] Mobile app (React Native)

---

## 🐛 Known Issues

| Issue | Status | Notes |
|-------|--------|-------|
| ~10% repos missing descriptions | Low | Some repos have no description set |

---

## 📚 Documentation

- `docs/DESIGN_RECOMMENDATIONS.md` - Color psychology, layout best practices
- `docs/COLUMN_OVERLOAD_ANALYSIS.md` - Research-backed UX solutions
- `UX_RECOMMENDATIONS.md` - Critical UX improvements

---

## Running Locally

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Updating Data

Data auto-updates hourly via GitHub Actions.

Manual refresh:
```bash
cd scripts
python fetch_trending.py
python deep_fetch.py
```

---

*Last updated: December 26, 2025*
