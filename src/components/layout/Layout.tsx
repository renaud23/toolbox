import type { PropsWithChildren } from 'react'

import { Grid } from '@mui/material'
import Container from '@mui/material/Container'

import { Header } from './Header'

export function Layout({ children }: PropsWithChildren) {
  return (
    <Grid container spacing={3}>
      <Container>
        <Header />
        <main>{children}</main>
      </Container>
    </Grid>
  )
}
