import { QUERY_CATEGORY_POSTS } from './../data/posts';
import { getApolloClient } from "../utils/apolloClient";
import { QUERY_ALL_POSTS, QUERY_ALL_SIDEBAR_POSTS, QUERY_ALL_TAGS_WITH_SLUG, QUERY_POST_PER_PAGE } from "../data/posts";
import { mapPostData } from "../utils/format";

// const allPostsIncludesTypes: any = {
//   all: QUERY_ALL_POSTS,
//   sidebar: QUERY_ALL_SIDEBAR_POSTS,

// };

export async function getAllPosts(preview: boolean) {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: QUERY_ALL_POSTS,
    variables: {
      onlyEnabled: !preview,
      preview
    }
  });

  const posts = data?.data.posts.edges.map(({ node = {} }) => node);
  


  return {
    posts: Array.isArray(posts) && posts.map(mapPostData),
  };
}

export async function getSidebarPosts(preview: boolean, category: any) {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: QUERY_ALL_SIDEBAR_POSTS,
    variables: {
      onlyEnabled: !preview,
      preview,
      category: category
    }
  });

  const posts = data?.data.category.posts.nodes;

  return {
    sidebarPosts: Array.isArray(posts) && posts.map(mapPostData),
  };
}


export async function getPostsForCategoryPage(
  preview: boolean,
  id: string | string[],
  {currentPage = 1, ...options} = {}
) {
  const apolloClient = getApolloClient();

  console.log(id)

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

  console.log('Category posts', data.data.category.posts.nodes)

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

export async function getPagesCount(posts: any, postsPerPage?: any) {
  const _postsPerPage = postsPerPage ?? (await getPostsPerPage());
  return Math.ceil(posts.length / _postsPerPage);
}

export async function getPaginatedPosts(preview: boolean, {currentPage = 1, ...options} = {} ) {
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


