const GITHUB_USERNAME = 'kellymears'
const GITHUB_API = 'https://api.github.com'
const GITHUB_GRAPHQL = 'https://api.github.com/graphql'
const REVALIDATE = { next: { revalidate: 3600 } } as RequestInit

// --- Types ---

export interface GitHubProfile {
  login: string
  name: string
  bio: string
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  avatar_url: string
  html_url: string
}

export interface Repository {
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
  fork: boolean
  archived: boolean
  pushed_at: string
  owner: { login: string }
}

export interface FeaturedRepository extends Repository {
  role: string
  highlight: string
}

export interface ContributionDay {
  date: string
  contributionCount: number
  weekday: number
}

export interface ContributionWeek {
  contributionDays: ContributionDay[]
}

export interface ContributionData {
  totalContributions: number
  weeks: ContributionWeek[]
}

export interface ContributionStats {
  totalContributions: number
  activeDays: number
  totalDays: number
  maxDay: number
  longestStreak: number
  currentStreak: number
  averagePerActiveDay: number
}

export interface LanguageBreakdown {
  name: string
  count: number
  percentage: number
  color: string
}

export type ActivityKind =
  | 'push'
  | 'pr_opened'
  | 'pr_merged'
  | 'pr_closed'
  | 'review'
  | 'comment'
  | 'issue_opened'
  | 'issue_closed'
  | 'branch_created'

export interface ActivityEvent {
  kind: ActivityKind
  message: string
  repo: string
  repoUrl: string
  isPrivate: boolean
  timestamp: string
  sha?: string
  url?: string
}

export interface ActivityGroup {
  date: string
  label: string
  events: ActivityEvent[]
}

export interface RecentActivity {
  groups: ActivityGroup[]
  totalEvents: number
}

interface GitHubEvent {
  type: string
  public: boolean
  created_at: string
  repo: { name: string; url: string }
  payload: {
    action?: string
    ref?: string
    ref_type?: string
    head?: string
    number?: number
    commits?: Array<{ sha: string; message: string; distinct: boolean }>
    pull_request?: { title?: string; html_url?: string; merged?: boolean; state?: string }
    review?: { state?: string; html_url?: string }
    issue?: { title?: string; html_url?: string; state?: string; number?: number }
    comment?: { body?: string; html_url?: string }
  }
}

export interface GitHubPageData {
  profile: GitHubProfile
  featured: FeaturedRepository[]
  repos: Repository[]
  repoPool: Repository[]
  contributions: ContributionData
  contributionStats: ContributionStats
  languages: LanguageBreakdown[]
  recentActivity: RecentActivity
}

// --- Featured project config ---

const FEATURED_CONFIG: Record<string, { role: string; highlight: string }> = {
  'roots/bud': {
    role: 'Lead Developer',
    highlight:
      '854+ PRs merged. The official build system for the Roots WordPress ecosystem — webpack, SWC, esbuild, PostCSS, and Tailwind out of the box. Now in maintenance mode.',
  },
  'roots/sage': {
    role: 'Core Contributor',
    highlight:
      'The most popular WordPress starter theme. Contributed build system integration and modern development workflow.',
  },
}

const FEATURED_REPOS = Object.keys(FEATURED_CONFIG)

const REPO_BOOSTS: Record<string, number> = {
  // Multiplier on composite score. >1 boosts, <1 suppresses, 0 excludes.
  kellymears: 0,
  'kellymears.me': 0,
}

const EXCLUDED_ORGS = new Set(['oncarrot'])

// --- Language colors (GitHub Linguist) ---

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  PHP: '#4F5D95',
  CSS: '#563d7c',
  Shell: '#89e051',
  HTML: '#e34c26',
  Ruby: '#701516',
  C: '#555555',
}

// --- Helpers ---

function headers(): HeadersInit {
  const token = process.env.GITHUB_TOKEN
  if (!token) return { Accept: 'application/vnd.github.v3+json' }
  return {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `Bearer ${token}`,
  }
}

async function safeFetch<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn()
  } catch (e) {
    console.error('[github] fetch failed:', e)
    return fallback
  }
}

// --- Fetch functions ---

