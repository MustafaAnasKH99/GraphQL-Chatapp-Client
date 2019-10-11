import gql from 'graphql-tag';


const LOGIN_USER = gql`
    mutation loginUser($mobile: String!, $password: String!){
        loginUser(params: {
            mobile: $mobile, 
            password: $password
        })
    }

`

export default LOGIN_USER