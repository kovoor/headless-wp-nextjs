import { gql } from "@apollo/client";

//User Queries with WPGraphQL (WordPress)

export const AUTHOR_FIELDS = gql`
  fragment AuthorFields on User {
    name
    firstName
    lastName
    avatar {
      url
    }
  }
`;

//query all users with their roles
export const QUERY_ALL_AUTHORS = gql`
  query allAuthors {
    users(first: 10000) {
      edges {
        node {
          avatar {
            height
            width
            url
          }
          description
          id
          name
          roles {
            nodes {
              name
            }
          }
          slug
        }
      }
    }
  }
`;
