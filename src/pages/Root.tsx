import { useEffect } from 'react'

import { useNavigate } from 'react-router'

export function Root() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/accueil')
  }, [navigate])

  return null
}
