import { useFieldArray, useForm, FormProvider} from 'react-hook-form'
import  { useQuery } from '@tanstack/react-query';

import { Box, Button } from '@mui/material';

import { getIngredientsForDrinkRecipe } from '../../apiServices';
import { RecipeIngredientForm } from "../RecipeIngredientForm";
import { IDrinkRecipe, IFormIngredient, IIngredient, IDrinkContext } from '../../Types';
import { formatRecipe, FormValues } from './formatRecipe';
import { RecipeFields } from './RecipeFields';
import './styles.css'
import { useContext } from 'react';
import { DrinkContext } from '../../DrinkContext';

interface IngredientResponse {
  res : IIngredient[]
  message : string
  error : boolean
}

export const DrinkRecipeForm = () => {
  
  const { drink : currentDrink, saveDrink : setCurrentDrink } = useContext(DrinkContext) as IDrinkContext
 
  const { data , error, isLoading } = useQuery<IngredientResponse>({
    queryKey : ['ingredientsForDrinks'],
    queryFn : () => getIngredientsForDrinkRecipe()
  })
  
  const defaultValues = currentDrink?.recipes && currentDrink?.recipes[0]
  
  const { glass, method, garnish , ice } = defaultValues ? defaultValues : {
    glass : "" ,
    garnish : "",
    method : "",
    ice : "",
  }

  const defaultIngredients = defaultValues?.ingredients ? defaultValues?.ingredients.map(drinkIngredient => {
    const {amount, unit, ingredient, isBatchable} = drinkIngredient
    return {ingredient: ingredient!.ingredientName, amount , unit, isBatchable}
  }) : [{ingredient : "", amount : 0, unit : "", isBatchable : false}] as IFormIngredient[]

  const methods  = useForm<FormValues>({  
    defaultValues: {
      glass,
      method,
      garnish,
      ice,
      ingredients: defaultIngredients
    },
    mode: "onBlur"
  });

  const { register, control, handleSubmit} = methods
  const { fields, append, remove } = useFieldArray({name: "ingredients", control});

  if (isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  if (error) {
    <div className="error-window">
        <h2 className="error">{error.message}</h2>
    </div>
  }

  const ingredients = data?.res || []

  const ingredientFormProps = {
    fields, append, remove, potentialIngredients : ingredients , register, forIngredients : false
  }

  const submit = async (recipe : FormValues) => {
    const formattedRecipe : IDrinkRecipe = {...formatRecipe(recipe)}
    setCurrentDrink({...currentDrink, recipes : [formattedRecipe]})
  }

  return(
    <Box>
      <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmit(data => submit(data))} noValidate sx={{ mt: 1 }} id='form'>
        <RecipeFields register={register} />
        <RecipeIngredientForm {...ingredientFormProps}/>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 1 }}
        >
          Create Drink
        </Button>   
      </Box>
      </FormProvider>
    </Box>
  )
}