import { OidcProvider } from '@axa-fr/react-oidc'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { Accueil } from './pages/Accueil'
import { Root } from './pages/Root'
import { Annuaires } from './pages/annuaires/Annuaires'
import { useAuthConfiguration } from './utils/useAuthConfig'

function App() {
  const config = useAuthConfiguration()

  if (config) {
    return (
      <OidcProvider configuration={config}>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/accueil" element={<Accueil />} />
            <Route path="/annuaires" element={<Annuaires />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </Router>
      </OidcProvider>
    )
  }

  return <>Loading...</>
}

export default App
