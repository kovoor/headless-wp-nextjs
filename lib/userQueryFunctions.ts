import { getApolloClient } from "../utils/apolloClient";
import { QUERY_ALL_AUTHORS } from "../data/userQueries";
const client = getApolloClient();

//function for calling GraphQL query to get all authors 
export async function getAuthors() {
  const data = await client.query({
    query: QUERY_ALL_AUTHORS,
  });

  const authors = data.data.users.edges.map((user: any) => {
    return { key: user.node.name, value: user.node.roles.nodes[0].name };
  });

  return authors;
}
