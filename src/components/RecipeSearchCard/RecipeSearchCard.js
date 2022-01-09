import { React, useState } from 'react'

import { Card } from '../Card'
import { IngredientSelector } from '../IngredientSelector'

const RecipeSearchCard = ({ className }) => {

  const [ingredients, setIngredients] = useState('')
  const handleInputChange = (e) => setIngredients(e.target.value)
  
  return (
    <main className="card-search-recipes-container">
      <Card>
        <div className="card-header"> 
          <h1 className="card-title">Buscador de recetas</h1>
          <p className="card-description">Ingresa los ingredientes que tengas a mano y vamos a buscarte una receta que puedas preparar</p>
        </div>
        <IngredientSelector></IngredientSelector>
      </Card>
    </main>
  )
}

export default RecipeSearchCard;