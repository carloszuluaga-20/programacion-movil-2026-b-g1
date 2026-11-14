// Keep the access token only in application memory. It is cleared on reload/exit.
// This avoids storing JWTs in localStorage, sessionStorage or unencrypted preferences.
let accessToken: string | null = null;
export const getToken = () => accessToken;
export const setToken = (token: string) => { accessToken = token; };
export const clearToken = () => { accessToken = null; };
export const isAuthenticated = () => Boolean(accessToken);
