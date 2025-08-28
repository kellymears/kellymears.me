const postbuild = async () => await import('./rss.mjs').then(async (mod) => await mod.default())

export default postbuild()
