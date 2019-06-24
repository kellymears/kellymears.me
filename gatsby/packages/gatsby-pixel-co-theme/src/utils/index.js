import config from "../../config"

export const createLocalLink = url => {
  return (`#` === url) ? null : (
    url.replace(config.wordPressUrl, ``)
  )
}
