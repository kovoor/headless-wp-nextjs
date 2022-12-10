import {
  QUERY_CATEGORY_POSTS,
  QUERY_TAG_POSTS,
  QUERY_ALL_POSTS,
  QUERY_ALL_HOMEPAGE_SIDEBAR_POSTS,
  QUERY_ALL_TAGS_WITH_SLUG,
  QUERY_POST_PER_PAGE,
  QUERY_ALL_POSTS_WITH_SLUG,
  QUERY_ALL_CATEGORIES_WITH_SLUG,
} from "../data/postQueries";
import { getApolloClient } from "../utils/apolloClient";
import { mapPostData } from "../utils/format";
import { gql } from "@apollo/client";


//function for calling GraphQL query to get all posts 
export async function getAllPosts(preview: boolean) {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: QUERY_ALL_POSTS,
    variables: {
      onlyEnabled: !preview,
      preview,
    },
  });

  const posts = data?.data.posts.edges.map(({ node = {} }) => node);

  return {
    posts: Array.isArray(posts) && posts.map(mapPostData),
  };
}

export async function getAllPostsWithSlug(preview: boolean) {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: QUERY_ALL_POSTS_WITH_SLUG,
    variables: {
      onlyEnabled: !preview,
      preview,
    },
  });

  console.log(data)


  return data?.data.posts;
}

export async function getAllCategoriesWithSlug(preview: boolean) {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: QUERY_ALL_CATEGORIES_WITH_SLUG,
    variables: {
      onlyEnabled: !preview,
      preview,
    },
  });

  console.log(data)

  return data?.data.categories;
}

export async function getAllTagsWithSlug(preview: boolean) {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: QUERY_ALL_TAGS_WITH_SLUG,
    variables: {
      onlyEnabled: !preview,
      preview,
    },
  });

  console.log(data)
  return data?.data.tags;
}

//function for calling GraphQL query to get all sidebar posts for homepage
export async function getHomepageSidebarPosts(preview: boolean, category: any) {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: QUERY_ALL_HOMEPAGE_SIDEBAR_POSTS,
    variables: {
      onlyEnabled: !preview,
      preview,
      category: category,
    },
  });

  const posts = data?.data.category.posts.nodes;

  return {
    sidebarPosts: Array.isArray(posts) && posts.map(mapPostData),
  };
}

//function for calling GraphQL query to get all posts for category page
export async function getPostsForCategoryPage(
  preview: boolean,
  id: string | string[],
  { currentPage = 1, ...options } = {}
) {
  const apolloClient = getApolloClient();

  console.log(id);

  let page = Number(currentPage);
  const postsPerPage: any = await getPostsPerPage();

  const data = await apolloClient.query({
    query: QUERY_CATEGORY_POSTS,
    variables: {
      onlyEnabled: !preview,
      preview,
      id,
    },
  });

  console.log("Category posts", data.data.category.posts.nodes);

  const categoryDetails = data.data.category;

  console.log(categoryDetails);

  const posts = data.data.category.posts.nodes;

  const pagesCount: any = await getPagesCount(posts, postsPerPage);

  if (typeof page === "undefined" || isNaN(page)) {
    page = 1;
  } else if (page > pagesCount) {
    return {
      posts: [],
      pagination: {
        currentPage: undefined,
        pagesCount,
      },
      categoryDetails,
    };
  }

  const offset = postsPerPage * (page - 1);

  return {
    posts: posts.slice(offset, offset + postsPerPage),
    categoryDetails,
    pagination: {
      currentPage: page,
      pagesCount,
    },
  };
}

