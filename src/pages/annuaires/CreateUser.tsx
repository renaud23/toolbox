import { useState } from 'react'

import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  type SelectChangeEvent,
  TextField,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { Password } from '@src/components/Password'
import { getRealms } from '@src/lib/api/sugoi/getRealms'
import { postCreateUser } from '@src/lib/api/sugoi/postCreateUser'
import { postInitPassword } from '@src/lib/api/sugoi/postInitPassword'
import { useAsync } from '@src/utils/useAsync'

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}))

async function getRealmNames() {
  const realms = await getRealms()

  return realms.map((r) => r.name)
}

export function CreateUser() {
  const [username, setUsername] = useState<string>('ISABELLE_4')
  const [mail, setMail] = useState<string>('isabelle.ravel@insee.fr')
  const [password, setPassword] = useState<string>('is@Belle4')
  const [realm, setRealm] = useState<string>()

  const realms = useAsync(getRealmNames)

  async function onClick() {
    if (username && mail && password && realm) {
      const result = await postCreateUser({
        realm,
        storage: 'default',
        username,
        mail,
      })
        .then(() => {
          return true
        })
        .catch((e) => {
          console.error(e)
        })
      if (result) {
        await postInitPassword({
          realm,
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
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          value={realm}
          onChange={(e: SelectChangeEvent<string>) => {
            setRealm(e.target.value)
          }}
        >
          {realms?.map((r) => (
            <MenuItem key={r} value={r}>
              {r}
            </MenuItem>
          ))}
        </Select>
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <TextField
          id="Username"
          label="Username"
          variant="outlined"
          placeholder="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
          }}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <TextField
          id="Email"
          label="Email"
          variant="outlined"
          placeholder="Email"
          value={mail}
          onChange={(e) => {
            setMail(e.target.value)
          }}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
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
