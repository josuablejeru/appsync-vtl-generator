import {Command, flags} from '@oclif/command'
import * as transform from './transformer'
import * as fs from 'fs'
import * as path from 'path'
import mkdirp from 'mkdirp'
import {FeatureFlags} from 'amplify-cli-core'
import {CLIcontextProvider} from './enviroment'
import {StringMap} from 'graphql-transformer-core/lib/DeploymentResources'

class AppsyncVtlGenerator extends Command {
  static description = `
  Generate VTL files and a graphql schema with the corresponding Query, Mutation and subscriptions.

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

  // command entry point
  async run() {
    const {args} = this.parse(AppsyncVtlGenerator)

    /**
     * This method initializes the FeatureFlags needed for the Transformers.
     * Amplify uses this system to toggle features on and off.
     * appsync-vtl-generator uses the same config as amplify.
     */
    await this.initializeFlag()

    const transfomer = transform.getTransformer()
    const SCHEMA = fs.readFileSync(args.input).toString()

    const destinationFolder = args.output

    // create the output folder else `fs.writeFileSync` will trow an error
    await this.createFolders(destinationFolder)

    try {
      const out = transfomer.transform(SCHEMA)

      this.writeSchema(out.schema, destinationFolder)
      this.writeResolvers(out.resolvers, destinationFolder)
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

  private writeSchema(schema: string, dest: string) {
    fs.writeFileSync(path.join(dest, 'schema.graphql'), schema)
  }

  private writeResolvers(resolvers: StringMap, _path: string) {
    Object.keys(resolvers).forEach(key => {
      const vtlContend = resolvers[key]
      const fileName = path.resolve(_path, key)
      fs.writeFileSync(fileName, vtlContend)
    })
  }
}

export = AppsyncVtlGenerator
