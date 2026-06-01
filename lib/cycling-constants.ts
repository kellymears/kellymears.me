// Client-safe constants — no Node.js dependencies
// Re-exported from lib/cycling.ts for server components

// The dashboard renders one of two activity groups at a time. Defined here
// (not in lib/cycling.ts) so client components can import the type and copy
// without pulling in the fs-backed data layer.
export type ActivityGroup = 'cycling' | 'foot'

export interface GroupCopy {
  noun: string // singular, capitalized — 'Ride' | 'Activity'
  nounPlural: string // 'Rides' | 'Activities'
  eyebrow: string // hero kicker — 'Cycling' | 'On Foot'
  title: string // hero heading — 'Rides & Stats' | 'Walks & Runs'
  lead: string // hero lead sentence
}

// Single source of truth for which sportTypes belong to each group. Used by the
// server data layer (lib/cycling.ts) and by client components like the Atlas
// that need to filter without importing the fs-backed layer.
export const GROUP_SPORT_TYPES: Record<ActivityGroup, string[]> = {
  cycling: ['Ride', 'GravelRide', 'MountainBikeRide', 'VirtualRide', 'EBikeRide'],
  foot: ['Walk', 'Run', 'Hike'],
}

export const GROUP_COPY: Record<ActivityGroup, GroupCopy> = {
  cycling: {
    noun: 'Ride',
    nounPlural: 'Rides',
    eyebrow: 'Cycling',
    title: 'Rides & Stats',
    lead: 'Road, gravel, mountain, and virtual rides.',
  },
  foot: {
    noun: 'Activity',
    nounPlural: 'Activities',
    eyebrow: 'On Foot',
    title: 'Walks & Runs',
    lead: 'Walking, running, and hiking — keeping moving while the wrist heals.',
  },
}

export const TERRAIN_COLORS: Record<string, string> = {
  road: '#64748b',
  pavedPath: '#c2703e',
  unpaved: '#5b8a72',
}

export const TERRAIN_LABELS: Record<string, string> = {
  road: 'Road',
  pavedPath: 'Paved Path',
  unpaved: 'Unpaved',
}

export const RIDE_TYPE_LABELS: Record<string, string> = {
  Ride: 'Road',
  GravelRide: 'Gravel',
  MountainBikeRide: 'Mountain',
  VirtualRide: 'Virtual',
  EBikeRide: 'E-Bike',
  Walk: 'Walk',
  Run: 'Run',
  Hike: 'Hike',
}

export const RIDE_TYPE_SHORT_LABELS: Record<string, string> = {
  Ride: 'Road',
  GravelRide: 'Gravel',
  MountainBikeRide: 'MTB',
  VirtualRide: 'Virtual',
  EBikeRide: 'E-Bike',
  Walk: 'Walk',
  Run: 'Run',
  Hike: 'Hike',
}

export const RIDE_TYPE_ACCENT: Record<string, string> = {
  GravelRide: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  MountainBikeRide: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  VirtualRide: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  EBikeRide: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  Walk: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
  Run: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  Hike: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
}

export const RIDE_TYPE_COLORS: Record<string, string> = {
  Ride: '#3178c6',
  GravelRide: '#8b6914',
  MountainBikeRide: '#2d8b46',
  VirtualRide: '#9333ea',
  EBikeRide: '#06b6d4',
  Walk: '#0d9488',
  Run: '#ea580c',
  Hike: '#16a34a',
}

export const SOURCE_LABELS: Record<string, string> = {
  sv: 'Strava',
  hk: 'Apple Health',
  zw: 'Zwift',
  fi: 'Fitbit',
  gm: 'Garmin',
}
