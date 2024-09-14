import { IDrinkRecipe, IDrinkRecipeIngredient } from "../Types";
import { convertToOz } from "./convertToOz";

const createsSingleBatch = (ingredients : IDrinkRecipeIngredient[]) => {
  return ingredients.reduce((batch,i) => {
    console.log(i)
    if(!i.ingredient) return batch
    if (i.isBatchable) return [...batch, {...i}]
    return batch
  }, [] as IDrinkRecipeIngredient[]) 
} 

const determineRounding = (ratio : number) => {
  //less than 50 ml
  if (ratio < 1/35) return 2.5 * Math.round(ratio* 1750/2.5)
  //less than 250 ml
  if (ratio < 1/7) return 5 * Math.round(ratio* 1750/5)
  //otherwise
  return 25 * Math.round(ratio* 1750/25)
}

const scaleBatch = (batch : IDrinkRecipeIngredient[]) => {

  const largestIngredient = batch.reduce((largest : IDrinkRecipeIngredient, i) => {  
    if(convertToOz(i.unit) * i.amount > largest.amount) {
      return {...i}
    } else {
      return largest
    }
  }, {...batch[0]})

  const scaledLargestIngredient = {...largestIngredient, amount : 1750, unit :'ml'}

  const scaledBatch : IDrinkRecipeIngredient[] = batch.map(i =>{
    if(i.ingredient?.ingredientName == scaledLargestIngredient.ingredient?.ingredientName){
      return scaledLargestIngredient
    }
    const ratio = i.amount*convertToOz(i.unit)/(largestIngredient.amount*convertToOz(largestIngredient.unit))
    return {...i, amount : determineRounding(ratio) ,unit : 'ml'}
  })

  return scaledBatch
}

export const createBatch = (recipe : IDrinkRecipe) => {
  if(!recipe.ingredients) return
  const batchedCocktail : IDrinkRecipeIngredient[] = createsSingleBatch(recipe.ingredients)
  return [batchedCocktail, scaleBatch(batchedCocktail)]
} 