const parseQuery = (query: string) =>
  query &&
  Object.fromEntries(
    query
      .split('?')[1]
      .split('&')
      .map((s) => s.split('=')),
  );

export { parseQuery };
