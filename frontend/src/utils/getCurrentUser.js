export const getCurrentUser = () => {
  const user = localStorage.getItem("User");
  return user ? JSON.parse(user) : null;
};

export const getCurrentUserId = () => {
  const user = getCurrentUser();
  return user?._id || null;
};
