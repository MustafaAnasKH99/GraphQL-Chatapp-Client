import gql from 'graphql-tag'

const USER = gql`
    query fetchCurrentUser {
        fetchCurrentUser{
            id
            mobile
            token
            name
          }
    }
`

export default USER