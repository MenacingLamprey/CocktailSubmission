import { FieldArrayWithId, useFormContext } from "react-hook-form";
import { Box, Button, Checkbox, FormLabel, TextField, Typography } from "@mui/material";

import { IIngredient } from "../../Types";
import { FormValues as DrinkFormValues } from "../DrinkRecipeForm/formatRecipe"
import { FormValues as IngredientFormValues } from "../../IngredientForm/IngredientRecipeForm/formatRecipe"

import { IngredientComplete } from "./IngredientComplete";
import './styles.css' 

interface IProps {
  potentialIngredients : IIngredient[]
  fields : FieldArrayWithId<DrinkFormValues | IngredientFormValues, "ingredients", "id">[]
  append : Function
  remove: Function
  forIngredients : boolean
}

export const RecipeIngredientForm = ({potentialIngredients, fields, append, remove, forIngredients} : IProps) => {
  const { register } = useFormContext()

  const handleAddIngredient = () => {
    append({amount :0, measurement: '', ingredient :'', isBatchable : false})
    console.log(fields)
  }

  return (<Box>
    <Typography variant ='h6'>Ingredients</Typography>
    <Box sx={{marginTop : "3px"}}>
      {fields.map((field,index) => (
        <Box key={field.id}>
        <Box sx={{display :'flex', flexDirection :"row"}}>
        <TextField 
          sx ={{margin : '1px'}}
          className ='ingredient-input'
          label="amount"  
          key={field.id+'A'} 
          inputProps={{style: {fontWeight: 'bold', color : '#ffffffde'}}}
          {...register(`ingredients.${index}.amount` as const, {
            valueAsNumber: true,
            required: true
          })}
        /> 
        <TextField
          sx ={{margin : '1px'}}
          label="measurement"
          defaultValue="oz"
          key={field.id+'M'} 
          inputProps={{style: {fontWeight: 'bold', color : '#ffffffde'}}}
          {...register(`ingredients.${index}.unit` as const, {
            required: true
          })}
        />
        </Box>
          <IngredientComplete
            key={field.id+'I'}
            index={index}
            potentialIngredients={potentialIngredients}
          />
          {!forIngredients && <Box>
            <FormLabel>Add To Batch</FormLabel>
              <Checkbox 
              defaultValue="false"
              key={field.id+'B'} 
              inputProps={{style: {fontWeight: 'bold', color : '#ffffffde'}}}
              defaultChecked={field.isBatchable}
              {...register(`ingredients.${index}.isBatchable` as const, 
              )}/>
          </Box>}
          <Button onClick={() => remove(index)}>Remove</Button>
      </Box>
      ))}
    </Box>
    <Button onClick ={handleAddIngredient}>Add Ingredient</Button>
  </Box>)
}