export function changePasswordUri(
  realm: string,
  storage: string,
  userId: string,
) {
  return `/v2/realms/${realm}/storages/${storage}/users/${userId}/change-password`
}

export function initPasswordUri(
  realm: string,
  storage: string,
  username: string,
) {
  return `/v2/realms/${realm}/storages/${storage}/users/${username}/init-password`
}

export function createUserUri(realm: string, storage: string) {
  return `/v2/realms/${realm}/storages/${storage}/users`
}
