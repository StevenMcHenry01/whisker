import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { withApollo } from 'next-apollo'

const client = new ApolloClient({
  link: createUploadLink({
    uri:
      process.env.NODE_ENV === 'development'
        ? (process.env.NEXT_PUBLIC_SERVER_URL_GRAPHQL as string)
        : 'http://localhost:8080/graphql',
    credentials: 'include',
  }),
  cache: new InMemoryCache(),
})

export default withApollo(client)
