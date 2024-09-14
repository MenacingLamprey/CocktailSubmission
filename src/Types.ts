export interface IUser {
  userId? : string
  userName : string
  email : string
  isBuisness : boolean
  contributors : IUser[]
  discoverable : boolean
  friends : IUser[]
  preferredDrinkRecipes : IDrinkRecipe[]
  preferredIngredientRecipes : IIngredientRecipe[]
  preferredIngredientBrands : IIngredientBrand[]
  createdDrinks : IDrink[]
  createdIngredients?: IIngredient[]
}

export interface IDrink {
  id? : number
  drinkName : string
  user? : IUser
  recipes? : IDrinkRecipe[]
}

export type ISimpleDrink = { glass : string, garnish : string, method : string}

export interface IDrinkRecipe {
  id? : number
  numIngredients : number
  glass : string
  garnish : string
  method : string
  ice : string
  description? : string
  drink? : IDrink
  user? : IUser
  ingredients? : IDrinkRecipeIngredient[]
}

export interface IDrinkRecipeIngredient {
  id? : number
  amount : number
  unit : string
  drinkRecipe? : IDrinkRecipe
  ingredient? : IIngredient
  isBatchable : boolean
}

export interface IIngredient {
  id? : number
  ingredientName : string
  user? : IUser
  family? : IIngredientFamily
  recipes? : IIngredientRecipe[]
  brands? : IIngredientBrand[]
  drinks? : IDrink[]
  forIngredientRecipe ? : boolean
  forDrinkRecipe ? : boolean
  isOwner ? : boolean
}

export interface IIngredientRecipe {
  id? : number
  instructions : string
  user? : IUser
  recipeYield? : string
  parentIngredient? : IIngredient
  childIngredients? : IIngredientRecipeIngredient[]
}

export interface IIngredientRecipeIngredient {
  id? : number
  ingredientRecipeId? : number
  amount : number
  unit : string
  parentIngredient? : IIngredient
  recipe? : IIngredientRecipe
  ingredient? : IIngredient
}

export interface IIngredientFamily {
  familyName : string
  id? : number
  ingredients? : IIngredient[]
  childFamilies? : IIngredientFamily[]
  parentFamily? : IIngredientFamily
}

export interface IIngredientBrand {
  userId : string
  id? : number
  name : string
  cost : number
  volume : number
  unit : string
  ingredient : IIngredient
}

export interface InitResponse {
  error: boolean,
  message: string,
  user : IUser,
  allDrinks : IDrink[]
}

export interface IFormIngredient {
  ingredient: string;
  amount: number;
  unit: string
  isBatchable : boolean
}

export interface IDrinkContext {
  drink : IDrink
  saveDrink : (drink : IDrink) => void
  saveIngredientRecipe : (recipe : IIngredientRecipe, ingredientName : string ) => void
  setDrinkName : (drinkName : string) => void
}