import { IDrinkRecipe } from "../Types";

export const createDescription = (recipe : IDrinkRecipe) => {

  const { method, garnish, glass, ice } = recipe

  let description = ""

  if (method === 'Shaken') {
    description = "Add ingredients and ice to shaker, seal and shake for about 15 seconds."
  } else if (method === 'Stirred') {
    description = "Add ingredients to mixing glass, stir for about 30 seconds."
  } 

  description = description.concat(` Strain in to ${glass} with ${ice}. Garnish with ${garnish}`)

  return description
}