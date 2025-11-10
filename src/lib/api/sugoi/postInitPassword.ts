import { initPasswordUri } from './uri'

export function postInitPassword(body: {
  realm: string
  storage: string
  username: string
  password: string
}) {
  const uri = `${import.meta.env.VITE_PROXY_API}${initPasswordUri(
    body.realm,
    body.storage,
    body.username,
  )}`

  return fetch(uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: body.password }),
  })
    .then(() => {
      return true
    })
    .catch(() => false)
}
