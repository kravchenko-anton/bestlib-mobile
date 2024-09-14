export const getFileUrl = (path: string) => {
  if (path?.startsWith("http")) return path;
  return `${process.env.STORAGE_URL}/${path}`;
};
