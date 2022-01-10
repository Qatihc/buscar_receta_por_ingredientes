import { React, useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'

import { Card } from '../Card'
import { IngredientSelector } from '../IngredientSelector'
import { RecipeDisplayCard } from '../RecipeDisplayCard'

const RecipeSearchCard = () => {

  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showRecipeCard, setShowRecipeCard] = useState(false);

  const recipesTitles = JSON.stringify(recipes.map((recipe) => recipe.title))

  useEffect(() => {
    if (recipes.length) setShowRecipeCard(true);
  }, [recipesTitles])

  const closeRecipeCard = () => {
    setShowRecipeCard(false);
  }

  return (
    <main className="card-search-recipes-container">
      <Card>
        <div className="card-header"> 
          <h1 className="card-title">Buscador de recetas</h1>
          <p className="card-description">Ingresa los ingredientes que tengas a mano y vamos a buscarte una receta que puedas preparar.</p>
        </div>
        <IngredientSelector setIsLoading={setIsLoading} setRecipes={setRecipes}></IngredientSelector>
      </Card>
      <AnimatePresence>
      {showRecipeCard && 
        <RecipeDisplayCard recipes={recipes} closeRecipeCard={closeRecipeCard} />}
      </AnimatePresence>
    </main>
  )
}

export default RecipeSearchCard;