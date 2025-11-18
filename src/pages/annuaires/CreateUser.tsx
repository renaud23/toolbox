import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Chip,
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

  const realmNames = realms.map((r) => r.name)
  const storages = realms.reduce(
    (acc, r) => {
      const { name, userStorages } = r
      return { ...acc, [name]: userStorages.map((us) => us.name) }
    },
    {} as Record<string, string[]>,
  )

  return { realmNames, storages }
}

function Result({ status }: { status: boolean | undefined }) {
  if (status) {
    return <Chip label="success" color="success" />
  }
  if (status === false) {
    return <Chip label="error" color="error" />
  }
  return null
}

export function CreateUser() {
  const [username, setUsername] = useState<string>('T_ANOMALIE_')
  const [password, setPassword] = useState<string>('T_ANOMALIE_')
  const [mail, setMail] = useState<string>('')
  const [realm, setRealm] = useState<string>('')
  const [storages, setStorages] = useState<string[]>()
  const [storage, setStorage] = useState<string>('')
  const [status, setStatus] = useState<boolean | undefined>()

  const realms = useAsync(getRealmNames)

  useEffect(() => {
    if (realms && realm.length) {
      setStorages(realms.storages[realm])
    }
  }, [realm, realms])

  async function onClick() {
    setStatus(undefined)
    let result = false,
      result2 = false
    if (username && password && realm && storage.length) {
      result = await postCreateUser({
        realm,
        storage,
        username,
        mail,
      })
      if (result) {
        result2 = await postInitPassword({
          realm,
          storage,
          username,
          password,
        })
      }

      setStatus(result && result2)
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
          onChange={(e: SelectChangeEvent<string>) => {
            setRealm(e.target.value)
          }}
          value={realm}
        >
          {realms?.realmNames.map((r) => (
            <MenuItem key={r} value={r}>
              {r}
            </MenuItem>
          ))}
        </Select>
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <Select
          labelId="storages-label"
          disabled={storages === undefined}
          id="storages"
          label="Storage"
          value={storage}
          onChange={(e: SelectChangeEvent<string>) => {
            setStorage(e.target.value)
          }}
        >
          {storages?.map((r) => (
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
      <Result status={status} />
    </Box>
  )
}
