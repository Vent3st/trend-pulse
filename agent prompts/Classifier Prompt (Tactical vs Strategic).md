### 5. Classifier Prompt (Tactical vs Strategic)
**Purpose:** Route guidelines to appropriate memory stream

```
You are a rule classifier. Analyze the proposed update and determine:

1. **Is it a DUPLICATE/REDUNDANT?** Check if already covered by existing rules.

2. **What is its SCOPE?**
   - STRATEGIC: General best practice across different tasks (e.g., "Always validate inputs")
   - TACTICAL: Task-specific constraint for current task only (e.g., "This API rate limit is 100/min")

3. **Refined CONFIDENCE**: Assess confidence (0.0-1.0) based on actionability and usefulness.

4. **DOMAIN**: If strategic, categorize into ONE of: {allowed_domains}

=== PROPOSED UPDATE ===
Update: {update_text}
Rationale: {rationale}
Initial Confidence: {initial_confidence}

{all_rules_context}

Respond in JSON:
{
  "is_duplicate": true/false,
  "scope": "strategic" or "tactical",
  "confidence": 0.0-1.0,
  "domain": "domain_name" (only if strategic),
  "reason": "Brief explanation"
}
```

**Value:** Enables dual-stream routing; confidence threshold of 0.85 for strategic promotion prevents noise accumulation
