import { bud } from "@roots/bud";

bud.webpackConfig(config => {
  config.module.rules.push({
    test: /\.hbs$/,
    loader: "handlebars-loader",
  })

  return config
})

bud
  .entry("app", "@src/app.ts")
  .html({
    template: "./src/index.hbs",
  })
  .watch("./src/index.hbs");
