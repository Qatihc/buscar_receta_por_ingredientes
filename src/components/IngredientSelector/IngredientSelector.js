import { useMemo, useState } from 'react';
import { AutocompleteInput } from '../AutocompleteInput';

import ingredients from '../../const/ingredients.json'
import getRecipeByIngredient from '../../api/getRecipeByIngredient';

const IngredientSelector = () => {
  const ingredientsNames = useMemo(() => Object.keys(ingredients), []);

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [suggestions, setSuggestions] = useState(ingredientsNames);
  const [recipes, setRecipes] = useState([]);

  const addIngredient = (ingredient) => {
    setSelectedIngredients([...selectedIngredients, ingredient])
    console.log(suggestions)
    setSuggestions(suggestions.filter((suggestion) => suggestion !== ingredient));
  }

  const removeIngredient = (ingredientToRemove) => {
    const filteredIngredients = selectedIngredients.filter((ingredient) => 
      ingredient !== ingredientToRemove
    )
    setSelectedIngredients(filteredIngredients);
    /* Si borre un ingrediente, lo vuelvo a agregar a las sugerencias */
    console.log(suggestions)
    if (filteredIngredients.length !== selectedIngredients.length) {
      setSuggestions([...suggestions, ingredientToRemove]);
    }
  }

  const apiCall = async () => {
    const ingredientsEnglishNames = selectedIngredients.map((selectedIngredient) => ingredients[selectedIngredient].enlishName);
    const response = await getRecipeByIngredient(ingredientsEnglishNames);
    setRecipes(response.data[0].title)
  }

  return (
    <>
      <AutocompleteInput 
        suggestions={suggestions} 
        addIngredient={addIngredient} 
        removeIngredient={removeIngredient}
      />
      {selectedIngredients.map(ingredient => 
        <p key={ingredient} onClick={() => removeIngredient(ingredient)}> {ingredient} </p>
      )}
      <button onClick={apiCall}>Mirar</button>
      {recipes}
    </>

  )
}

export default IngredientSelector;