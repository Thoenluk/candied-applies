# Cataclysm Almanac

## What is this?

A "simple" web page to display the data in my personal passion project which aims to catalogue all crafting
resources in World of Warcraft's expansion ~~Wrath of the Lich King~~ Cataclysm. Also to learn Svelte and refresh my knowledge
of Typescript, the frontend, and everything.

## How to run?

See package.json for available npm commands.

Make sure to `npm install` for dependencies first of all.

`npm run dev` will deploy the app in dev mode with hot reloading on localhost:3000.

`npm run parse` converts the data from `dataset.tsv` into `public/dataset.json`, which serves as the source of
data displayed by the app.

`npm run build` compiles the source code into a minified dist folder for deployment.

`npm run preview` deploys the dist locally on localhost:4173.

`npm run release` conveniently runs `parse`, `build`, and `preview` to make an up-to-date release dist.