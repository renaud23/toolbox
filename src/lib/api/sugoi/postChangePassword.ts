import { initPasswordUri } from './uri'

export function postInitPassword(body: {
  realm: string
  storage: string
  userId: string
  password: string
  oldPassword: string
}) {
  const uri = `${import.meta.env.VITE_PROXY_API}${initPasswordUri(body.realm, body.storage, body.userId)}`
  return fetch(uri, {
    method: 'POST',
    cache: 'no-cache',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      password: body.password,
      oldPassword: body.oldPassword,
    }),
  })
    .then(() => {
      return true
    })
    .catch(() => false)
}
