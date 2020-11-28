import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { withApollo } from 'next-apollo'

const client = new ApolloClient({
  link: createUploadLink({
    uri: process.env.NEXT_PUBLIC_API_URL as string,
    credentials: 'include',
  }),
  cache: new InMemoryCache(),
})

export default withApollo(client)
