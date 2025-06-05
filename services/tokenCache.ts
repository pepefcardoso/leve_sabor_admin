let cachedToken: string | null = null;
export function setToken(token: string | null) { cachedToken = token; }
export function getToken() { return cachedToken; }
export function clearToken() { cachedToken = null; }
