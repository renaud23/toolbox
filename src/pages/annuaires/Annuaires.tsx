import { OidcSecure } from '@axa-fr/react-oidc'
import { Link, Paper, Typography } from '@mui/material'

import { Layout } from '../../components/layout/Layout'
import { CreateUser } from './CreateUser'

export function Annuaires() {
  return (
    <Layout>
      <OidcSecure>
        <Typography variant="h1" gutterBottom>
          Annuaire Page Recette RP
        </Typography>
        <Paper elevation={2}>
          <Typography variant="h2" gutterBottom>
            Informations
          </Typography>
          <Typography variant="button" gutterBottom sx={{ display: 'block' }}>
            <ul>
              <li>
                ihm :
                <Link href={import.meta.env.VITE_SUGOI_IHM} target="_Blank">
                  {import.meta.env.VITE_SUGOI_IHM}
                </Link>
              </li>
              <li>
                api :
                <Link href={import.meta.env.VITE_SUGOI_API} target="_Blank">
                  {import.meta.env.VITE_SUGOI_API}
                </Link>
              </li>
            </ul>
          </Typography>
        </Paper>
        <Paper elevation={2}>
          <Typography variant="h2" gutterBottom>
            Ajouter un utilisateur
          </Typography>
          <CreateUser />
        </Paper>
      </OidcSecure>
    </Layout>
  )
}
