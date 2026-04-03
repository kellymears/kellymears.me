import { Box } from 'ink'
import { theme } from '../../theme.js'
import type { GithubData, FeaturedRepo, TopRepo, ActivityGroup, Language } from '../../types.js'
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

function langColor(lang: string, languages: Language[]): string {
  return languages.find((l) => l.name === lang)?.color || theme.textDim
}

// --- Scrollable item sub-components ---

function FeaturedRepoCard({
  repo,
  wide,
  width,
  languages,
}: {
  repo: FeaturedRepo
  wide: boolean
  width: number
  languages: Language[]
}) {
  return (
    <Box flexDirection="column">
      <Box justifyContent="space-between">
        <Box gap={2}>
          <Text bold color={theme.text}>
            {repo.name}
          </Text>
          <Text color={theme.primaryBright}>{repo.role}</Text>
        </Box>
        <Box gap={2}>
          <Text color={theme.textDim}>★ {formatNumber(repo.stars)}</Text>
          <Text color={theme.textDim}>⑂ {formatNumber(repo.forks)}</Text>
          <Text color={langColor(repo.language, languages)}>{shortLang(repo.language)}</Text>
        </Box>
      </Box>
      {wide ? (
        <Text color={theme.textDim} textWidth={width}>
          {repo.highlight}
        </Text>
      ) : (
        <Text color={theme.textDim} wrap="truncate-end">
          {repo.highlight}
        </Text>
      )}
    </Box>
  )
}

function RepoRow({
  repo,
  wide,
  languages,
}: {
  repo: TopRepo
  wide: boolean
  languages: Language[]
}) {
  return (
    <Box flexDirection="column">
      <Box justifyContent="space-between">
        <Text color={theme.text}>{repo.name}</Text>
        <Box gap={2}>
          <Text color={theme.textDim}>★ {formatNumber(repo.stars)}</Text>
          {repo.language && (
            <Text color={langColor(repo.language, languages)}>{shortLang(repo.language)}</Text>
          )}
        </Box>
      </Box>
      {wide && repo.description && (
        <Text color={theme.textMuted} wrap="truncate-end">
          {repo.description}
        </Text>
      )}
    </Box>
  )
}

function formatActivityDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function summarizeEvents(events: readonly { kind: string; repo: string; message: string }[]) {
  const repos = [...new Set(events.map((e) => e.repo.replace(/^[^/]+\//, '')))]
  const kinds = [...new Set(events.map((e) => e.kind))]

  const kindLabel =
    kinds.length === 1 ? (kinds[0] === 'push' ? 'pushes' : `${kinds[0]}s`) : 'events'

  return { repos: repos.slice(0, 3).join(', '), count: events.length, kindLabel }
}

function ActivityGroupRow({ group }: { group: ActivityGroup }) {
  const { repos, count, kindLabel } = summarizeEvents(group.events)
  return (
    <Box gap={2}>
      <Text color={theme.textMuted}>{formatActivityDate(group.date)}</Text>
      <Text color={theme.text}>{repos}</Text>
      <Text color={theme.textDim}>
        {count} {kindLabel}
      </Text>
    </Box>
  )
}

function SectionHeading({ text }: { text: string }) {
  return (
    <Text bold color={theme.text}>
      {text}
    </Text>
  )
}

export function OpenSource({ wide, width, height, github }: Props) {
  const lineWidth = Math.max(40, wide ? width - 6 : width - 4)
  const estimateLines = (text: string) => Math.ceil(text.length / lineWidth)

  // Build items with line-count metadata
  const items: ScrollItem[] = []

  items.push({ node: <SectionHeading key="feat-heading" text="Featured" />, lines: 1 })
  for (const repo of github.featured) {
    const highlightLines = wide ? estimateLines(repo.highlight) : 1
    items.push({
      node: (
        <FeaturedRepoCard
          key={repo.name}
          repo={repo}
          wide={wide}
          width={lineWidth}
          languages={github.languages}
        />
      ),
      lines: 1 + highlightLines,
    })
  }

  items.push({ node: <Divider key="div-repos" width={width} />, lines: 1 })
  items.push({ node: <SectionHeading key="repos-heading" text="Repositories" />, lines: 1 })
  for (const repo of github.topRepos) {
    items.push({
      node: <RepoRow key={repo.name} repo={repo} wide={wide} languages={github.languages} />,
      lines: wide && repo.description ? 2 : 1,
    })
  }

  items.push({ node: <Divider key="div-activity" width={width} />, lines: 1 })
  items.push({ node: <SectionHeading key="activity-heading" text="Recent Activity" />, lines: 1 })
  for (const group of github.recentActivity) {
    items.push({ node: <ActivityGroupRow key={group.date} group={group} />, lines: 1 })
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

      {/* Zone 2: Scrollable viewport */}
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
