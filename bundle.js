const Bundler = require('parcel-bundler')
const path = require('path')

const entry = path.join(__dirname, 'src', 'index.ts')

const options = {
  outDir: './dist',
  outFile: 'index.js',
  target: 'node',
  watch: true
}

const bundler = new Bundler(entry, options)

bundler.bundle()