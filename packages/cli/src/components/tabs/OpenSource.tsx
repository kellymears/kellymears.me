import { Box } from 'ink'
import { theme } from '../../theme.js'
import type { GithubData, ActivityGroup, Language } from '../../types.js'
import { Text } from '../shared/Text.js'
import { StatCard } from '../shared/StatCard.js'
import { ProgressBar } from '../shared/ProgressBar.js'
import { Divider } from '../shared/Divider.js'
import { ScrollView, type ScrollItem } from '../shared/ScrollView.js'
import { ScrollIndicator } from '../shared/ScrollIndicator.js'

interface Props {
  wide: boolean
  width: number
  height: number
  github: GithubData
}

function formatNumber(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : String(n)
}

const SHORT_LANG: Record<string, string> = {
  JavaScript: 'JS',
  TypeScript: 'TS',
  CoffeeScript: 'Coffee',
  Markdown: 'MD',
  Dockerfile: 'Docker',
  Makefile: 'Make',
  'Jupyter Notebook': 'Jupyter',
  'Objective-C': 'ObjC',
  'Objective-C++': 'ObjC++',
  'Visual Basic': 'VB',
}

function shortLang(name: string): string {
  return SHORT_LANG[name] || name
}

// --- Activity condensation ---

type ActivityKind =
  | 'push'
  | 'pr_opened'
  | 'pr_merged'
  | 'pr_closed'
  | 'review'
  | 'comment'
  | 'issue_opened'
  | 'issue_closed'
  | 'branch_created'

const KIND_LABELS: Record<string, (n: number) => string> = {
  push: (n) => (n === 1 ? '1 commit' : `${n} commits`),
  pr_opened: (n) => (n === 1 ? 'Opened PR' : `Opened ${n} PRs`),
  pr_merged: (n) => (n === 1 ? 'Merged PR' : `Merged ${n} PRs`),
  pr_closed: (n) => (n === 1 ? 'Closed PR' : `Closed ${n} PRs`),
  review: (n) => (n === 1 ? '1 review' : `${n} reviews`),
  comment: (n) => (n === 1 ? '1 comment' : `${n} comments`),
  issue_opened: (n) => (n === 1 ? 'Opened issue' : `Opened ${n} issues`),
  issue_closed: (n) => (n === 1 ? 'Closed issue' : `Closed ${n} issues`),
  branch_created: (n) => (n === 1 ? 'Created branch' : `Created ${n} branches`),
}

const KIND_ORDER: ActivityKind[] = [
  'push',
  'pr_opened',
  'pr_merged',
  'pr_closed',
  'review',
  'comment',
  'issue_opened',
  'issue_closed',
  'branch_created',
]

interface SummaryLine {
  label: string
  repo: string
}

function condenseGroup(group: ActivityGroup): SummaryLine[] {
  const byRepo = new Map<string, Map<string, number>>()
  for (const event of group.events) {
    let kindCounts = byRepo.get(event.repo)
    if (!kindCounts) {
      kindCounts = new Map()
      byRepo.set(event.repo, kindCounts)
    }
    kindCounts.set(event.kind, (kindCounts.get(event.kind) ?? 0) + 1)
  }

  const lines: SummaryLine[] = []
  const sortedRepos = [...byRepo.keys()].sort((a, b) => a.localeCompare(b))

  for (const repo of sortedRepos) {
    const counts = byRepo.get(repo)!
    for (const kind of KIND_ORDER) {
      const count = counts.get(kind)
      if (count) {
        const labelFn = KIND_LABELS[kind]
        if (labelFn) lines.push({ label: labelFn(count), repo })
      }
    }
  }

  return lines
}

// --- Scrollable item sub-components ---

function formatActivityDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

function SectionHeading({ text }: { text: string }) {
  return (
    <Text bold color={theme.text}>
      {text}
    </Text>
  )
}

export function OpenSource({ wide, width, height, github }: Props) {
  // Build items with line-count metadata
  const items: ScrollItem[] = []

  for (const group of github.recentActivity) {
    const lines = condenseGroup(group)
    if (lines.length === 0) continue

    items.push({
      node: <SectionHeading key={`heading-${group.date}`} text={formatActivityDate(group.date)} />,
      lines: 1,
    })

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]!
      items.push({
        node: (
          <Box key={`${group.date}-${i}`} justifyContent="space-between">
            <Text color={theme.text}>{line.label}</Text>
            <Text color={theme.textMuted}>{line.repo}</Text>
          </Box>
        ),
        lines: 1,
      })
    }

    items.push({ node: <Box key={`gap-${group.date}`} height={1} />, lines: 1 })
  }

  // stats(2) + divider(1) + indicator(1) + divider(1) + languages(1) + progressbar(2) + gaps(5) ≈ 13
  const scrollViewport = Math.max(4, height - 13)

  return (
    <Box flexDirection="column" gap={1} flexGrow={1}>
      {/* Zone 1: Fixed stats */}
      <Box justifyContent="space-around">
        <StatCard value={String(github.repos)} label="Public Repos" />
        <StatCard value={formatNumber(github.contributions)} label="Contributions" />
        <StatCard value={String(github.longestStreak)} label="Day Streak" />
        {wide && <StatCard value={String(github.memberSince)} label="Member Since" />}
      </Box>

      <Divider width={width} />

      {/* Zone 2: Scrollable activity feed */}
      <ScrollView items={items} viewportHeight={scrollViewport} isActive={true}>
        {(state) => <ScrollIndicator {...state} />}
      </ScrollView>

      <Box flexGrow={1} />

      {/* Zone 3: Fixed languages (footer) */}
      <Divider width={width} />
      <Text bold color={theme.text}>
        Languages
      </Text>
      <ProgressBar
        width={wide ? width - 6 : width - 4}
        segments={github.languages.map((l) => ({
          label: shortLang(l.name),
          percentage: l.percentage,
          color: l.color,
        }))}
      />
      <Box height={1} />
    </Box>
  )
}
