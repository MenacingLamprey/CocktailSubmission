import { IIngredientRecipe, IFormIngredient } from '../../Types'

export interface FormValues {
  instructions : string
  ingredients : IFormIngredient[]
  recipeYield : string
}

export const formatRecipe = (recipe : FormValues) : IIngredientRecipe => {
  return {
    instructions : recipe.instructions,
    isPublic : true,
    recipeYield : recipe.recipeYield,
    childIngredients : recipe.ingredients.map(ingredient => {
      const {amount, unit } = ingredient
      return {amount, unit, ingredient : {ingredientName : ingredient.ingredient}}
    })
  }
}