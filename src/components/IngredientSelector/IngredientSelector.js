import { useMemo, useState } from 'react';
import { AutocompleteInput } from '../AutocompleteInput';

import ingredients from './api/ingredientsList.json';
import fetchRecipeByIngredient from './api/fetchRecipeByIngredient';

import './IngredientSelector.css'

const IngredientSelector = ({ setRecipes, setIsLoading }) => {
  const ingredientsNames = useMemo(() => Object.keys(ingredients), []);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [suggestions, setSuggestions] = useState(ingredientsNames);

  const addIngredient = (ingredient) => {
    setSelectedIngredients([...selectedIngredients, ingredient])
    setSuggestions(suggestions.filter((suggestion) => suggestion !== ingredient));
  }

  const removeIngredient = (ingredientToRemove) => {
    const filteredIngredients = selectedIngredients.filter((ingredient) => 
      ingredient !== ingredientToRemove
    )
    setSelectedIngredients(filteredIngredients);
    /* Si borre un ingrediente, lo vuelvo a agregar a las sugerencias */
    if (filteredIngredients.length !== selectedIngredients.length) {
      setSuggestions([...suggestions, ingredientToRemove]);
    }
  }

  const handleClick = async () => {
    setIsLoading(true);
    const response = await fetchRecipeByIngredient(selectedIngredients);
    setIsLoading(false);
    /* cambiarf esto, lo puse asi apra testear nomas */
/*     setRecipes(response) */

    setRecipes(response.data);

  }

  return (
    <>
      <AutocompleteInput 
        suggestions={suggestions} 
        selectSuggestion={addIngredient} 
      />
      <button className='search-recipe-btn' onClick={handleClick}>Buscar receta</button>
      <ul className='selected-ingredients-list'>
        {selectedIngredients.map(ingredient => 
          <li key={ingredient} className='selected-ingredients-item' onClick={() => removeIngredient(ingredient)}> {ingredient} </li>
        )}
      </ul>
    </>

  )
}

export default IngredientSelector;