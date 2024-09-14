import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

const pages = ['Drink', 'Ingredients', 'Pdf'];
export const NavBar = () => {

  const nav = useNavigate()

  const handleClick = (page : string) => {
    if (page == 'Drink') nav('../')
    else nav(`/${page}`)
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent : 'space-around'}}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={_ => handleClick(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
        
        </Toolbar>
      </Container>
    </AppBar>
  );
}