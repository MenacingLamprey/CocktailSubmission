import { IDrink, IIngredientRecipe } from "../Types";

const simpleSyrupRecipe : IIngredientRecipe = {
  childIngredients : [
    { 
      amount : 750,
      unit : 'g',
      ingredient : {ingredientName : "Sugar"}
    },
    {
      amount : 1000,
      unit : 'ml',
      ingredient : {ingredientName : 'Water'}
    },
  ],
  instructions : "Mix sugar and hot water, stir untill sugar is dissolved",
  recipeYield : '1500 ml',
}

export const drink : IDrink = {
  drinkName : 'Old Fashioned',
  recipes : [
    {
      glass : "Rocks' Glass",
      garnish : "Orange Expression",
      method : "Stirred",
      numIngredients : 3,
      ice : "large ice cube",
      description : "Pour batch into mxing glass, stir for around 40 seconds. Pour in to rocks glass. Place large ice cube. Express orange and place peel in glass",
      ingredients : [
        {
          amount : 2,
          unit : "oz",
          ingredient : {
            ingredientName : "Bourbon",
          },
          isBatchable : true
        },
        {
          amount : 2,
          unit : "dashes",
          ingredient : {
            ingredientName : "Angostura Bitters",
          },
          isBatchable : true
        },
        {
          amount : .25,
          unit : "oz",
          ingredient : {
            ingredientName : "Simple Syrup",
            recipes : [simpleSyrupRecipe]
          },
          isBatchable : true
        }         
      ]
    }
  ]
} 