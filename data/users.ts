import { gql } from "@apollo/client";

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

export function updateUserAvatar(avatar: any) {
  // The URL by default that comes from Gravatar / WordPress is not a secure
  // URL. This ends up redirecting to https, but it gives mixed content warnings
  // as the HTML shows it as http. Replace the url to avoid those warnings
  // and provide a secure URL by default

  return {
    ...avatar,
    url: avatar.url?.replace("http://", "https://"),
  };
}
