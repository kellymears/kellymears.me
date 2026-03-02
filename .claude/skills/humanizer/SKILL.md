---
name: humanize
description: Diagnose and fix AI writing tells in prose
user_invocable: true
---

# /humanize

Diagnose and fix AI writing tells in prose. Works on any text file — blog posts, essays, documentation — but tuned for argumentative and personal writing.

## Workflow

Three passes. Show the diagnosis before rewriting.

### Pass 1: Diagnose

Read the target file. Produce a categorized report of AI tells with line references. Group by detection tier. Show the report to the user and wait for confirmation before rewriting.

Format:

```
## Diagnosis: [filename]

### Tier 1: Vocabulary
- Line N: "word/phrase" — [category]

### Tier 2: Sentence patterns
- Line N: [description]

### Tier 3: Structural patterns
- [description]

### Tier 4: Voice and tone
- [description]

### Tier 5: Predictability
- [description]

### Summary
N issues across M tiers. Recommended: [rewrite / light edit / leave alone]
```

### Pass 2: Rewrite

Apply targeted passage-level fixes. Use the Edit tool for each change. Do NOT rewrite the file from scratch.

Preserve:
- All arguments, claims, and factual content
- Quotes and citations
- Technical terminology
- The author's core voice and perspective
- Frontmatter structure

Change:
- Flagged vocabulary
- Sentence rhythm (add variation)
- Paragraph density (add breathing room)
- Transitions (cut signposts, trust section breaks)
- Closing/opening balance (break false symmetry)

### Pass 3: Audit

Re-read the edited file. Check against validation heuristics. Flag remaining issues. Fix anything that still triggers.

## Detection Tiers

### Tier 1: Vocabulary blacklist

Zero tolerance. These words/phrases must be replaced or cut.

**Grandiosity**: fundamentally, transformative, groundbreaking, revolutionary, paradigm shift, game-changing, unprecedented, remarkably

**Brochure copy**: robust, seamless, cutting-edge, state-of-the-art, best-in-class, leverage (as verb), utilize, facilitate, optimize

**Filler hedging**: it's worth noting that, it's important to note, it should be noted, interestingly, notably, significantly, crucially

**False significance**: consequentially, profoundly, inherently, intrinsically, quintessentially, undeniably (outside quotes)

**Connector crutches**: moreover, furthermore, additionally, in essence, at its core, when it comes to, in terms of, with that said, that said

**Editorial intrusion**: let's dive in, let's explore, let's unpack, now for the part where, here's where it gets, buckle up

### Tier 2: Sentence patterns

**Burstiness deficit**: If sentence lengths cluster within ±3 words of the mean, flag. Good prose has standard deviation > 8 words across sentence lengths.

**Trailing significance clauses**: Sentences that end with "— and that matters" / "— and that's the point" / "— which is precisely why" / "— and this is crucial". Cut or rewrite the whole sentence.

**Nominalization overuse**: Verbs turned into nouns with -tion, -ment, -ness when the verb form is more direct. "The implementation of" → "implementing". "The consideration of" → "considering".

**Participial clause stacking**: Multiple -ing phrases chained together. "Training models, evaluating outputs, and measuring performance" — fine once, but if every third sentence does this, flag it.

### Tier 3: Structural patterns

**Uniform paragraph density**: If all paragraphs are 3-5 sentences, flag. Good writing has range > 3 sentences (1-sentence paragraphs next to 6-sentence paragraphs).

**Rule-of-three compulsion**: Every list has exactly three items. Every escalation has three steps. Break some into two or four.

**Transition word density**: If more than 2 transition words per 500 words (however, therefore, consequently, furthermore, moreover, additionally, nevertheless), flag.

**Compulsive summaries**: Paragraphs that restate what was just said. "In other words..." / "Put simply..." / "To summarize...". Cut them.

**Signposted transitions**: "Let's turn to X." / "Now let's look at Y." / "Start with Z, because..." Trust section breaks and reader intelligence.

### Tier 4: Voice and tone

**Absence of genuine opinion**: The text argues a position but never commits with first person conviction. Hedges everything. "One might argue" instead of "I think."

**Hedging deficit**: Paradoxically, some hedging is human. Zero uncertainty reads as overconfident. But the hedging should be specific ("I'm not sure this holds for X") not generic ("it's important to consider").

**Uniform competence**: Every paragraph demonstrates roughly equal command. Real writing has moments of uncertainty, tangents, asides. If the text never falters or digresses, flag.

**Editorial intrusion phrases**: "Here's where it gets interesting" / "This is the key insight" / "The crucial takeaway". These announce significance instead of demonstrating it. Cut them all.

### Tier 5: Predictability

**No surprises**: Every paragraph goes exactly where you expect. No unexpected examples, no tonal shifts, no humor, no asides.

**No juxtaposition**: Everything stays in the same register. Technical stays technical. Philosophical stays philosophical. Good writing mixes registers.

**Information density too uniform**: Every sentence carries roughly equal weight. Good writing has dense sentences followed by breathing room.

## Voice target

What good prose sounds like — the target, not the starting point:

- **Direct** — says what it means without warming up to it
- **Irregular** — mixes sentence lengths deliberately (fragments to sprawls)
- **Specific** — concrete nouns, numbers, proper names over abstractions
- **Opinionated** — first person with conviction, not decoration
- **Trusts the reader** — doesn't summarize, doesn't explain the joke
- **Structurally varied** — 1-sentence paragraphs next to 6-sentence paragraphs
- **Imperfect** — has asides, tangents, moments of uncertainty

## Anti-patterns

What NOT to do during rewriting:

- **Don't rewrite from scratch** — fix passages, not the whole piece. Use Edit, not Write.
- **Don't make it "quirky" or "casual"** — that's a different kind of fake. Forced informality is worse than AI formality.
- **Don't over-correct into choppy** — burstiness means variation, not brevity. Don't turn every sentence into a fragment.
- **Don't remove technical precision** — specific numbers, proper nouns, and technical terms stay. Vagueness is not voice.
- **Don't change the argument** — the ideas are the user's. Change how they're expressed, not what they say.
- **Don't add personality that isn't there** — if the piece doesn't have humor, don't inject it. If it does, amplify it.
- **Don't over-fix** — some AI tells are fine in small doses. One "fundamentally" in 2000 words is human. Five is not.

## Validation heuristics

Run these after rewriting. Flag issues but don't gate on them — they're heuristics, not rules.

| Metric | Target |
|--------|--------|
| Blacklisted vocabulary | 0 instances |
| Sentence length StdDev | > 8 words |
| Transition word density | < 2 per 500 words |
| Fragment sentences | ≥ 1 per 500 words |
| Trailing significance clauses | 0 |
| Paragraph length variance | range > 3 sentences |
| Signposted transitions | 0 |
| Editorial intrusion phrases | 0 |

## Usage

```
/humanize                        # prompts for file path
/humanize data/blog/my-post.mdx  # runs on specific file
```

If no file is specified, ask the user which file to humanize.

Read the file, run Pass 1 (Diagnose), show the report, then ask the user before proceeding to Pass 2 (Rewrite) and Pass 3 (Audit).
