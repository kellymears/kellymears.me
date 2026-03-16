// Client-safe constants — no Node.js dependencies
// Re-exported from lib/cycling.ts for server components

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
}

export const RIDE_TYPE_SHORT_LABELS: Record<string, string> = {
  Ride: 'Road',
  GravelRide: 'Gravel',
  MountainBikeRide: 'MTB',
  VirtualRide: 'Virtual',
  EBikeRide: 'E-Bike',
}

export const RIDE_TYPE_ACCENT: Record<string, string> = {
  GravelRide: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  MountainBikeRide: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  VirtualRide: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  EBikeRide: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
}

export const RIDE_TYPE_COLORS: Record<string, string> = {
  Ride: '#3178c6',
  GravelRide: '#8b6914',
  MountainBikeRide: '#2d8b46',
  VirtualRide: '#9333ea',
  EBikeRide: '#06b6d4',
}
