import Hardware from '@mui/icons-material/Hardware'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router'

export function Header() {
  const navigate = useNavigate()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Hardware sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Button
              onClick={() => {
                navigate('/accueil')
              }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Toolbox
            </Button>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={() => {
                navigate('/annuaires')
              }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Annuaire
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
