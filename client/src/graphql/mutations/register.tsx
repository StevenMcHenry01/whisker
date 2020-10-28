import { gql } from '@apollo/client'

export const REGISTER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(
      options: { username: $username, email: $email, password: $password }
    ) {
      user {
        id
        username
        email
      }
      errors {
        field
        message
      }
    }
  }
`