async function fetchProfile(): Promise<GitHubProfile> {
  const res = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`, {
    headers: headers(),
    ...REVALIDATE,
  })
  if (!res.ok) throw new Error(`Profile fetch failed: ${res.status}`)
  return res.json()
}

async function fetchPaginated<T>(url: string, label: string, maxPages?: number): Promise<T[]> {
  const all: T[] = []
  let page = 1

  while (!maxPages || page <= maxPages) {
    const res = await fetch(`${url}${url.includes('?') ? '&' : '?'}per_page=100&page=${page}`, {
      headers: headers(),
      ...REVALIDATE,
    })
    if (!res.ok) throw new Error(`${label} fetch failed: ${res.status}`)
    const batch: T[] = await res.json()
    if (batch.length === 0) break
    all.push(...batch)
    if (batch.length < 100) break
    page++
  }

  return all
}

async function fetchUserRepos(): Promise<Repository[]> {
  const repos = await fetchPaginated<Repository>(
    `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=stars&direction=desc`,
    'Repos'
  )
  return repos.filter((r) => !r.fork && !r.archived)
}

async function fetchUserOrgs(): Promise<string[]> {
  const orgs = await fetchPaginated<{ login: string }>(
    `${GITHUB_API}/users/${GITHUB_USERNAME}/orgs`,
    'Orgs'
  )
  return orgs.map((o) => o.login)
}

async function fetchOrgRepoList(org: string): Promise<Repository[]> {
  const repos = await fetchPaginated<Repository>(
    `${GITHUB_API}/orgs/${org}/repos?sort=stars&direction=desc`,
    `Org repos (${org})`
  )
  return repos.filter((r) => !r.fork && !r.archived)
}

async function fetchOrgRepo(fullName: string): Promise<Repository> {
  const res = await fetch(`${GITHUB_API}/repos/${fullName}`, {
    headers: headers(),
    ...REVALIDATE,
  })
  if (!res.ok) throw new Error(`Org repo fetch failed: ${res.status} for ${fullName}`)
  return res.json()
}

async function fetchContributions(): Promise<ContributionData> {
  const token = process.env.GITHUB_TOKEN
  if (!token) throw new Error('GITHUB_TOKEN required for contributions query')

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                weekday
              }
            }
          }
        }
      }
    }
  `

  const res = await fetch(GITHUB_GRAPHQL, {
    method: 'POST',
    headers: { ...headers(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { username: GITHUB_USERNAME } }),
    ...REVALIDATE,
  })

  if (!res.ok) throw new Error(`GraphQL fetch failed: ${res.status}`)
  const json = await res.json()

  if (json.errors) throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`)

  return json.data.user.contributionsCollection.contributionCalendar
}

// --- Pure computation ---

export function computeContributionStats(calendar: ContributionData): ContributionStats {
  const days = calendar.weeks.flatMap((w) => w.contributionDays)
  const activeDays = days.filter((d) => d.contributionCount > 0).length
  const maxDay = Math.max(...days.map((d) => d.contributionCount), 0)

  let longestStreak = 0
  let currentStreak = 0
  let streak = 0

  for (const day of days) {
    if (day.contributionCount > 0) {
      streak++
      longestStreak = Math.max(longestStreak, streak)
    } else {
      streak = 0
    }
  }

  // Current streak: count backwards from the most recent day
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i]!.contributionCount > 0) {
      currentStreak++
    } else {
      break
    }
  }

  return {
    totalContributions: calendar.totalContributions,
    activeDays,
    totalDays: days.length,
    maxDay,
    longestStreak,
    currentStreak,
    averagePerActiveDay:
      activeDays > 0 ? Math.round((calendar.totalContributions / activeDays) * 10) / 10 : 0,
  }
}

export function computeLanguages(repos: Repository[]): LanguageBreakdown[] {
  const counts = new Map<string, number>()

  for (const repo of repos) {
    if (repo.language) {
      counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1)
    }
  }

  const total = [...counts.values()].reduce((a, b) => a + b, 0)

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / total) * 1000) / 10,
      color: LANGUAGE_COLORS[name] ?? '#8b8b8b',
    }))
}

export function scoreRepository(repo: Repository, now: Date = new Date()): number {
  const starScore = Math.log2(repo.stargazers_count + 1)
  const forkScore = Math.log2(repo.forks_count + 1) * 2
  const pushedMs = new Date(repo.pushed_at).getTime()
  const daysSincePush = Number.isNaN(pushedMs)
    ? 365
    : Math.max(0, (now.getTime() - pushedMs) / (1000 * 60 * 60 * 24))
  const recencyScore = Math.max(0, 10 - daysSincePush / 30)
  const boost = REPO_BOOSTS[repo.name] ?? 1
  return (starScore + forkScore + recencyScore) * boost
}

export function weightedRandomSelect(
  repos: Repository[],
  count: number,
  now: Date = new Date()
): Repository[] {
  if (repos.length <= count) return repos
  return repos
    .map((repo) => ({ repo, key: Math.random() * scoreRepository(repo, now) }))
    .sort((a, b) => b.key - a.key)
    .slice(0, count)
    .map((entry) => entry.repo)
}

// --- Recent activity ---

const SUPPORTED_EVENTS = new Set([
  'PushEvent',
  'PullRequestEvent',
  'PullRequestReviewEvent',
  'PullRequestReviewCommentEvent',
  'IssueCommentEvent',
  'IssuesEvent',
  'CreateEvent',
])

function mapEvent(e: GitHubEvent): ActivityEvent[] {
  const isPrivate = !e.public
  const org = e.repo.name.split('/')[0] ?? 'private'
  const repo = isPrivate ? org : e.repo.name
  const repoUrl = isPrivate ? '' : `https://github.com/${e.repo.name}`
  const base = { repo, repoUrl, isPrivate, timestamp: e.created_at }

  switch (e.type) {
    case 'PushEvent': {
      if (e.payload.commits && e.payload.commits.length > 0) {
        return e.payload.commits
          .filter((c) => c.distinct)
          .map((c) => ({
            ...base,
            kind: 'push' as const,
            sha: c.sha.slice(0, 7),
            message: c.message.split('\n')[0]!,
          }))
      }
      return [{ ...base, kind: 'push', message: 'Pushed commits' }]
    }
    case 'PullRequestEvent': {
      const action = e.payload.action
      const title = isPrivate ? 'a pull request' : (e.payload.pull_request?.title ?? 'Pull request')
      const url = isPrivate ? undefined : (e.payload.pull_request?.html_url ?? undefined)
      if (action === 'merged' || (action === 'closed' && e.payload.pull_request?.merged)) {
        return [{ ...base, kind: 'pr_merged', message: `Merged ${title}`, url }]
      }
      if (action === 'opened') {
        return [{ ...base, kind: 'pr_opened', message: `Opened ${title}`, url }]
      }
      if (action === 'closed') {
        return [{ ...base, kind: 'pr_closed', message: `Closed ${title}`, url }]
      }
      return []
    }
    case 'PullRequestReviewEvent': {
      const state = e.payload.review?.state
      const label =
        state === 'approved'
          ? 'Approved'
          : state === 'changes_requested'
            ? 'Requested changes on'
            : 'Reviewed'
      const prRef = isPrivate
        ? `PR #${e.payload.pull_request?.title ?? ''}`.replace(/PR #$/, 'a PR')
        : (e.payload.pull_request?.title ?? 'a pull request')
      const url = isPrivate ? undefined : (e.payload.review?.html_url ?? undefined)
      return [{ ...base, kind: 'review', message: `${label} ${prRef}`, url }]
    }
    case 'PullRequestReviewCommentEvent': {
      const prRef = isPrivate ? 'a PR' : (e.payload.pull_request?.title ?? 'a pull request')
      const url = isPrivate ? undefined : (e.payload.comment?.html_url ?? undefined)
      return [{ ...base, kind: 'comment', message: `Commented on ${prRef}`, url }]
    }
    case 'IssueCommentEvent': {
      const issueRef = isPrivate ? 'an issue' : (e.payload.issue?.title ?? 'an issue')
      const url = isPrivate ? undefined : (e.payload.comment?.html_url ?? undefined)
      return [{ ...base, kind: 'comment', message: `Commented on ${issueRef}`, url }]
    }
    case 'IssuesEvent': {
      const action = e.payload.action
      if (action !== 'opened' && action !== 'closed') return []
      const title = isPrivate ? 'an issue' : (e.payload.issue?.title ?? 'an issue')
      const url = isPrivate ? undefined : (e.payload.issue?.html_url ?? undefined)
      const kind = action === 'opened' ? ('issue_opened' as const) : ('issue_closed' as const)
      return [
        { ...base, kind, message: `${action === 'opened' ? 'Opened' : 'Closed'} ${title}`, url },
      ]
    }
    case 'CreateEvent': {
      if (e.payload.ref_type !== 'branch') return []
      const ref = isPrivate ? 'a branch' : (e.payload.ref ?? 'a branch')
      return [{ ...base, kind: 'branch_created', message: `Created ${ref}` }]
    }
    default:
      return []
  }
}

async function fetchRecentActivity(): Promise<RecentActivity> {
  const rawEvents = await fetchPaginated<GitHubEvent>(
    `${GITHUB_API}/users/${GITHUB_USERNAME}/events`,
    'Events',
    3
  )

  const activity = rawEvents.filter((e) => SUPPORTED_EVENTS.has(e.type)).flatMap(mapEvent)

  const grouped = new Map<string, ActivityEvent[]>()
  for (const event of activity) {
    const date = event.timestamp.slice(0, 10)
    const group = grouped.get(date)
    if (group) group.push(event)
    else grouped.set(date, [event])
  }

  const groups: ActivityGroup[] = [...grouped.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([date, events]) => ({
      date,
      label: new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      }),
      events,
    }))

  return { groups, totalEvents: activity.length }
}

