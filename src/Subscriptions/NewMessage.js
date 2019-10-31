import gql from 'graphql-tag'

const NEW_MESSAGE = gql`
subscription newMessage {
    newMessage{
        ownerId{
            name
            id
          }
        content
        }
    }
`

export default NEW_MESSAGE  