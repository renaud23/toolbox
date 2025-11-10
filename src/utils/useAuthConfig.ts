import { useEffect, useState } from 'react'

import type { OidcConfiguration } from '@axa-fr/react-oidc'

import { useAsync } from './useAsync'

function fetchConfig(): Promise<OidcConfiguration> {
  return fetch('/configuration.json').then((res) => res.json())
}

export function useAuthConfiguration() {
  const config = useAsync(fetchConfig)
  const [configWithRedirectUri, setConfigWithRedirectUri] =
    useState<OidcConfiguration>()
  useEffect(() => {
    if (config) {
      setConfigWithRedirectUri({
        ...config,
        redirect_uri: `${window.location.origin}/login`,
        refresh_time_before_tokens_expiration_in_second: 40,
        service_worker_relative_url: '/OidcServiceWorker.js',
        // service_worker_activate: () => false,
      })
    }
  }, [config])

  return configWithRedirectUri
}
