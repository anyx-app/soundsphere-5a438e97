import { supabase } from './supabase';

export const signIn = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github', // Default to GitHub for dev, easily changeable
    options: {
      redirectTo: window.location.origin
    }
  });
  if (error) throw error;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};
