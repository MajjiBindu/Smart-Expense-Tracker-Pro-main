import { getCurrentUserId } from "./getCurrentUser";

export const getUserStorageKey = (key) => {
  const userId = getCurrentUserId();
  return `${key}_${userId}`;
};
