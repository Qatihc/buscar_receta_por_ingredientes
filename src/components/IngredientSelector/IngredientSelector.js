import { useMemo, useState, useContext } from 'react';
import { RecipeContext } from '../../contexts';
import { AutocompleteInput } from '../AutocompleteInput';
import ingredients from './api/ingredientsList.json';
import fetchRecipeByIngredient from './api/fetchRecipeByIngredient';

import styles from './IngredientSelector.module.css'

const IngredientSelector = () => {
  const ingredientsNames = useMemo(() => Object.keys(ingredients), []);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [suggestions, setSuggestions] = useState(ingredientsNames);

  const recipeDispatch = useContext(RecipeContext).dispatch;

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
    recipeDispatch({type: 'fetchStart'});
    const response = await fetchRecipeByIngredient(selectedIngredients);
    recipeDispatch({type: 'fetchDone', payload: response.data});
  }

  return (
    <>
      <AutocompleteInput 
        suggestions={suggestions} 
        selectSuggestion={addIngredient} 
      />
      <button className={styles.searchRecipeBtn} onClick={handleClick}>Buscar receta</button>
      <ul className={styles.selectedIngredientsList}>
        {selectedIngredients.map(ingredient => 
          <li key={ingredient} className={styles.selectedIngredientsItem} onClick={() => removeIngredient(ingredient)}> {ingredient} </li>
        )}
      </ul>
    </>

  )
}

export default IngredientSelector;