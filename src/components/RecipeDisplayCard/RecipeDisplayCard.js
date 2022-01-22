import { Card } from "../Card";
import { motion } from "framer-motion"
import styles from './RecipeDisplayCard.module.css'
import close from '../../assets/close.png'

const RecipeDisplayCard = ({ recipes, closeRecipeCard }) => {
  const recipe = recipes[0];

  return (
      <motion.div className={styles.cardContainer}
        key="recipeCard"
        initial={{ opacity: 0, translateY: '-20%'}}
        animate={{ opacity: 1, translateY: '0%'}}
        exit={{ opacity: 0, translateY: '20%' }}
        transition={{ ease: 'easeInOut', duration: 0.5 }}
      >
        <Card>
          <button className={styles.closeBtn} onClick={closeRecipeCard}><img src={close} className={styles.closeIcon}></img></button>
          <div className={styles.recipeContainer}>  
            <h1 className={styles.title}>{recipe.title}</h1>
            <img className={styles.img} src={recipe.image}></img>
          </div>
        </Card>
      </motion.div>
  )
}

export default RecipeDisplayCard;