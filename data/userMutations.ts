import { gql } from "@apollo/client";

//User Mutations with WPGraphQL (WordPress)

//mutation to create user 
export const MUTATION_REGISTER_USER = gql`
  mutation registerUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      clientMutationId
      user {
        name
        slug
      }
    }
  }
`;