import { useQuery } from "@tanstack/react-query"
import { FormProvider, useFieldArray, useForm } from "react-hook-form"
import { IIngredient, IIngredientRecipe, IFormIngredient, IDrinkContext } from "../../Types"
import { RecipeIngredientForm } from "../../DrinkForm/RecipeIngredientForm"
import { getIngredientsForIngredientRecipe } from "../../apiServices"
import { formatRecipe, FormValues } from "./formatRecipe"
import { Box, Button, TextField } from "@mui/material"
import { useContext } from "react"
import { DrinkContext } from "../../DrinkContext"

interface IngredientResponse {
  res : IIngredient[]
  message : string
  error : boolean
}

interface IProps {
  defaultValues? : IIngredientRecipe
  ingredientName : string
}

export const IngredientRecipeForm = ({ defaultValues, ingredientName} : IProps) => {
  const { saveIngredientRecipe } = useContext(DrinkContext) as IDrinkContext
  const { data , error, isLoading } = useQuery<IngredientResponse>({
    queryKey : ['ingredientsForIngredients'],
    queryFn : () => getIngredientsForIngredientRecipe()
  })
  
  const passedIngredients = defaultValues?.childIngredients || null

  const defaultIngredients = passedIngredients ? passedIngredients.map(drinkIngredient => {
    const {amount, unit, ingredient} = drinkIngredient
    return {ingredient: ingredient!.ingredientName, amount , unit}
  }) : [{ingredient : "", amount : 0, unit : "", isBatchable : false}] as IFormIngredient[]


  const methods  = useForm<FormValues>({
    defaultValues: {
      instructions : '',
      ingredients: defaultIngredients,
      recipeYield : ''
    },
    mode: "onBlur"
  });

  const { register, control, handleSubmit} = methods
  const { fields, append, remove } = useFieldArray({name: "ingredients", control});

  if(isLoading) return <Box>...Loading</Box>
  if(error) console.log("Error Getting Ingredients")
  if(!data) console.log("No Ingredients Found")

 
  const ingredients : IIngredient[] = data?.res || []

  const ingredientFormProps = {
    fields, append, remove, potentialIngredients : ingredients ,register, forIngredients : true
  }

  const submit = async (recipe : FormValues) => {
    const formattedRecipe : IIngredientRecipe = {id :defaultValues?.id ,...formatRecipe(recipe)}
    console.log(formattedRecipe)
    saveIngredientRecipe(formattedRecipe, ingredientName)
  }

  return (
     <Box sx={{margin : 2}}>
      <FormProvider {...methods} >
      <Box component="form" onSubmit={handleSubmit(data => submit(data))} noValidate sx={{ mt: 1 }} id='form'>
      <TextField
          margin="normal"
          fullWidth
          id="instructions"
          label="Instructions"
          required
          multiline
          inputProps={{style: {fontWeight: 'bold', color : '#ffffffde'}}}
          {...register(`instructions` as const, {
            required: true
          })}
        />
        <RecipeIngredientForm {...ingredientFormProps}/>
        <TextField
          margin="normal"
          fullWidth
          id="yield"
          label="Yield"
          required
          inputProps={{style: {fontWeight: 'bold', color : '#ffffffde'}}}
          {...register(`recipeYield` as const, {
            required: true
          })}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create Recipe
        </Button>   
        </Box>
      </FormProvider >
    </Box>
  )
}