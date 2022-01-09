import axios from "./axios";
import qs from 'qs';


const getRecipeByIngredient = async (ingredients) => {
  console.log(ingredients)
  const response = await axios.get('/recipes/findByIngredients', {
    params: {
      ingredients: ingredients.reduce((prev, ac) => prev + ',+' + ac, ''),
      apiKey: 'a558b36c883a41f18cba5fc1cc6bc993'
    }
  })
  console.log(response)
  return response;
}

export default getRecipeByIngredient;