#!/usr/bin/env python3
"""
Fetch trending GitHub repositories for different time periods.
Uses GitHub Search API with date filters.
"""

import json
import os
import subprocess
from datetime import datetime, timedelta

# Use environment variable or fallback
TOKEN = os.environ.get('GITHUB_TOKEN', '')

def fetch_repos(query: str, output_file: str):
    """Fetch repos from GitHub Search API."""
    url = f"https://api.github.com/search/repositories?q={query}&sort=stars&order=desc&per_page=100"
    
    headers = [
        "-H", "Accept: application/vnd.github.v3+json",
    ]
    if TOKEN:
        headers.extend(["-H", f"Authorization: token {TOKEN}"])
    
    cmd = ["curl", "-s"] + headers + [url]
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode == 0:
            data = json.loads(result.stdout)
            with open(output_file, 'w') as f:
                json.dump(data, f, indent=2)
            print(f"✓ Saved {len(data.get('items', []))} repos to {output_file}")
            return True
    except Exception as e:
        print(f"✗ Error fetching {output_file}: {e}")
    return False

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Calculate date ranges
    now = datetime.now()
    date_7d = (now - timedelta(days=7)).strftime('%Y-%m-%d')
    date_30d = (now - timedelta(days=30)).strftime('%Y-%m-%d')
    date_90d = (now - timedelta(days=90)).strftime('%Y-%m-%d')
    
    # Fetch for each time period
    queries = [
        (f"created:>{date_7d} stars:>50", os.path.join(script_dir, "repos_last_7_days_raw.json")),
        (f"created:>{date_30d} stars:>100", os.path.join(script_dir, "repos_last_30_days_raw.json")),
        (f"created:>{date_90d} stars:>200", os.path.join(script_dir, "repos_last_3_months_raw.json")),
    ]
    
    print("Fetching trending repositories...")
    for query, output in queries:
        fetch_repos(query, output)

if __name__ == "__main__":
    main()

