import { useEffect } from "react"
import { Autocomplete, TextField, styled } from "@mui/material"
import { useFormContext } from "react-hook-form"
import { IIngredient, IFormIngredient } from "../../../Types"
import { FormValues as DrinkFormValues } from "../../DrinkRecipeForm/formatRecipe"


export type IngredientFormValues = {
  recipeName : string
  drinkName : string;
  glass : string;
  method : string;
  garnish : string;
  ingredients: IFormIngredient[];
};


interface IProps {
  potentialIngredients : IIngredient[]
  index : number
}

const StyledTextField = styled(TextField)({
  "& input, & input.Mui-focused": {
    color: "white"
  }
});

export const IngredientComplete = ( {index, potentialIngredients} : IProps) => {
  const { register, setValue, getValues} = useFormContext<DrinkFormValues | IngredientFormValues>()

  useEffect(() => {
    register(`ingredients.${index}.ingredient`);
  },[])

  return (
        <Autocomplete
          sx={{marginTop : 1}}
          defaultValue={getValues().ingredients[index].ingredient}
          options={potentialIngredients.flatMap(ingredient => ingredient.ingredientName) || []}
          getOptionLabel={(option) => option}
          freeSolo
          autoSelect
          renderInput={(params) => {
            return <StyledTextField 
              required
              {...params }
              label="Ingredient" 
            />
          }}
          onChange={(_,data) => setValue(`ingredients.${index}.ingredient`, data as string)}
        />
  )
}