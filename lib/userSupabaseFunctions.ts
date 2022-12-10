import { supabase } from "../utils/supabase";

//Supabase Auth API functions

//function for to get logged in user
export const getUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

//function for to get user session
export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  return data;
};

//function to log out user
export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut();
  console.log(error);
};
