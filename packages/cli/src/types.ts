/** Shared types for CLI data — the contract between the API response and CLI consumption. */

export interface Profile {
  name: string
  login: string
  occupation: string
  company: string
  companyUrl: string
  location: string
  bio: string
  links: {
    site: string
    github: string
    linkedin: string
    x: string
    email: string
  }
}

export interface ActivityEvent {
  kind: string
  repo: string
  message: string
}

export interface ActivityGroup {
  date: string
  label: string
  events: ActivityEvent[]
}

export interface Language {
  name: string
  percentage: number
  color: string
}

export interface GithubData {
  repos: number
  followers: number
  contributions: number
  activeDays: number
  longestStreak: number
  currentStreak: number
  maxDay: number
  averagePerActiveDay: number
  memberSince: number
  recentActivity: ActivityGroup[]
  languages: Language[]
}

export interface YtdStats {
  miles: number
  rides: number
  elevation: number
  hours: number
}

export interface RideCategory {
  name: string
  count: number
  percentage: number
  color: string
}

export interface RecentRide {
  name: string
  date: string
  distance: string
  duration: string
  elevation: string
  speed: string
  sportType: string
}

export interface CyclingData {
  totalMiles: number
  totalRides: number
  totalElevation: number
  totalHours: number
  biggestRide: number
  biggestClimb: number
  ytd: YtdStats
  categories: RideCategory[]
  recentRides: RecentRide[]
}

export interface WritingPost {
  title: string
  date: string
  tags: string[]
  summary: string
  body: string
}

export interface ExperienceEntry {
  role: string
  company: string
  url?: string
  period: string
  summary: string
  tags: string[]
  type: string
}

export interface StatEntry {
  label: string
  value: string
  detail?: string
}

export interface CliData {
  profile: Profile
  github: GithubData
  cycling: CyclingData
  writing: WritingPost[]
  experience: ExperienceEntry[]
  stats: StatEntry[]
}
