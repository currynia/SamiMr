export const postJsonFetch = (path: string, data: unknown) => {
  const body = JSON.stringify(data);
  return fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body });
};
