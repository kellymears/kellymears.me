![kellymears.me](/public/static/images/og-waves.png)

# kellymears.me

Personal site for [Kelly Mears](https://kellymears.me) — software engineer building infrastructure for mission-driven organizations.

Built with Next.js 16, Tailwind CSS v4, and MDX. Deployed on Netlify via GitHub Actions.

## Stack

| Layer           | Tech                                                                                               |
| --------------- | -------------------------------------------------------------------------------------------------- |
| Framework       | [Next.js 16](https://nextjs.org) — App Router, Turbopack, React Server Components                  |
| Styling         | [Tailwind CSS v4](https://tailwindcss.com) — OKLCH color space, `@theme` tokens                    |
| Content         | [MDX](https://mdxjs.com) via [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) (RSC) |
| Font            | [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (300–700)                         |
| Deploy          | [Netlify](https://netlify.com) via GitHub Actions                                                  |
| Package manager | Yarn 3.6.1 (PnP)                                                                                   |

## Development

```bash
yarn dev          # Start dev server (Turbopack)
yarn build        # Production build
yarn lint         # ESLint with auto-fix
yarn format       # Prettier (write mode)
```

## License

[MIT](LICENSE) — originally forked from [tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog).
