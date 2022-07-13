// TODO: Change below to "WORDPRESS_API_URL"
const API_URL = process.env.WORDPRESS_LOCAL_API_URL

export const fetchAPI = async (query = '', { variables } : any = {}) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers [
      'Authorization'
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  }

  // WPGraphQL Plugin must be enabled
  const res = await fetch(`${API_URL}/graphql`, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}


export async function getPreviewPost(id: string | string[], idType: string = 'DATABASE_ID') {
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
    )
    return data.post
  }

