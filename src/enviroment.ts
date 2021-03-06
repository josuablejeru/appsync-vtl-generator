import {CLIEnvironmentProvider} from 'amplify-cli-core'

export interface CLIContext {
  getEnvInfo: () => any;
}

type EnvInfoProvider = Pick<CLIContext, 'getEnvInfo'>

export class CLIcontextProvider implements CLIEnvironmentProvider {
  constructor(private context: EnvInfoProvider) {
    if (!context) {
      throw new Error('CLIContextEnvironmentProvider expects a context instance')
    }
  }

  getCurrentEnvName(): string {
    try {
      const envInfo = this.context.getEnvInfo()

      return envInfo ? envInfo.envName ?? '' : ''
    } catch {
      // getEnvInfo throws if CLI runs in an uninitialized environment

      return ''
    }
  }
}
