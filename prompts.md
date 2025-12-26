

---

## Explicit Prompt Templates

### 1. Corrective Synthesis Prompt
**Purpose:** Generate targeted fixes when agent encounters errors

```
You are a prompt engineering expert analyzing agent execution errors.

Your task: Generate a SHORT, TARGETED system prompt addition (1-3 lines) that will help prevent this error in the future.

Context:
- Agent Name: {agent_name}
- Agent Role: {agent_role}
- Task: {task}
- Error Type: {error_type}
- Error Message: {error_message}

Previous actions taken:
{last_step_summary}

Current system prompt (for reference, to avoid duplication):
{current_system_prompt}

Already applied rules (DO NOT duplicate these):
{applied_rules}

Guidelines:
1. Be SPECIFIC and ACTIONABLE - target the exact error cause
2. Be BRIEF - max 1-3 lines
3. Use imperative language ("Always...", "Never...", "When X, do Y...")
4. Don't repeat what's already in the current system prompt
5. Focus on formatting, structure, or procedure constraints

Output ONLY valid JSON:
{
  "update_text": "The actual prompt addition text here",
  "rationale": "Brief 1-sentence why this helps",
  "confidence": "low|medium|high"
}
```

**Value:** Reduces error loops by 15-42%; enables real-time "debugging" ([Source](https://arxiv.org/abs/2512.15374))

---

### 2. Enhancement Synthesis Prompt (Efficiency)
**Purpose:** Optimize for speed and token economy

```
You are a prompt engineering expert analyzing agent execution quality.

Your task: Analyze this successful step and determine if there are inefficiencies. If found, generate a SHORT, TARGETED system prompt addition (1-3 lines).

Context:
- Agent Name: {agent_name}
- Agent Role: {agent_role}
- Task: {task}
- Step Number: {step_number}

Step details:
{last_step_summary}

Current system prompt:
{current_system_prompt}

Already applied rules (DO NOT duplicate):
{applied_rules}

Analyze for:
1. **Inefficient tool usage**: Multiple calls when one would suffice
2. **Verbose outputs**: Unnecessarily long reasoning
3. **Missing best practices**: Not following domain-specific best practices
4. **Suboptimal approaches**: Using less efficient methods

Guidelines:
- Only suggest if there's a CLEAR, ACTIONABLE improvement
- Be BRIEF - max 1-3 lines
- Use imperative language ("Always...", "Prefer...", "When X, use Y instead of Z...")

Output ONLY valid JSON:
{
  "update_text": "The prompt addition (or empty if no improvement needed)",
  "rationale": "Brief 1-sentence why this helps",
  "confidence": "low|medium|high"
}
```

**Value:** 61% of synthesized guidelines are enhancement-type; outperforms on Level 3 complex tasks (26.92% vs 11.54%)

---

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

---

### 4. Best-of-N Selector Prompt
**Purpose:** Choose optimal guideline from multiple candidates

```
You are a prompt engineering expert evaluating multiple candidate prompt updates.

Your task: Select the BEST candidate update from the options below.

Context:
- Agent Name: {agent_name}
- Agent Role: {agent_role}
- Task: {task}
- Issue Type: {issue_type}

Issue Details:
{issue_details}

Current system prompt:
{current_system_prompt}

Candidate Updates:
{candidates}

Evaluation Criteria (in priority order):
1. **Specificity & Relevance**: Most directly addresses the actual issue
2. **Actionability**: Clear, implementable instructions
3. **Generalizability**: Useful beyond just this instance
4. **Brevity**: Concise without unnecessary words
5. **Non-duplication**: Doesn't repeat existing prompt content

Output ONLY valid JSON:
{
  "selected_index": 0,
  "rationale": "Brief 1-2 sentence explanation"
}
```

**Value:** +3.03% accuracy improvement; quality > quantity (Gemini generates 46% more guidelines than GPT-4.1 with only 0.61% better performance)

---

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

---

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

---

## Statistical Evidence Summary

| Metric | Baseline | SCOPE | Effect Size |
|--------|----------|-------|-------------|
| HLE Success Rate | 14.23% | 38.64% | +171% relative improvement |
| GAIA Success Rate | 32.73% | 56.97% | +74% relative improvement |
| Error Reduction | 1,714 errors | 1,000-1,461 errors | 15-42% reduction |
| Perspective Stream Overlap | - | 33.94% | ~23% unique solutions per stream |

Sources: [arXiv:2512.15374v1](https://arxiv.org/abs/2512.15374), Tables 1-6
