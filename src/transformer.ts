import {GraphQLTransform} from 'graphql-transformer-core'
import {DynamoDBModelTransformer} from 'graphql-dynamodb-transformer'
import {ModelConnectionTransformer} from 'graphql-connection-transformer'
import {ModelAuthTransformer} from 'graphql-auth-transformer'

import {AppsyncAdapterBase} from './feature-flags'

export const getTransformer = (): GraphQLTransform => {
  const transformer = new GraphQLTransform({
    transformers: [
      new DynamoDBModelTransformer(),
      new ModelConnectionTransformer(),
      new ModelAuthTransformer(),
    ],
    featureFlags: new AppsyncAdapterBase(),
  })

  return transformer
}
