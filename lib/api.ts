const API_URL = process.env.WORDPRESS_LOCAL_API_URL;

export const fetchAPI = async (query: string = "", { variables }: any = {}) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      "Authorization"
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  // WPGraphQL Plugin must be enabled
  const res = await fetch(`${API_URL}`, {
    headers,
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
};

export async function getPreviewPost(
  id: string | string[],
  idType: string = "DATABASE_ID"
) {
  const data = await fetchAPI(
    `
      query PreviewPost($id: ID!, $idType: PostIdType!) {
        post(id: $id, idType: $idType) {
          databaseId
          slug
          status
        }
      }`,
    {
      variables: { id, idType },
    }
  );
  return data.post;
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
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
    `);
  return data?.posts;
}

export async function getAllCategoriesWithSlug() {
  const data = await fetchAPI(`
      {
        categories(first: 100, where: {exclude: "1"}) {
          nodes {
            name
            slug
            uri
            databaseId
          }
        }
      }
    `);
  return data?.categories;
}

export async function getAllTagsWithSlug() {
  const data = await fetchAPI(`
      {
        tags(first: 100, where: {exclude: "1"}) {
          nodes {
            name
            slug
            uri
            databaseId
          }
        }
      }
    `);
  return data?.tags;
}

export async function getAllPostsForHome(preview: boolean) {
  const data = await fetchAPI(
    `
      query AllPosts {
        posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
          edges {
            node {
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
                  name
                  firstName
                  lastName
                  avatar {
                    url
                  }
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
    `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  );

  return data?.posts;
}

export async function getPostsForSidebar(preview: boolean) {
  const data = await fetchAPI(
    `
      query SidebarPosts {
        category(id: "guides", idType: SLUG) {
          posts(first: 3, where: {orderby: {field: DATE, order: DESC}}) {
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
                  name
                  firstName
                  lastName
                  avatar {
                    url
                  }
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
    `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  );

  return data?.category.posts;
}

export async function getPostsForCategoryPage(
  preview: boolean,
  id: string | string[],
  {currentPage = 1, ...options} = {}
) {
  const data = await fetchAPI(
    `
      query allPosts($id: ID!) {
        category(id: $id, idType: SLUG) {
          posts(first: 3, where: {orderby: {field: DATE, order: DESC}}) {
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
                  name
                  firstName
                  lastName
                  avatar {
                    url
                  }
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
          },
          description
          name
        }
      }
    `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
        id,
      },
    }
  );

  return data?.category;
}

export async function getPostsForTagPage(
  preview: boolean,
  id: string | string[]
) {
  const data = await fetchAPI(
    `
      query allPosts($id: ID!) {
        tag(id: $id, idType: SLUG) {
          posts(first: 3, where: {orderby: {field: DATE, order: DESC}}) {
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
                  name
                  firstName
                  lastName
                  avatar {
                    url
                  }
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
          },
          description
          name
        }
      }
    `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
        id,
      },
    }
  );

  return data?.tag;
}

export async function getPostAndMorePosts(
  slug: any,
  preview: any,
  previewData: any
) {
  const postPreview = preview && previewData?.post;
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug));
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug;
  const isDraft = isSamePost && postPreview?.status === "draft";
  const isRevision = isSamePost && postPreview?.status === "publish";
  const data = await fetchAPI(
    `
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
    {
      variables: {
        id: isDraft ? postPreview.id : slug,
        idType: isDraft ? "DATABASE_ID" : "SLUG",
      },
    }
  );

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id;
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node;

    if (revision) Object.assign(data.post, revision);
    delete data.post.revisions;
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(
    ({ node }: any) => node.slug !== slug
  );
  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 2) data.posts.edges.pop();

  return data;
}
