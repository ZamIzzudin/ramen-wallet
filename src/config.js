/** @format */

export const DEFAULT_INDEXED = {
  is_login: false,
  network_path: "https://google.com",
  session_login: Date.now(),
  expired_session: Date.now() + 1000 * 60 * 60 * 24 * 7,
  token: "",
};
