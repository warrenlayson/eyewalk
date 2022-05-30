const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  ...require('config/jest-next'),
  rootDir: '.',
}

module.exports = createJestConfig(customJestConfig)
