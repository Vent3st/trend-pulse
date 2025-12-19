#!/usr/bin/env python3
"""
Deep fetch individual repositories to get true follower counts (subscribers_count).
GitHub Search API returns watchers_count which mirrors stars, not real followers.
"""

import json
import os
import subprocess
import time

TOKEN = os.environ.get('GITHUB_TOKEN', '')

def get_repo_details(full_name: str) -> dict | None:
    """Fetch individual repo to get subscribers_count."""
    url = f"https://api.github.com/repos/{full_name}"
    
    headers = ["-H", "Accept: application/vnd.github.v3+json"]
    if TOKEN:
        headers.extend(["-H", f"Authorization: token {TOKEN}"])
    
    cmd = ["curl", "-s"] + headers + [url]
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode == 0:
            return json.loads(result.stdout)
    except Exception as e:
        print(f"  Error: {e}")
    return None

def process_file(raw_file: str, output_file: str, data_output: str):
    """Process raw search results with deep fetch."""
    if not os.path.exists(raw_file):
        print(f"✗ {raw_file} not found")
        return
    
    with open(raw_file) as f:
        data = json.load(f)
    
    items = data.get('items', [])
    print(f"\nProcessing {len(items)} repos from {os.path.basename(raw_file)}...")
    
    results = []
    for i, repo in enumerate(items, 1):
        name = repo['full_name']
        print(f"  [{i}/{len(items)}] {name}", end='\r')
        
        details = get_repo_details(name)
        
        if details and 'subscribers_count' in details:
            results.append({
                'name': name,
                'url': repo['html_url'],
                'followers': details.get('subscribers_count', 0),
                'forks': details.get('forks_count', repo.get('forks_count', 0)),
                'stars': details.get('stargazers_count', repo.get('stargazers_count', 0)),
                'created_at': repo.get('created_at', '').split('T')[0],
                'description': details.get('description', '') or ''
            })
        else:
            # Fallback if deep fetch fails
            results.append({
                'name': name,
                'url': repo['html_url'],
                'followers': 0,
                'forks': repo.get('forks_count', 0),
                'stars': repo.get('stargazers_count', 0),
                'created_at': repo.get('created_at', '').split('T')[0],
                'description': repo.get('description', '') or ''
            })
        
        time.sleep(0.1)  # Rate limit protection
    
    # Sort by followers descending
    results.sort(key=lambda x: x['followers'], reverse=True)
    
    # Save to data directory
    with open(data_output, 'w') as f:
        json.dump(results, f, indent=2)
    
    print(f"\n✓ Saved {len(results)} repos to {os.path.basename(data_output)}")

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    data_dir = os.path.join(os.path.dirname(script_dir), 'src', 'data')
    
    # Ensure data directory exists
    os.makedirs(data_dir, exist_ok=True)
    
    files = [
        ('repos_last_7_days_raw.json', 'repos_last_7_days.json'),
        ('repos_last_30_days_raw.json', 'repos_last_30_days.json'),
        ('repos_last_3_months_raw.json', 'repos_last_3_months.json'),
    ]
    
    for raw, output in files:
        raw_path = os.path.join(script_dir, raw)
        data_path = os.path.join(data_dir, output)
        process_file(raw_path, output, data_path)

if __name__ == "__main__":
    main()

