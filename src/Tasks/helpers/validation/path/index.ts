export const validationUUID = (path: string | undefined) => {
  if (typeof path === "string") {
    return path;
  }
  return null;
};
