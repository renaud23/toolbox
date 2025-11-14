import { useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  FormLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from '@mui/material'

export function Password({
  onChange,
  value,
}: {
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
  value?: string
}) {
  const [visibilty, setVisibility] = useState(false)
  return (
    <>
      <FormLabel htmlFor="password">Password</FormLabel>
      <OutlinedInput
        id="password"
        name="password"
        type={visibilty ? 'text' : 'password'}
        placeholder="Password"
        autoComplete="password"
        required
        size="medium"
        value={value}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => {
                setVisibility(!visibilty)
              }}
              onMouseDown={() => {
                setVisibility(!visibilty)
              }}
            >
              {visibilty ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </>
  )
}
