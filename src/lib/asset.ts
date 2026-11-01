/** Resolves a /public path (e.g. '/projects/shot.jpg') against the deploy base path. */
export const asset = (path: string) =>
  /^https?:\/\//.test(path) ? path : `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
