export class CypressWebpackPlugin {
  public options: {}
  public constructor(options) {
    this.options = options
  }
  // Define the `apply` method
  public apply(compiler) {
    // Specify the event hook to attach to
    compiler.hooks.compile.tapAsync(
      'done',
      (compilation, callback) => {
        console.log('compilation is done!')
        console.log('Here’s the `compilation` object which represents a single build of assets:', compilation)

        // Manipulate the build using the plugin API provided by webpack
        // compilation.addModule(/* ... */);

        callback()
      }
    )
  }
}
