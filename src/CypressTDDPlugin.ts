// @ts-ignore
import cypress from 'cypress'
import TestDrivenDevPlugin from './TestDrivenDevPlugin'

class CypressTDDPlugin extends TestDrivenDevPlugin {

  public test(specs: IterableIterator<string>): void {
    // console.log(this.options)
    let specString = [...specs].join(',')
    if (!specString) {
      specString = `**/${this.options.matchSpecs}`
    }
    cypress.run({
      reporter: 'min',
      config: {
        baseUrl: this.options.baseUrl,
        chromeWebSecurity: false,
        video: false,
        modifyObstructiveCode: false
      },
      spec: specString
    })
  }

}

export default CypressTDDPlugin
