import domReady from '@roots/bud-client/dom-ready'
import "./app.css";

domReady(async () => {  
  const username = `hello`
  const domain = `kellymears`
  const extension = `me`
  
  const email = `${username}@${domain}.${extension}`
  
  const target = document.querySelector(`.obfuscate`);
  target.innerHTML = `<a href="mailto:${email}">E-mail</a>`    
})

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept(console.error)
}