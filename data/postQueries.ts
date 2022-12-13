// import { AUTHOR_FIELDS } from './userQueries';
import { gql } from "@apollo/client";

//Post Queries with WPGraphQL (WordPress)

//post query fragment
export const POST_FIELDS = gql`
  fragment PostFields on Post {
    id
    title
    excerpt
    databaseId
    date
    slug
    featuredImage {
      node {
        altText
        caption
        sourceUrl
        srcSet
        sizes
        id
      }
    }
    categories {
      nodes {
        description
        databaseId
        id
        name
        slug
        uri
      }
    }
    tags {
      nodes {
        name
        slug
        uri
      }
    }
  }
`;



//query all categories with their slug
export const QUERY_ALL_CATEGORIES_WITH_SLUG = gql`
  {
    categories(first: 100, where: { exclude: "1" }) {
      nodes {
        name
        slug
        uri
        databaseId
      }
    }
  }
`;

//query all tags with their slug
export const QUERY_ALL_TAGS_WITH_SLUG = gql`
  {
    tags(first: 100, where: { exclude: "1" }) {
      nodes {
        name
        slug
        uri
        databaseId
      }
    }
  }
`;

export const QUERY_ALL_POSTS_WITH_SLUG = gql`
  {
    posts(first: 10000) {
      edges {
        node {
          databaseId
          slug
        }
      }
    }
  }
`;

//query all posts
export const QUERY_ALL_POSTS = gql`
  ${POST_FIELDS}
  query AllPosts {
    posts(
      first: 10000
      where: { hasPassword: false, orderby: { field: DATE, order: DESC } }
    ) {
      edges {
        node {
          ...PostFields
          modified
          author {
            node {
              avatar {
                height
                url
                width
              }
              id
              firstName
              lastName
              name
              slug
            }
          }
        }
      }
    }
  }
`;




//query all sidebar posts for homepage
export const QUERY_ALL_HOMEPAGE_SIDEBAR_POSTS = gql`
  ${POST_FIELDS}
  query SidebarPosts($category: ID!) {
    category(id: $category, idType: SLUG) {
      posts(
        first: 3
        where: { hasPassword: false, orderby: { field: DATE, order: DESC } }
      ) {
        nodes {
          ...PostFields
          modified
          author {
            node {
              avatar {
                height
                url
                width
              }
              id
              name
              slug
            }
          }
        }
      }
    }
  }
`;

//query all category page posts
export const QUERY_CATEGORY_POSTS = gql`
  query CategoryPosts($id: ID!) {
    category(id: $id, idType: SLUG) {
      description
      name
      posts(first: 10000, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          title
          excerpt
          slug
          date
          databaseId
          featuredImage {
            node {
              sourceUrl
            }
          }
          author {
            node {
              avatar {
                height
                url
                width
              }
              id
              firstName
              lastName
              name
              slug
            }
          }
          categories {
            nodes {
              description
              name
              slug
              uri
            }
          }
          tags {
            nodes {
              name
              slug
              uri
            }
          }
        }
      }
    }
  }
`;

//query all tag page posts
export const QUERY_TAG_POSTS = gql`
  query TagPosts($id: ID!) {
    tag(id: $id, idType: SLUG) {
      description
      name
      posts(first: 10000, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          title
          excerpt
          slug
          date
          databaseId
          featuredImage {
            node {
              sourceUrl
            }
          }
          author {
            node {
              avatar {
                height
                url
                width
              }
              id
              firstName
              lastName
              name
              slug
            }
          }
          categories {
            nodes {
              description
              name
              slug
              uri
            }
          }
          tags {
            nodes {
              name
              slug
              uri
            }
          }
        }
      }
    }
  }
`;





//returns the count of posts for per page (5 as of now) as set in WordPress under Settings > Reading
export const QUERY_POST_PER_PAGE = gql`
  query PostPerPage {
    allSettings {
      readingSettingsPostsPerPage
    }
  }
`;

