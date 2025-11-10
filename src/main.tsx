import { StrictMode } from 'react'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { CssBaseline } from '@mui/material'
import { StyledEngineProvider } from '@mui/material/styles'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyledEngineProvider>
      <CssBaseline enableColorScheme />
      <App />
    </StyledEngineProvider>
  </StrictMode>,
)
