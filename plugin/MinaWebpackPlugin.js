const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin')
const MultiEntryPlugin = require('webpack/lib/MultiEntryPlugin')
const path = require('path')
const fs = require('fs')
const replaceExt = require('replace-ext')

function itemToPlugin(context, item, name) {
  if (Array.isArray(item)) {
    return new MultiEntryPlugin(context, item, name)
  }
  return new SingleEntryPlugin(context, item, name)
}

function _inflateEntries(entries = [], dirname, entry) {
  const configFile = replaceExt(entry, '.json')
  const content = fs.readFileSync(configFile, 'utf8')
  const config = JSON.parse(content)

  Array.from(['pages', 'usingComponents']).forEach(key => {
    const items = config[key]
    if (typeof items === 'object') {
      Object.values(items).forEach(item => inflateEntries(entries, dirname, item))
    }
  })
}

function inflateEntries(entries, dirname, entry) {
  entry = path.resolve(dirname, entry)
  if (entry != null && !entries.includes(entry)) {
    entries.push(entry)
    _inflateEntries(entries, path.dirname(entry), entry)
  }
}

class MinaWebpackPlugin {
  constructor() {
    this.entries = []
  }

  apply(compiler) {
    const { context, entry } = compiler.options
    inflateEntries(this.entries, context, entry)
    compiler.hooks.entryOption.tap('MinaWebpackPlugin', () => {
      this.entries
        .map(item => replaceExt(item, '.js'))
        .map(item => path.relative(context, item))
        .forEach(item => itemToPlugin(context, './' + item, replaceExt(item, '')).apply(compiler))
      return true
    })
  }
}

module.exports = MinaWebpackPlugin





