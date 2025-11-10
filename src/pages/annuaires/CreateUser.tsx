import { useState } from 'react'

import { Box, Button, FormLabel, Grid, OutlinedInput } from '@mui/material'
import { styled } from '@mui/material/styles'

import { Password } from '../../components/Password'
import { postCreateUser } from '../../lib/api/sugoi/postCreateUser'
import { postInitPassword } from '../../lib/api/sugoi/postInitPassword'

const REALMS = ['rp', 'rpform', 'mairies', 'SSP']

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}))

export function CreateUser() {
  const [username, setUsername] = useState<string>('ISABELLE_4')
  const [mail, setMail] = useState<string>('isabelle.ravel@insee.fr')
  const [password, setPassword] = useState<string>('is@Belle4')

  async function onClick() {
    if (username && mail && password) {
      const result = await postCreateUser({
        realm: 'rp',
        storage: 'default',
        username,
        mail,
      })
        .then((r) => {
          console.log(r)
          return true
        })
        .catch((e) => {
          console.error(e)
        })
      if (result) {
        await postInitPassword({
          realm: 'rp',
          storage: 'default',
          username,
          password,
        })
      }
    }
  }

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
    >
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="first-name" required>
          Username
        </FormLabel>
        <OutlinedInput
          id="username"
          name="username"
          type="username"
          placeholder="username"
          autoComplete="user name"
          required
          size="medium"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
          }}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="first-name" required>
          Email
        </FormLabel>
        <OutlinedInput
          id="mail"
          name="mail"
          type="mail"
          placeholder="mail"
          autoComplete="email"
          required
          size="medium"
          value={mail}
          onChange={(e) => {
            setMail(e.target.value)
          }}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="first-name" required>
          Password
        </FormLabel>
        <Password
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
      </FormGrid>
      <Button variant="contained" onClick={onClick}>
        Create
      </Button>
    </Box>
  )
}
