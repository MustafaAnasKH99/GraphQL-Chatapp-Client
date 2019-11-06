import gql from 'graphql-tag';


const CREATE_MESSAGE = gql`
    mutation createMessage($chatId: String!, $content: String!){
        createMessage(params: {
          chatId: $chatId,
          content: $content,
        }){
          id
          content
        }
      }

`

export default CREATE_MESSAGE