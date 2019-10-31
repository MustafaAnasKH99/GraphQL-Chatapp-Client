import gql from 'graphql-tag'

const LOGGED_USER = gql`
subscription demoSubscription {
    demoSubscription{
        id
        name
        mobile
        email
        token
        }
    }
`

export default LOGGED_USER