import styles from './Card.module.css'

const Card = ({ children, title, desc }) => {
  return (
    <div className={styles.cardContainer}>
        <div className={styles.cardHeader}> 
          <h1 className={styles.cardTitle}>{title}</h1>
          <p className={styles.cardDesc}>{desc}</p>
        </div>
      {children}
    </div>
  )
}

export default Card;