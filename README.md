appsync-vtl-generator
=====================

Generate VTL files (appsync resolvers) for DynamoDB from graphql schemas

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/appsync-vtl-generator.svg)](https://npmjs.org/package/appsync-vtl-generator)
[![Downloads/week](https://img.shields.io/npm/dw/appsync-vtl-generator.svg)](https://npmjs.org/package/appsync-vtl-generator)
[![License](https://img.shields.io/npm/l/appsync-vtl-generator.svg)](https://github.com/josuablejeru/appsync-vtl-generator/blob/master/package.json)

## Examples
Please visit my [Coffe Recipe Api](https://github.com/josuablejeru/coffee-recipe-api) to see how `appsync-vtl-generator` can be used in your project.

## Usage
```sh-session
$ npm install -g appsync-vtl-generator
$ appsync-vtl-generator [schema.graphql] [output dir]
$ appsync-vtl-generator (-v|--version|version)
appsync-vtl-generator/0.1.0 darwin-x64 node-v16.4.2
$ appsync-vtl-generator --help 
USAGE
  $ appsync-vtl-generator [schema.graphql] [output dir]
...
```

## Supported features:
[x] DynamoDB vtl mappers (keys, relationships)
[ ] auth rules with Cognito

## ✌️ Get in touch with me
<a href="https://into-the-code.com" target="_blank"><img alt="Personal Website" src="https://img.shields.io/badge/Personal%20Website-%2312100E.svg?&style=for-the-badge&logoColor=white" /></a>
<a href="https://twitter.com/josuablejeru" target="_blank"><img alt="Twitter" src="https://img.shields.io/badge/twitter-%231DA1F2.svg?&style=for-the-badge&logo=twitter&logoColor=white" /></a>
<a href="https://www.linkedin.com/in/josua-blejeru-a2871a164" target="_blank"><img alt="LinkedIn" src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" /></a>
[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/josuablejeru)

## 📝 License

Distributed under the MIT License. See LICENSE for more information.

## Acknowledgements
- https://github.com/aws-amplify/amplify-cli
