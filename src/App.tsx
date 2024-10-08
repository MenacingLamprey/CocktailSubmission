import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createHashRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider, Box } from '@mui/material'

import { DrinkContextProvider } from './DrinkContext';
import { DrinkForm } from './DrinkForm';
import { NavBar } from './NavBar'
import { IngredientForm } from './IngredientForm';

import './App.css'
import { CocktailSubmissionView } from './CocktailSubmissionView';

function App() {
  
  const router = createHashRouter([
    {
      path: "/",
      element: <Box>
        <NavBar/>
        <DrinkForm />
      </Box>
    },
    {
      path : '/pdf',
      element : <Box>
        <NavBar/>
        <CocktailSubmissionView />
      </Box>
    },
    {
      path : '/ingredients',
      element : <Box>
        <NavBar/>
        <IngredientForm/>
      </Box>
    }
  ]);

  const theme = createTheme({
    components: {
      // Name of the component
      MuiButton: {
        styleOverrides : {
          root : {
            textTransform : 'none'
          }
        }
      },
    } 
  });
  
  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider theme={theme}>
        <DrinkContextProvider>
          <RouterProvider router={router} />
        </DrinkContextProvider>
      </ThemeProvider>
      </QueryClientProvider>
      
    </>
  )
}

export default App
