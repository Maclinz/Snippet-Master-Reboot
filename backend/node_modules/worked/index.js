#!/usr/bin/env node
const fs = require('fs')
const { spawn } = require('child_process')
const moment = require('moment')
const app = require('commander')
const mkdirp = require('mkdirp')

const repoPath = process.env.HOME + '/.worked'
fs.accessSync(repoPath)

app
  .version(require('./package.json').version)
  .option('-l, --log', 'Edit or append a log file (default mode)')
  .option('-d, --daily', 'Edit or append a daily todo file')
  .option('-c, --custom [name]', 'Edit or append a custom file')
  .option('-n, --filename', 'Don\'t do anything, just output full filename')
  .parse(process.argv)

const mode = app.daily ? 'daily'
  : app.custom ? 'custom'
    : 'log'

let filename
let path
let now

if (app.custom) {
  let customName = app.custom
  path = `${repoPath}/${mode}`
  const filePath = customName.match(/^(.+)\/([^/]+)$/)
  if (filePath) {
    path += '/' + filePath[1]
    customName = filePath[2]
  }
  filename = `${path}/${customName}.md`
} else {
  now = moment(new Date())
  path = `${repoPath}/${mode}/` + now.format('YYYY/MM')
  filename = path + now.format('/DD') + '.md'
}

if (app.filename) {
  console.log(filename)
  process.exit()
}

mkdirp.sync(path)

if (!app.args.length) {
  const editor = process.env.EDITOR || 'vi'
  console.log(`editing file: ${filename}`)
  spawn(editor, [filename], { stdio: 'inherit' })
} else {
  let message = '- '
  if (mode === 'log') {
    message += now.format('YYYY-MM-DD[T]HH:mm:ss[, ]')
  }
  message += app.args.join(' ') + '\n'
  fs.appendFileSync(filename, message)
  console.log(`appended to: ${filename}`)
}
