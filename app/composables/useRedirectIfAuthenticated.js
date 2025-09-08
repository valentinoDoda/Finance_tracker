export const useRedirectIfAuthenticated = (url = "/") => {
  const user = useSupabaseUser();

  watch(
    user,
    (user) => {
      if (user) {
        return navigateTo(url);
      }
    },
    
  );

  return { user };
};
