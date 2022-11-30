import { supabase } from "./../utils/supabase";
import { getApolloClient } from "../utils/apolloClient";
import { MUTATION_REGISTER_USER, QUERY_ALL_AUTHORS  } from "../data/users";

const client = getApolloClient();

//get logged in user
export const getUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
  // const { data } = await supabase.auth.getUser();
  // console.log(data)
  // return data;
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  // console.log(data.session)
  return data;
};

export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut();
  console.log(error);
};

export async function handleWPSignUp(email: any, password: any, username: any) {
  const data = await client.mutate({
    mutation: MUTATION_REGISTER_USER,
    variables: {
      input: {
        clientMutationId: "RegisterUser",
        username,
        password,
        email,
      },
    },
  });

  console.log(data);
}

export async function getAuthors() {
  const data = await client.query({
    query: QUERY_ALL_AUTHORS,
  });

  const authors = data.data.users.edges.map((user: any)=> {
    return {key: user.node.name, value: user.node.roles.nodes[0].name}
  });

  // console.log(authors)

  return authors;
}
