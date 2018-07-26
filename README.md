# tdd-webpack-plugin #

Introduction
============
This plugin assume your project is built on the following structure.

> - yourProjectRoot/
>   - src/
>     - index.js
>     - modules/
>       - someModule/
>         - test/
>         - components/
>           - index.js
>   - test

It will help you, once changed src/modules/someModule/index.js, runs all the tests under the same parent tree, i.e. src/modules/someModule/test


Installation
============
> $ npm install --save-dev tdd-webpack-plugin

In webpack config file, extend the TestDrivenDevPlugin class, provide a test function.

The test function is call when webpack emit assets (https://webpack.js.org/api/compiler-hooks/#emit).

The following is the implementation of tdd webpack plugin integrated with cypress (https://www.cypress.io/)

> webpack.dev.conf.js
> 
> const tdd = require('tdd-webpack-plugin')
> const cypress = require('cypress')
> 
> class CypressTDDPlugin extends tdd.TestDrivenDevPlugin {
>   test(specs) {
>     // specs is an iterator
>     // options accessible through this.options
>     let specString = [...specs].join(',')
>     if (!specString) {
>       specString = `**/${this.options.matchSpecs}`
>     }
>     cypress.run({
>       reporter: 'min',
>       config: {
>         baseUrl: this.options.baseUrl,
>         chromeWebSecurity: false,
>         video: false,
>         modifyObstructiveCode: false
>       },
>       spec: specString
>     })
>   }
> }
>

Under plugins options, add the instance

> plugins: [
>   ........
>   new CypressTDDPlugin({
>     base: resolve('./src'),
>     baseUrl: 'http://localhost:8080',
>     testFolder: 'test',
>     matchSpecs: '*.spec.js'
>   })
> ]


Configuration
=============
<table>
    <tr>
      <th>key</th><th>type</th><th>default</th><th>description</th>
    </tr>
    <tr>
      <td>base</td><td>string</td><td>'/'</td><td>project root directory</td>
      <td>testFolder</td><td>string</td><td>'test'</td><td>test folder</td>
      <td>matchSpecs</td><td>string</td><td>'*.spec.js'</td><td>string to match specs</td>
      <td>baseUrl</td><td>string</td><td>'http://localhost:8080'</td><td>dev server url</td>
    </tr>
</table>


Under the Hood
==============
The plugin hooks webpack's emit event (https://webpack.js.org/api/compiler-hooks/#emit), and tracks the changes of the files currently watched by webpack. For each changed source file, it will then traverse upward and find the first test folder, and run all the specs under that folder.
