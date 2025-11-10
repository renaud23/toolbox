import { createUserUri } from './uri'

export function postCreateUser(body: {
  realm: string
  storage: string
  username: string
  mail: string
}) {
  const uri = `${import.meta.env.VITE_PROXY_API}${createUserUri(body.realm, body.storage)}`
  return fetch(uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: body.username,
      mail: body.mail,
    }),
  })
    .then((e) => {
      const kindOfResponse = Math.trunc(e.status / 100)

      if (kindOfResponse !== 2) {
        console.warn(e)
        return false
      }
      return true
    })
    .catch((e) => {
      console.warn(e)
      return false
    })
}
