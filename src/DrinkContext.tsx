import { createContext, ReactNode, useState } from 'react'
import { IDrink, IDrinkContext, IDrinkRecipe, IIngredientRecipe } from './Types'

export const DrinkContext = createContext<IDrinkContext | null>(null);

export const emptyDrink: IDrink = {
  drinkName : '',
  recipes : []
}

interface IProps {
  children : ReactNode
} 

export const DrinkContextProvider = ({ children } : IProps) => {
  const [drink, setDrink] = useState(emptyDrink)

  const saveDrink = (drink : IDrink) => {
    setDrink(drink)
  }

  const setDrinkName = (drinkName : string) => {
    const updatedDrink = {...drink, drinkName}
    setDrink(updatedDrink)
  }

  const saveIngredientRecipe = (recipe : IIngredientRecipe, ingredientName : string) => {
    const savedDrink = {...drink}
    if(!savedDrink.recipes) return
    const updatedIngredients = savedDrink.recipes[0].ingredients?.map(di => {
      if (di?.ingredient?.ingredientName === ingredientName) {
        di.ingredient.recipes = [recipe]
      }
      return di
    })
    const updatedRecipe : IDrinkRecipe = {...savedDrink.recipes[0], ingredients : updatedIngredients}
    return {...savedDrink, recipe : updatedRecipe}
  }

  return (
    <DrinkContext.Provider value={{ drink, saveDrink, saveIngredientRecipe, setDrinkName }}>
      {children}
    </DrinkContext.Provider>
  );
}
