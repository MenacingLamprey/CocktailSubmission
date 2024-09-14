import { UseFormRegister } from "react-hook-form"
import { TextField, Box } from "@mui/material"
import { FormValues } from "./formatRecipe"

interface IProps {
  register: UseFormRegister<FormValues>
}

export const RecipeFields = ({ register } : IProps) => {

  return (
    <Box>
      <TextField
      margin="normal"
      required
      fullWidth
      id="glass"
      label="Glass"
      inputProps={{style: {fontWeight: 'bold', color : '#ffffffde'}}}
      {...register(`glass` as const, {
        required: true
      })}
    />
    <TextField
      margin="normal"
      required
      fullWidth
      id="method"
      label="Method"
      inputProps={{style: {fontWeight: 'bold', color : '#ffffffde'}}}
      {...register(`method` as const, {
        required: true
      })}
    />
    <TextField
      margin="normal"
      required
      fullWidth
      id="garnish"
      label="Garnish"
      inputProps={{style: {fontWeight: 'bold', color : '#ffffffde'}}}
      {...register(`garnish` as const, {
        required: true
      })}
    />

    <TextField
      margin="normal"
      required
      fullWidth
      id="ice"
      label="Ice"
      inputProps={{style: {fontWeight: 'bold', color : '#ffffffde'}}}
      {...register(`ice` as const, {
        required: true
      })}
    />
    </Box>
  )
}