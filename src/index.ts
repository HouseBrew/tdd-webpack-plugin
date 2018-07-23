import cypress from 'cypress'
import de from 'directory-exists'
import {getParentDirectories} from './utils'

class CypressWebpackPlugin {
  public options: { base: string, testFolder: string, bin: string, cypress: any, matchSpecs: string } = {
    base: '/',
    testFolder: 'test',
    bin: 'node_modules/cypress/bin/cypress',
    cypress: {},
    matchSpecs: '**.spec.js'
  }
  public prevTimestamps: Map<string, number>
  public startTime: number
  public constructor(options) {
    if (typeof options !== 'undefined') {
      this.options = options
    }
    this.startTime = Date.now()
    this.prevTimestamps = new Map()
  }
  // Define the `apply` method
  public apply(compiler) {
    compiler.hooks.emit.tap('CypressWebpackPlugin', (compilation) => {
      const changedFiles: string[] = []
      compilation.fileTimestamps.forEach((value, key) => {
        if ( (this.prevTimestamps.get(key) || this.startTime) < value) {
          changedFiles.push(key)
        }
      })
      this.prevTimestamps = compilation.fileTimestamps

      changedFiles.forEach((path) => {
        const dis = getParentDirectories(path, this.options.base)
        dis.forEach((di) => {
          const testFolderPath: string = `${di}/${this.options.testFolder}`
          const testFolderExist: boolean = de.sync(testFolderPath)
          if (testFolderExist) {

            cypress.run({
              ...this.options.cypress,
              specs: `${testFolderPath}/${this.options.matchSpecs}`
            })
            .then((results) => {
              console.log(results)
            })
            .catch((err) => {
              console.error(err)
            })

          }
        })
      })
    })
  }
}
export {CypressWebpackPlugin}
