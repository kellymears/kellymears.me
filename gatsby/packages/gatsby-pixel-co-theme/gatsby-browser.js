const hljs = require('highlight.js/lib/highlight')
const javascript = require('highlight.js/lib/languages/javascript')
const php = require('highlight.js/lib/languages/php')
const bash = require('highlight.js/lib/languages/bash')

require('highlight.js/styles/monokai-sublime.css')

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('php', php)
hljs.registerLanguage('bash', bash)

exports.onClientEntry = () => window.onload = () => {
  document.querySelectorAll('pre.wp-block-code code').forEach(block =>
    hljs.highlightBlock(block)
  )
}
