import {Command, flags} from '@oclif/command'
import * as transform from './transformer'
import * as fs from 'fs'
import * as path from 'path'
import * as mkdirp from 'mkdirp'
import {FeatureFlags} from 'amplify-cli-core'
import {CLIcontextProvider} from './enviroment'

class AppsyncVltGenerator extends Command {
  static description = `
  Generate VTL files from a GraphQL schema.

  Example usage: appsync-vtl-generator schema.graphql ./mappers
  `

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
  }

  static args = [
    {name: 'input'},
    {name: 'output'},
  ]

  async run() {
    const {args} = this.parse(AppsyncVltGenerator)

    /**
     * This method initializes the FeatureFlags needed for the Transformers.
     * Amplify uses this system to toggle features on and off.
     * appsync-vtl-generator uses the same config as amplify.
     */
    await this.initializeFlag()

    const transfomer = transform.getTransformer()
    const SCHEMA = fs.readFileSync(args.input).toString()

    // create the output folder else `fs.writeFileSync` will trow an error
    this.createFolders(path.join(__dirname, args.output))

    try {
      const out = transfomer.transform(SCHEMA)
      Object.keys(out.resolvers).forEach(key => {
        const vtlContend = out.resolvers[key]
        const fileName = path.resolve(args.output, key)
        fs.writeFileSync(fileName, vtlContend)
      })
    } catch (error) {
      this.log(error)
    }
  }

  private async initializeFlag() {
    const useNewDefaults = true
    const contextEnvironmentProvider = new CLIcontextProvider({
      getEnvInfo: () => ({envName: 'dev'}), // dummy Value needed for FeatureFlags
    })
    await FeatureFlags.initialize(contextEnvironmentProvider, useNewDefaults)
  }

  private async createFolders(path: string) {
    await mkdirp(path)
  }
}

export = AppsyncVltGenerator
