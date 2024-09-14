import { IDrinkRecipe, IFormIngredient } from "../../Types";

export type FormValues = {
  recipeName : string
  drinkName : string;
  glass : string;
  method : string;
  garnish : string;
  ice : string;
  ingredients: IFormIngredient[];
};



export const formatRecipe = (recipe: FormValues) : IDrinkRecipe => {
  return {
    recipeName : recipe.recipeName,
    numIngredients : recipe.ingredients.length,
    glass : recipe.glass,
    garnish : recipe.garnish,
    method : recipe.method,
    ice : recipe.ice,
    isPublic : true,
    ingredients : recipe.ingredients.map(ingredient => {
      return {
        amount : ingredient.amount,
        unit : ingredient.unit,
        ingredient : {
          ingredientName : ingredient.ingredient
        },
        isBatchable : ingredient.isBatchable
      }
    })
  }
}
