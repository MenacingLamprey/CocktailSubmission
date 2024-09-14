import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider, Box } from '@mui/material'

import { DrinkContextProvider } from './DrinkContext';

import { DrinkForm } from './DrinkForm'
import { CocktailSubmissionForm } from './CocktailSubmissionView'
import { NavBar } from './NavBar'
import { IngredientForm } from './IngredientForm';

import './App.css'

function App() {
  
  const router = createBrowserRouter([
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
        <CocktailSubmissionForm/>
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
