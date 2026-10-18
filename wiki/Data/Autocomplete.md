---
aliases:
  - Typeahead
  - Search-as-you-type
  - Autosuggest
  - Combobox
  - Prefix search
tags:
  - data
summary: Suggesting completions while someone types, which needs prefix-friendly indexes, ranking by likely intent, and careful handling of latency, typos, and accessibility.
---
**Autocomplete** suggests completions for what a person is typing, updating with each keystroke. It shows up in search boxes, address bars, code editors, command palettes, and form fields for cities or tags. Done well, it turns recall into recognition: a person doesn't have to remember an exact name, only spot it in a short list, which also reduces spelling errors and nudges queries toward ones that return results.

Behind the box are three problems: finding candidates fast, ranking them, and presenting them.

**Finding candidates.** Each keystroke produces a prefix, and the system must return matches in milliseconds. A [[Trie]] stores strings by shared prefixes, so all completions of "elec" sit beneath one node. Search engines instead build an [[Inverted Index]] of *edge n-grams*, indexing "e", "el", "ele", and so on for every word, so ordinary lookups double as prefix matches. Small lists, a few thousand items, can simply be filtered in the browser.

**Ranking.** Many strings share a prefix, so the order decides usefulness. Common signals are popularity, the user's own history, recency, and context, such as the current page or [[Faceted Search]] filters. Search engines rank by how often a query is typed and how often it leads to a click. Predictive text on phones uses a language model, a much larger version of the same idea as a [[Markov Chain]] predicting the next word.

**Tolerating mistakes.** People mistype, so good autocomplete matches approximately, using [[Edit Distance]] to accept "recieve" for "receive." Fuzzy matching on initials, typing "gcm" for "git commit," is common in editors and [[Command Palette]] tools.

The latency budget is tight. Suggestions must arrive faster than the next keystroke, or the list flickers behind the typing. Clients use [[Debounce and Throttle]] to avoid a request per key, cancel stale requests so an old response can't overwrite a newer one, a kind of race condition, and cache earlier prefixes. Servers keep suggestion indexes small and in memory.

**Presentation.** The interface pattern is a *combobox*, a text input tied to a popup list. Arrow keys move through suggestions, Enter accepts, and Escape closes. Screen readers need [[ARIA]] roles and live announcements to know suggestions exist at all, and [[Accessibility]] testing often finds autocomplete broken here. Too many suggestions cost decision time, per [[Hick's Law]], so lists are usually limited to five to ten items.

Autocomplete also shapes behavior. Suggestions steer people toward popular queries, can surface offensive or defamatory completions, and leak what others search for, so large services filter suggestion lists by hand. In a form, the browser's own autofill draws on saved [[Personal Data]], which is why fields should declare what they hold.

## See also
- [[Form Design]]
- [[Information Architecture]]
- [[Search Engine Optimization]]
- [[Binary Search]]
