const requestAPI = (
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> => fetch(input, init);

export { requestAPI };
