import axios from "axios";

const fetchRecipeByIngredient = async (ingredients) => {
  const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
    params: {
      ingredients: ingredients.reduce((prev, ac) => prev + ',' + ac, ''),
      apiKey: 'a558b36c883a41f18cba5fc1cc6bc993'
    }
  })

  return response;
}

export default fetchRecipeByIngredient;