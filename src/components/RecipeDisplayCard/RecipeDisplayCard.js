import { Card } from "../Card";
import { AnimatePresence, motion } from "framer-motion"
import './RecipeDisplayCard.css'

const RecipeDisplayCard = ({ recipes, closeRecipeCard }) => {
  const recipe = recipes[0];

  return (
      <motion.div className="ttest"
        key="recipeCard"
        initial={{ opacity: 0, translateY: '-20%'}}
        animate={{ opacity: 1, translateY: '0%'}}
        exit={{ opacity: 0, translateY: '20%' }}
        transition={{ ease: 'easeInOut', duration: 0.5 }}
      >
        <Card>
          <button className="recipe-card-close-btn" onClick={closeRecipeCard}>X</button>
          <div className="card-header"> 
            <h1 className="card-title">{recipe.title}</h1>
            <img className="recipe-img" src={recipe.image}></img>
          </div>
        </Card>
      </motion.div>
  )
}

export default RecipeDisplayCard;