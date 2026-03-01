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

export interface GitHubPageData {
  profile: GitHubProfile
  featured: FeaturedRepository[]
  repos: Repository[]
  contributions: ContributionData
  contributionStats: ContributionStats
  languages: LanguageBreakdown[]
}

// --- Featured project config ---

const FEATURED_CONFIG: Record<string, { role: string; highlight: string }> = {
  'roots/bud': {
    role: 'Lead Developer',
    highlight:
      '854+ PRs merged. The official build system for the Roots WordPress ecosystem — webpack, SWC, esbuild, PostCSS, and Tailwind out of the box.',
  },
  'roots/sage': {
    role: 'Core Contributor',
    highlight:
      'The most popular WordPress starter theme. Contributed the bud.js build system integration and modern development workflow.',
  },
}

const FEATURED_REPOS = Object.keys(FEATURED_CONFIG)

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

async function fetchUserRepos(): Promise<Repository[]> {
  const allRepos: Repository[] = []
  let page = 1

  while (true) {
    const res = await fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=stars&direction=desc&page=${page}`,
      { headers: headers(), ...REVALIDATE }
    )
    if (!res.ok) throw new Error(`Repos fetch failed: ${res.status}`)
    const repos: Repository[] = await res.json()
    if (repos.length === 0) break
    allRepos.push(...repos)
    if (repos.length < 100) break
    page++
  }

  return allRepos.filter((r) => !r.fork && !r.archived)
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

export async function fetchAllGitHubData(): Promise<GitHubPageData> {
  const [profile, userRepos, contributions, ...orgRepos] = await Promise.all([
    safeFetch(fetchProfile, FALLBACK_PROFILE),
    safeFetch(fetchUserRepos, []),
    safeFetch(fetchContributions, FALLBACK_CONTRIBUTIONS),
    ...FEATURED_REPOS.map((name) => safeFetch(() => fetchOrgRepo(name), null)),
  ])

  const featured: FeaturedRepository[] = (orgRepos as (Repository | null)[])
    .filter((r): r is Repository => r !== null)
    .map((repo) => ({
      ...repo,
      ...FEATURED_CONFIG[repo.full_name]!,
    }))

  const contributionStats = computeContributionStats(contributions)
  const allRepos = [...userRepos, ...featured]
  const languages = computeLanguages(allRepos)

  const repos = userRepos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 9)

  return { profile, featured, repos, contributions, contributionStats, languages }
}
