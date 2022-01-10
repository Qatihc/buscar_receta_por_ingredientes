import { React } from 'react'

import { Card } from '../Card'
import { IngredientSelector } from '../IngredientSelector'

import styles from './RecipeSearhCard.module.css'

const RecipeSearchCard = () => {

  return (
    <main className={styles.recipeSearchContainer}>
      <Card
        title='Recipe search'
        desc='Ingresa ingredientes, y vamos a buscar una receta que use algunos de ellos.'
      >
        <IngredientSelector></IngredientSelector>
      </Card>
    </main>
  )
}

export default RecipeSearchCard;