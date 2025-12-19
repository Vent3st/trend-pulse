# Data Fetch Scripts

Automated scripts for fetching and processing GitHub trending repository data.

## Scripts

### `fetch_trending.py`
Fetches trending repositories from GitHub Search API for different time periods.

```bash
# Set GitHub token (optional but recommended for rate limits)
export GITHUB_TOKEN=your_token_here

# Run
python fetch_trending.py
```

**Output files:**
- `repos_last_7_days_raw.json`
- `repos_last_30_days_raw.json`
- `repos_last_3_months_raw.json`

### `deep_fetch.py`
Performs individual repo lookups to get true follower counts (`subscribers_count`).

```bash
python deep_fetch.py
```

**Output files (in `../src/data/`):**
- `repos_last_7_days.json`
- `repos_last_30_days.json`
- `repos_last_3_months.json`

## Full Refresh

Run both scripts in sequence:

```bash
cd scripts
python fetch_trending.py
python deep_fetch.py
```

## GitHub Action

The `.github/workflows/update-data.yml` action runs these scripts automatically:
- **Schedule**: Every 6 hours
- **Trigger**: Manual dispatch available
- **Auto-commit**: Pushes updated JSON to repository

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_TOKEN` | No* | GitHub personal access token |

*Recommended to avoid rate limiting (60 req/hr unauthenticated vs 5000/hr with token)

## Data Format

Output JSON structure:

```json
[
  {
    "name": "owner/repo",
    "url": "https://github.com/owner/repo",
    "followers": 164,
    "forks": 2150,
    "stars": 11643,
    "created_at": "2025-11-22",
    "description": "Repository description..."
  }
]
```

Sorted by `followers` (descending) - true engagement metric.

