export interface RideBounds {
  minLat: number
  maxLat: number
  minLng: number
  maxLng: number
}

export interface RideRoute {
  id: string | number
  sportType: string
  date: string
  coordinates: [number, number][] // [lat, lng]
}

export interface RidesData {
  generatedAt: string
  totalRides: number
  bounds: RideBounds
  rides: RideRoute[]
}
