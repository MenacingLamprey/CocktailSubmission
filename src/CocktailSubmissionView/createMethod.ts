import { IDrinkRecipe, IDrinkRecipeIngredient } from "../Types";
import { createBatch } from "./createBatch";
import { convertToOz } from "./convertToOz";

export const createMethodValues = (recipe : IDrinkRecipe) => {
  const batches = createBatch(recipe)
  if(!batches) return
  const [batchedCocktail] = batches

  return recipe.ingredients?.reduce((batchAndCitrus, i) => {

    const isNotBatched = batchedCocktail.find(bi => {
      return bi.ingredient?.ingredientName === i.ingredient?.ingredientName
    }) == undefined

    if(isNotBatched) return [...batchAndCitrus, i]
    const batch = batchAndCitrus.shift()!
    const roundedAmount = Math.round(4 *(batch.amount + convertToOz(i.unit)*i.amount))/4
    const updatedBatch = {...batch, amount : roundedAmount}
    return [updatedBatch, ...batchAndCitrus]
  }, [{amount : 0, unit : 'oz', ingredient : { ingredientName : 'Batch'}}] as IDrinkRecipeIngredient[])


}