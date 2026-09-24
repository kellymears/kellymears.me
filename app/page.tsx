import { getCyclingPageData, type RecentRide } from '@/lib/cycling'
import { allCoreContent, getAllPosts, sortPosts } from '@/lib/content'
import { getGraph, getHubs, getKnowledgeStats } from '@/lib/knowledge'
import { getRouteField } from '@/lib/route-field'
import Main from './Main'

/** Most recent ride per route name — six loops of the same commute say less. */
function distinctRoutes(rides: RecentRide[], limit: number) {
  const seen = new Set<string>()
  return rides.filter((r) => r.routePath && !seen.has(r.name) && seen.add(r.name)).slice(0, limit)
}

const Page = async () => {
  const posts = allCoreContent(sortPosts(await getAllPosts()))
  const cycling = getCyclingPageData()
  const stats = getKnowledgeStats()
  const field = getRouteField('cycling')
  const newest = cycling.recentRides.find((r) => r.id === field.recent[0]?.id)

  return (
    <Main
      posts={posts}
      vitals={{
        notes: stats.notes,
        links: stats.links,
        ytdMiles: cycling.ytdStats.miles,
        latestPost: posts[0] && { title: posts[0].title, slug: posts[0].slug },
      }}
      knowledge={{ graph: getGraph(), hubs: getHubs(6), stats }}
      movement={{
        ytd: cycling.ytdStats,
        weeks: cycling.weeklyMileage,
        rides: distinctRoutes(cycling.recentRides, 6),
        field,
        latest: newest && { name: newest.name, date: newest.date },
      }}
    />
  )
}

export default Page
