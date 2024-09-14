import { Box, Divider, Typography } from "@mui/material";
import { createBatch } from "./createBatch";
import { createMethodValues } from "./createMethod";

import {  IDrinkContext } from "../Types";
import { createDescription } from "./createDescription";
import { useContext } from "react";
import { DrinkContext } from "../DrinkContext";


export const CocktailSubmissionForm = () => {
  const { drink } = useContext(DrinkContext) as IDrinkContext
 
  if(!drink.drinkName && !drink) return <Box>No Drink Currently Set!</Box>
  if(!drink.recipes?.length) return <Typography>{drink.drinkName}</Typography>

  const methodValues = createMethodValues(drink.recipes[0])
  const batchValues = createBatch(drink.recipes[0])
  if(!batchValues) return
  const [_, scaledBatch] = batchValues

  const batchYield = scaledBatch.reduce((amount, i) => {
    return amount + i.amount
  },0)

  
  const ingredientRecipes = drink.recipes[0].ingredients?.filter(i => {
    return i.ingredient?.recipes
  }).map(i => {
    //must exist based on filter
    return {name : i.ingredient?.ingredientName, recipe : i.ingredient!.recipes![0]}
  })

  const description = createDescription(drink.recipes[0])
  

  return(
    <Box sx = {{margin:2, height :'50%'}}>
      <Typography variant='h4'>{drink.drinkName}</Typography>
      <Box sx ={{
        display : 'grid', gridTemplateColumns:'4fr 1fr 4fr', margin : '2px'
      }}>
        <Box>
          <Box>
            <Box>
            <Typography variant='h6' sx={{margin : 1}}>Build</Typography>
              {drink.recipes![0].ingredients!.map(i => (
                <Box display ='flex' key ={i.ingredient?.ingredientName}>
                  <Typography sx={{marginRight: .5}}>{i.amount}</Typography>
                  <Typography sx={{marginRight: .5}}>{i.unit} </Typography>
                  <Typography>{i.ingredient!.ingredientName}</Typography>
                </Box>
              ))}
            </Box>
            <Box>
            <Typography variant='h6' sx={{margin:2}}>Method</Typography>
            <Box>
              {methodValues!.map(i => (
                <Box display ='flex' key ={i.ingredient?.ingredientName}>
                  <Typography>{i.amount} {i.unit} {i.ingredient!.ingredientName}</Typography>
                </Box>
              ))}
              <Typography textAlign={'left'} sx={{marginTop :'10px'}}>{description}</Typography>
            </Box>
            <Box>
              <Typography variant='h6' sx={{margin:2}}>Batch</Typography>
              <Box>
                {scaledBatch.map(i => (
                  <Box display ='flex' key ={i.ingredient?.ingredientName}>
                  <Typography sx={{marginRight: .5}}>{i.amount}</Typography>
                  <Typography sx={{marginRight: .5}}>{i.unit} </Typography>
                  <Typography>{i.ingredient!.ingredientName}</Typography>
                </Box>
                ))}
                <Typography textAlign={'left'}> Yeild : {batchYield} ml</Typography>
              </Box>
            </Box>
            </Box>
          </Box>
        </Box>
        <Divider orientation="vertical" flexItem variant="middle" sx={{opacity : 1, color: 'White' }}/>
        <Box>
          <Typography variant ='h6'>Recipes</Typography>
          <Box>
            {ingredientRecipes && ingredientRecipes.map(i => (
              <Box margin={1} key={i.name +'ir'}>
              <Typography variant='h6'>{i.name}</Typography>
              {i.recipe.childIngredients!.map((ci) => (
                <Box display ='flex' key ={ci.ingredient?.ingredientName}>
                  <Typography sx={{marginRight: .5}}>{ci.amount}</Typography>
                  <Typography sx={{marginRight: .5}}>{ci.unit} </Typography>
                  <Typography>{ci.ingredient!.ingredientName}</Typography>
                </Box>
              ))}
              <Typography sx={{textAlign : 'left', marginTop :2}}>{i.recipe?.instructions}</Typography>
              <Typography sx={{textAlign : 'left', marginTop :2}}>yield: {i.recipe?.recipeYield}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      
    </Box>
  );

}