// --- Orchestrator ---

const FALLBACK_PROFILE: GitHubProfile = {
  login: GITHUB_USERNAME,
  name: 'Kelly Mears',
  bio: '',
  public_repos: 0,
  public_gists: 0,
  followers: 0,
  following: 0,
  created_at: '2013-01-01T00:00:00Z',
  avatar_url: '',
  html_url: `https://github.com/${GITHUB_USERNAME}`,
}

const FALLBACK_CONTRIBUTIONS: ContributionData = {
  totalContributions: 0,
  weeks: [],
}

const FALLBACK_ACTIVITY: RecentActivity = {
  groups: [],
  totalEvents: 0,
}

export async function fetchAllGitHubData(): Promise<GitHubPageData> {
  const [profile, userRepos, contributions, recentActivity, userOrgs, ...featuredRepos] =
    await Promise.all([
      safeFetch(fetchProfile, FALLBACK_PROFILE),
      safeFetch(fetchUserRepos, []),
      safeFetch(fetchContributions, FALLBACK_CONTRIBUTIONS),
      safeFetch(fetchRecentActivity, FALLBACK_ACTIVITY),
      safeFetch(fetchUserOrgs, []),
      ...FEATURED_REPOS.map((name) => safeFetch(() => fetchOrgRepo(name), null)),
    ])

  const orgRepoArrays = await Promise.all(
    userOrgs.map((org) => safeFetch(() => fetchOrgRepoList(org), []))
  )

  const featured: FeaturedRepository[] = (featuredRepos as (Repository | null)[])
    .filter((r): r is Repository => r !== null)
    .map((repo) => ({
      ...repo,
      ...FEATURED_CONFIG[repo.full_name]!,
    }))

  const contributionStats = computeContributionStats(contributions)
  const allRepos = [...userRepos, ...featured]
  const languages = computeLanguages(allRepos)

  const featuredNames = new Set(FEATURED_REPOS)
  const seen = new Set<string>()
  const eligible: Repository[] = []

  for (const repo of [...userRepos, ...orgRepoArrays.flat()]) {
    if (seen.has(repo.full_name)) continue
    seen.add(repo.full_name)
    if (featuredNames.has(repo.full_name)) continue
    if (EXCLUDED_ORGS.has(repo.owner.login)) continue
    if ((REPO_BOOSTS[repo.name] ?? 1) <= 0) continue
    eligible.push(repo)
  }

  const selected = weightedRandomSelect(eligible, 27)
  const repos = selected.slice(0, 9)
  const repoPool = selected.slice(9)

  return {
    profile,
    featured,
    repos,
    repoPool,
    contributions,
    contributionStats,
    languages,
    recentActivity,
  }
}
