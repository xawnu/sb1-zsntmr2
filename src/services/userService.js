const { supabase } = require('../config/supabase');

const signUpWithEmail = async (email, password) => {
  const { user, session, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return { user, session };
};

const signInWithEmail = async (email, password) => {
  const { user, session, error } = await supabase.auth.signIn({
    email,
    password,
  });
  if (error) throw error;
  return { user, session };
};

const signInWithGoogle = async () => {
  const { user, session, error } = await supabase.auth.signIn({
    provider: 'google',
  });
  if (error) throw error;
  return { user, session };
};

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

const getCurrentUser = async () => {
  const user = supabase.auth.user();
  if (!user) throw new Error('Not authenticated');
  return user;
};

const updateUserSubscription = async (userId, plan) => {
  const { data, error } = await supabase
    .from('users')
    .update({ subscription: plan })
    .eq('id', userId);

  if (error) throw error;
  return data[0];
};

const updateUserCredits = async (userId, credits) => {
  const { data, error } = await supabase
    .from('users')
    .update({ credits: credits })
    .eq('id', userId);

  if (error) throw error;
  return data[0];
};

const deductUserCredits = async (userId, amount) => {
  const { data, error } = await supabase
    .from('users')
    .select('credits')
    .eq('id', userId)
    .single();

  if (error) throw error;

  const currentCredits = data.credits;
  if (currentCredits < amount) {
    throw new Error('Insufficient credits');
  }

  const { data: updatedUser, error: updateError } = await supabase
    .from('users')
    .update({ credits: currentCredits - amount })
    .eq('id', userId);

  if (updateError) throw updateError;
  return updatedUser;
};

module.exports = {
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  signOut,
  getCurrentUser,
  updateUserSubscription,
  updateUserCredits,
  deductUserCredits
};