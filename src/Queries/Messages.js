import gql from 'graphql-tag'

const MESSAGES = gql`
    query fetchMessagesByChatId($chatId: String!) {
        fetchMessagesByChatId(chatId: $chatId){
            id
            content
            ownerId{
              id
              name
            }
          }
    }
`

export default MESSAGES