import { MUTATION_REGISTER_USER } from "../data/userMutations";
import { getApolloClient } from "../utils/apolloClient";
const client = getApolloClient();

//function for calling GraphQL mutation to sign up user with 'Subscriber' role on WordPress
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
