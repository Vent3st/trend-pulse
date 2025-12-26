### 6. Memory Optimization Pipeline

**6a. Guideline Analyzer Prompt**
```
You are a rule optimization analyzer. Analyze these {count} rules and identify:

1. **CONFLICTS**: Pairs giving contradictory guidance (PRIORITY: Highest)
2. **SUBSUMPTION**: Pairs where specific rule is covered by general rule (PRIORITY: High)
3. **CONSOLIDATION**: Groups expressing similar concepts that can merge (PRIORITY: Medium)

{rules_text}

IMPORTANT: A rule pair should appear in AT MOST ONE category.

Respond with ONLY valid JSON:
{
  "consolidation": [[idx1, idx2], [idx3, idx4]],
  "subsumption": [[general_idx, specific_idx]],
  "conflicts": [[idx1, idx2]]
}
```

**6b. Consolidation Prompt**
```
You are merging similar rules into one comprehensive rule.

Original rules to merge:
{rules_text}

Create a single rule that:
1. Captures all key guidance from original rules
2. Is clear and actionable
3. Eliminates redundancy
4. Maintains original intent

Return JSON:
{
  "rule": "The merged rule text",
  "rationale": "Brief explanation"
}
```

**Value:** Reduced 11 guidelines to 5 in example case; prevents attention dilution from redundant guidelines
