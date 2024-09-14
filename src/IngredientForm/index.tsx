import { useContext, useState } from "react"
import { Box, Checkbox, Typography } from "@mui/material"
import { IDrinkContext, IIngredient } from "../Types"
import { IngredientTabs } from "./IngredientTabs"
import { DrinkContext } from "../DrinkContext"


export const IngredientForm = () => {

  const { drink : currentDrink } = useContext(DrinkContext) as IDrinkContext
  
  if(!currentDrink || !currentDrink?.recipes?.length ) return <Box>No Ingredients To Detail!</Box>

  const ingredients = currentDrink.recipes[0].ingredients?.filter(di => {
    return di.ingredient !== undefined
  }).map(di => di.ingredient) as IIngredient[] 

  const [selectedIndexes, setSelectedIndexs] = useState<boolean[]>(ingredients.map(_ => false))

  if(ingredients.length == 0 ) return <Box>Once You Create Your Drink You Can Update Your Recipes</Box>

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index : number) => {
    const updatedIndexes = [...selectedIndexes]
    updatedIndexes[index] = e.target.checked
    setSelectedIndexs(updatedIndexes)
  }

  const selectedIngredients = ingredients.reduce((selected, ing, index) => {
    if(selectedIndexes[index]) return [...selected, ing.ingredientName]
    return [...selected]
  },[] as string[])

  return <Box margin ={2}>
    <Box>
      <Typography>Select The Ingredients You Want To Create Recipes For</Typography>
      <Box sx ={{display: 'flex', marginTop : 2,  flexWrap : 'wrap', justifyContent : 'center'}}>
      {ingredients.map((ing, index) => (
        <Box sx={{ display : 'flex'}}>
          <Typography sx={{ alignSelf:'center' }}>{ing.ingredientName}</Typography>
          <Checkbox 
            checked={selectedIndexes[index]}
            onChange={e => handleChange(e, index)}
            inputProps={{ 'aria-label': 'controlled' }}    
          />
        </Box>
      ))}
      </Box>
    </Box>
    <IngredientTabs ingredientNames={selectedIngredients} />
  </Box>
}