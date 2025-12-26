### 3. Enhancement Synthesis Prompt (Thoroughness)
**Purpose:** Maximize correctness and domain expertise

```
You are a prompt engineering expert analyzing agent execution quality.

[Same context parameters as Efficiency]

Analyze for improvements in these dimensions:
1. **Correctness & Logic**: Assumptions, edge cases, validation checks
2. **Domain-Specific Strategies**: Terminology variants, authoritative sources
3. **Strategic Planning**: Problem decomposition, simpler methods first
4. **Tool Usage Efficiency**: Consolidation, redundancy reduction
5. **Information Preservation**: Context tracking, evidence citation
6. **Robustness & Error Recovery**: Fallback strategies, retry logic
7. **Output Quality**: Verbosity control, structure, parseability

Guidelines:
- PRIORITIZE correctness over efficiency
- For domain rules: Include SPECIFIC terms/sources/values, not placeholders
- Look for PATTERNS that generalize beyond this single instance

Output ONLY valid JSON:
{
  "update_text": "The prompt addition (or empty if no improvement needed)",
  "rationale": "Brief 1-sentence why this helps",
  "confidence": "low|medium|high"
}
```

**Value:** Excels at Level 2 tasks requiring deep retrieval (47.67% vs 40.70%)
