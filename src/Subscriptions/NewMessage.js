import gql from 'graphql-tag'

const NEW_MESSAGE = gql`
subscription newMessage {
    newMessage{
        content
        ownerId{
            name
          }
        }
    }
`

export default NEW_MESSAGE  