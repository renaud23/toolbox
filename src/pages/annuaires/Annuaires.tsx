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
                <Link
                  href="https://gestion-comptes-utilisateurs.recette.insee.fr/"
                  target="_Blank"
                >
                  https://gestion-comptes-utilisateurs.recette.insee.fr/
                </Link>
              </li>
              <li>
                api :
                <Link
                  href=" https://api.gestion-comptes-utilisateurs.recette.insee.fr/"
                  target="_Blank"
                >
                  https://api.gestion-comptes-utilisateurs.recette.insee.fr/
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
