// const API_URL = import.meta.env.VITE_API_SERVER_URL + '/ingredients'
const API_URL = "https://soiree-server-41a98b20c694.herokuapp.com/" + "/ingredients"
console.log(API_URL)

export const getIngredientsForDrinkRecipe = async () => {

  const fetchOptions = {
    method : "GET",
    headers : {
      "Content-Type": "application/json",
    }
  }
  const response = await fetch(`${API_URL}/forDrinks/a`, fetchOptions)
  return await response.json()
  
}

export const getIngredientsForIngredientRecipe = async () => {
  const fetchOptions = {
    method : "GET",
    headers : {
      "Content-Type": "application/json",
    }
  }
  const response = await fetch(`${API_URL}/forIngredients/a`, fetchOptions)
  return await response.json() 
}