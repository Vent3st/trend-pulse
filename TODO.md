# GitHub Trend Pulse - TODO & Roadmap

## ✅ Completed

- [x] Core dashboard with 7d/30d/90d filters
- [x] Deep-fetch data integration (true follower counts)
- [x] Vercel-inspired dark theme
- [x] Inter font for improved table readability
- [x] Simplified date formatting (Dec 8)
- [x] Stats cards (Total Followers, Stars, Avg)
- [x] Responsive design
- [x] Description display under repo names

---

## 🔜 Short-Term (Next Session)

### Data Refresh Automation ✅
- [x] GitHub Action to run deep-fetch every 6 hours
- [x] Auto-commit updated JSON files
- [x] Vercel/Netlify deployment configs

### UI Enhancements
- [ ] Add search/filter by repo name
- [x] Column sorting (click headers to sort)
- [ ] Pagination or virtual scroll for performance
- [ ] Loading skeleton improvements

### Analytics
- [ ] Track trending velocity (stars/day)
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
- [ ] Add caching headers
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
| Node 18 deprecation warning | Info | Next.js 14 prefers Node 20+ |
| EMFILE errors on dev start | Workaround | System file limit - doesn't affect functionality |

---

## 💡 Ideas Backlog

- Repo "hall of fame" (all-time top)
- Weekly digest email
- GitHub OAuth for personalized recommendations
- AI-powered repo summarization
- Contribution graph preview
- "Similar repos" suggestions

---

## Running Locally

```bash
cd workspace/github_trending_puller
npm install
npm run dev
# Open http://localhost:3001
```

## Updating Data

```bash
cd workspace/trending_dashboard/scripts
python3 parse_deep.py  # Re-fetch with true followers
# Then copy to src/data/
```

---

*Last updated: December 19, 2025*

