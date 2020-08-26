# Web Crawler v0

## Goal
- help me to check any info I want to keep updated on internet

## How to use this
- Please create a folder called result on the root folder (program won't detect this).
- I use Node with import and export, so to run -> `index.mjs`

## Tool
- Help to get selector: https://github.com/sputnick-dev/retrieveCssOrXpathSelectorFromTextOrNode
  - use `script/dev_tool_script.js` in dev tool snippet
  - by text `x('text in the page')` or by dom `x($0)` (after use dev tool select a node in page)
  - Don't take the full selector string, take the last 2-3 selector to use in puppeteer

## TODO
- [] test cronjob
- [] add cronjob
- [] think of I want to track on internet
- [] maybe a GUI or CLI tool if I need to let other use?