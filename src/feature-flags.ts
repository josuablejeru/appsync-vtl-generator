import {FeatureFlagProvider} from 'graphql-transformer-core'
import {FeatureFlags} from 'amplify-cli-core'

export class AppsyncAdapterBase implements FeatureFlagProvider {
  getBoolean(featureName: string, defaultValue?: boolean): boolean {
    return this.getValue<boolean>(featureName, 'boolean', defaultValue || false)
  }

  getString(featureName: string, defaultValue?: string): string {
    return this.getValue<string>(featureName, 'string', defaultValue || '')
  }

  getNumber(featureName: string, defaultValue?: number): number {
    return this.getValue<number>(featureName, 'number', defaultValue || 0)
  }

  getObject(): object {
    // Todo: for future extensibility
    throw new Error('Not implemented')
  }

  protected getValue<T extends string | number | boolean>(featureName: string, type: 'boolean' | 'number' | 'string', defaultValue: T): T {
    const keyName = `graphQLTransformer.${featureName}`
    try {
      switch (type) {
      case 'boolean':
        return FeatureFlags.getBoolean(keyName) as T
      case 'number':
        return FeatureFlags.getNumber(keyName) as T
      case 'string':
        return FeatureFlags.getString(keyName) as T
      }
    } catch (error) {
      if (defaultValue) {
        return defaultValue
      }
      throw error
    }
  }
}
