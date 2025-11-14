import { gerRealmsUri } from './uri'

export type Realm = {
  name: string
  url: string
}

export function getRealms(sugoiApi?: string): Promise<Realm[]> {
  const base = sugoiApi || import.meta.env.VITE_PROXY_API
  const uri = `${base}${gerRealmsUri()}`

  return fetch(uri, {
    method: 'GET',
    cache: 'no-cache',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((r) => r.json())
    .catch(() => false)
}
