import React, { useState, useEffect, useReducer } from 'react/cjs/react.development';
import { AnimatePresence } from 'framer-motion';

import { RecipeSearchCard } from './components/RecipeSearchCard';
import { RecipeDisplayCard } from './components/RecipeDisplayCard';
import { RecipeContext } from './contexts';
import { recipesReducer, recipesInitialState } from './reducers';

import './App.css'

function App() {
  const [state, dispatch] = useReducer(recipesReducer, recipesInitialState);
  const {isLoading, displayRecipe, recipes} = state;
  const closeRecipeCard = () => {
    dispatch({type: 'recipeClose'})
  }

  return (
    <RecipeContext.Provider value={{dispatch: dispatch}}>
      <div className="main-container">
        <RecipeSearchCard/>
        <AnimatePresence>
          {displayRecipe && 
          <RecipeDisplayCard recipes={recipes} closeRecipeCard={closeRecipeCard} />}
        </AnimatePresence>
      </div>
      {isLoading && 'loading'/* AGREGAR SPINER */}
    </RecipeContext.Provider>
  );
}

export default App;