//function for calling GraphQL query to get all posts for tag page
export async function getPostsForTagPage(
  preview: boolean,
  id: string | string[],
  { currentPage = 1, ...options } = {}
) {
  const apolloClient = getApolloClient();

  console.log(id);

  let page = Number(currentPage);
  const postsPerPage: any = await getPostsPerPage();

  const data = await apolloClient.query({
    query: QUERY_TAG_POSTS,
    variables: {
      onlyEnabled: !preview,
      preview,
      id,
    },
  });

  console.log("Tag posts", data.data.tag.posts.nodes);

  const tagDetails = data.data.tag;

  console.log(tagDetails);

  const posts = data.data.tag.posts.nodes;

  const pagesCount: any = await getPagesCount(posts, postsPerPage);

  if (typeof page === "undefined" || isNaN(page)) {
    page = 1;
  } else if (page > pagesCount) {
    return {
      posts: [],
      pagination: {
        currentPage: undefined,
        pagesCount,
      },
      tagDetails,
    };
  }

  const offset = postsPerPage * (page - 1);

  return {
    posts: posts.slice(offset, offset + postsPerPage),
    tagDetails,
    pagination: {
      currentPage: page,
      pagesCount,
    },
  };
}

//function for calling GraphQL query to get count of posts per page
export async function getPostsPerPage() {
  //If POST_PER_PAGE is defined at next.config.js
  if (process.env.POSTS_PER_PAGE) {
    console.warn(
      'You are using the deprecated POST_PER_PAGE variable. Use your WordPress instance instead to set this value ("Settings" > "Reading" > "Blog pages show at most").'
    );
    return Number(process.env.POSTS_PER_PAGE);
  }

  try {
    const apolloClient = getApolloClient();

    const { loading, error, data } = await apolloClient.query({
      query: QUERY_POST_PER_PAGE,
    });

    return Number(data.allSettings.readingSettingsPostsPerPage);
  } catch (e: any) {
    console.log(`Failed to query post per page data: ${e.message}`);
    throw e;
  }
}

//function for calling GraphQL query to get total count of pages given a number of posts instances and count of posts per page
export async function getPagesCount(posts: any, postsPerPage?: any) {
  const _postsPerPage = postsPerPage ?? (await getPostsPerPage());
  return Math.ceil(posts.length / _postsPerPage);
}


//function for calling GraphQL query to get paginated posts
export async function getPaginatedPosts(
  preview: boolean,
  { currentPage = 1, ...options } = {}
) {
  const { posts }: any = await getAllPosts(preview);
  const postsPerPage: any = await getPostsPerPage();
  const pagesCount: any = await getPagesCount(posts, postsPerPage);

  let page = Number(currentPage);

  if (typeof page === "undefined" || isNaN(page)) {
    page = 1;
  } else if (page > pagesCount) {
    return {
      posts: [],
      pagination: {
        currentPage: undefined,
        pagesCount,
      },
    };
  }

  const offset = postsPerPage * (page - 1);

  return {
    posts: posts.slice(offset, offset + postsPerPage),
    pagination: {
      currentPage: page,
      pagesCount,
    },
  };
}

export async function getPostAndMorePosts(
  slug: any,
  preview: any,
  previewData: any
) {
  const apolloClient = getApolloClient();

  const postPreview = preview && previewData?.post;

  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug));

  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug;

  const isDraft = isSamePost && postPreview?.status === "draft";
  const isRevision = isSamePost && postPreview?.status === "publish";

  const data = await apolloClient.query({
    query: gql`
    fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      databaseId
      featuredImage {
        node {
          sourceUrl
          altText
          caption
        }
      }
      author {
        node {
          ...AuthorFields
        }
      }
      categories {
        edges {
          node {
            name
            slug
            uri
          }
        }
      }
      tags {
        edges {
          node {
            name
            slug
            uri
          }
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        ${
          // Only some of the fields of a revision are considered as there are some inconsistencies
          isRevision
            ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
        `
            : ""
        }
      }
      posts(first: 10, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
    variables: {
      id: isDraft ? postPreview.id : slug,
      idType: isDraft ? "DATABASE_ID" : "SLUG",
    },
  });

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id;
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data?.post?.revisions?.edges[0]?.node;

    if (revision) Object.assign(data.post, revision);
    delete data.post.revisions;
  }

  // Filter out the main post
  console.log(data.posts?.edges)
  if(data?.posts?.edges) {
    data.posts.edges = data?.posts?.edges.filter(
      ({ node }: any) => node.slug !== slug
    );
  }
  // If there are still 3 posts, remove the last one
  if (data?.posts?.edges.length > 2) data.posts.edges.pop();

  return data;
}
