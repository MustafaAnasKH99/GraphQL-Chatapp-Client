import gql from 'graphql-tag'

const chats = gql`
    query getChats {
        fetchAllChats{
            id
            users{
                name
            }
        }
    }
`

export default chats