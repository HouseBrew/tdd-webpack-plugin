import de from 'directory-exists'
import relative from 'relative'
import {getParentDirectories} from './utils'

interface ITDDOptions {
  base: string,
  baseUrl: string,
  testFolder: string,
  matchSpecs: string
}

abstract class TestDrivenDevPlugin {
  public options: ITDDOptions = {
    base: '/',
    testFolder: 'test',
    matchSpecs: '*.spec.js',
    baseUrl: 'http://localhost:8080'
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
  public apply(compiler): void {

    compiler.hooks.emit.tap('CypressWebpackPlugin', (compilation) => {
      const changedFiles = this.getChangedFiles(compilation.fileTimestamps)
      const specs = this.getSpecs(changedFiles)
      this.test(specs)
      this.prevTimestamps = compilation.fileTimestamps
    })
  }

  public *getChangedFiles(map: Map<string, number>): IterableIterator<string> {
    for (const [key, value] of map.entries()) {
      if ( (this.prevTimestamps.get(key) || this.startTime) < value) {
        yield key
      }
    }
  }

  public *getSpecs(changedFiles: IterableIterator<string>): IterableIterator<string> {
    for (const path of changedFiles) {
      for (const di of getParentDirectories(path, this.options.base)) {
        const testFolderPath: string = `${di}/${this.options.testFolder}`
        const testFolderExist: boolean = de.sync(testFolderPath)
        if (testFolderExist) {
          const match = `${testFolderPath}/${this.options.matchSpecs}`
          yield relative(this.options.base, match)
          break // only test the nearest parent's test folder
        }
      }
    }
  }

  public abstract test(specs: IterableIterator<string>): void

}

export default TestDrivenDevPlugin

