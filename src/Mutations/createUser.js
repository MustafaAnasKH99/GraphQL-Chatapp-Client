import gql from 'graphql-tag';


const CREATE_USER = gql`
    mutation createUser($name: String!, $email: String!, $password: String!, $mobile: String!){
        createUser(params: {
          name: $name,
          email: $email,
          password: $password
          mobile: $mobile
        }){
          name
          email
        }
      }

`

export default CREATE_USER