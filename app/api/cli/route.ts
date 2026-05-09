import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'
import siteMetadata from '@/data/siteMetadata'
import { experience } from '@/data/experience'
import { stats } from '@/data/stats'
import { getAllPosts, sortPosts } from '@/lib/content'
import { getCyclingPageData } from '@/lib/cycling'
import { stripJsx } from '@/lib/strip-jsx'

export const revalidate = 3600

export async function GET() {
  try {
    // GitHub data (cached JSON from daily sync)
    const gh = JSON.parse(
      readFileSync(join(process.cwd(), 'public/static/data/github.json'), 'utf-8')
    )

    const ghProfile = {
      login: gh.profile.login,
      publicRepos: gh.profile.public_repos,
      followers: gh.profile.followers,
      createdAt: gh.profile.created_at,
    }

    const recentActivity = gh.recentActivity.groups
      .slice(0, 10)
      .map((g: any) => ({
        date: g.date,
        label: g.label,
        events: g.events.map((e: any) => ({
          kind: e.kind,
          repo: e.repo,
          message: e.message,
        })),
      }))
      .filter((g: any) => g.events.length > 0)

    const languages = gh.languages.map((l: any) => ({
      name: l.name,
      percentage: l.percentage,
      color: l.color,
    }))

    // Cycling data (computed from RunGap-imported activities)
    const { rideStats, ytdStats, rideCategories, recentRides } = getCyclingPageData()

    const cycling = {
      ...rideStats,
      ytd: ytdStats,
      categories: rideCategories.map((c) => ({
        name: c.name,
        count: c.count,
        percentage: c.percentage,
        color: c.color,
      })),
      recentRides: recentRides.slice(0, 5).map((r) => ({
        name: r.name,
        date: r.date,
        distance: r.distance,
        duration: r.duration,
        elevation: r.elevation,
        speed: r.speed,
        sportType: r.sportType,
      })),
    }

    // Author data
    const authorMdx = readFileSync(join(process.cwd(), 'data/authors/default.mdx'), 'utf-8')
    const { data: authorFm } = matter(authorMdx)

    const profile = {
      name: authorFm.name,
      login: ghProfile.login,
      occupation: authorFm.occupation,
      company: authorFm.company,
      companyUrl: authorFm.companyUrl,
      location: 'Winston-Salem, NC',
      bio: '15+ years building infrastructure for mission-driven organizations. Open source maintainer, nonprofit technologist, and full-stack engineer making the web work for people who are working to change it.',
      links: {
        site: siteMetadata.siteUrl,
        github: siteMetadata.github,
        linkedin: siteMetadata.linkedin,
        x: authorFm.twitter,
        email: siteMetadata.email,
      },
    }

    const github = {
      repos: ghProfile.publicRepos,
      followers: ghProfile.followers,
      contributions: gh.contributionStats.totalContributions,
      activeDays: gh.contributionStats.activeDays,
      longestStreak: gh.contributionStats.longestStreak,
      currentStreak: gh.contributionStats.currentStreak,
      maxDay: gh.contributionStats.maxDay,
      averagePerActiveDay: gh.contributionStats.averagePerActiveDay,
      memberSince: new Date(ghProfile.createdAt).getFullYear(),
      recentActivity,
      languages,
    }

    // Blog posts
    const allPosts = await getAllPosts()
    const writing = sortPosts(allPosts.filter((p) => p.draft !== true)).map((post) => ({
      title: post.title,
      date: String(post.date),
      tags: post.tags || [],
      summary: post.summary || '',
      body: stripJsx(post.body),
    }))

    // Experience + stats (strip to CLI shape)
    const experienceData = experience.map((e) => ({
      role: e.role,
      company: e.company,
      url: e.url,
      period: e.period,
      summary: e.summary,
      tags: e.tags,
      type: e.type,
    }))

    const payload = {
      profile,
      github,
      cycling,
      writing,
      experience: experienceData,
      stats,
    }

    return Response.json(payload, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('[api/cli] Failed to assemble CLI data:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
