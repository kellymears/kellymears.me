import './app.css'

const mt = [`hello`, 0x40, `kellymears`, 0x2e, `me`]
  .map(i => (typeof i === `string` ? i : String.fromCharCode(i)))
  .join(``)

document.querySelector(`.obfuscate`).innerHTML =
  `<a href=mailto:${mt}>E-mail</a>`
