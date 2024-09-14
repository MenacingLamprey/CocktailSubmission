import { useRef, useContext } from "react";
import { Box, Typography, TextField } from '@mui/material'

import { DrinkRecipeForm } from "./DrinkRecipeForm";
import { DrinkContext } from "../DrinkContext";
import { IDrinkContext } from "../Types";

export const DrinkFormBody = () => {
  const { setDrinkName, drink } = useContext(DrinkContext) as IDrinkContext
 
  const formFocus = useRef<null | HTMLDivElement>(null)

  const focus = () => {
    formFocus.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box>
    <Typography variant='h6'onClick ={focus} ref={formFocus}>Create Drink</Typography>
    <TextField
      inputProps={{style: {fontWeight: 'bold', color : '#ffffffde'}}}
      margin="normal"
      required
      fullWidth
      id="drink-name"
      label="Drink Name"
      value={drink.drinkName}
      onChange={e => setDrinkName(e.target.value)}
    />
    <DrinkRecipeForm/>
  </Box>
  )
}