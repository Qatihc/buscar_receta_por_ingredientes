import React, {useEffect, useState, useRef, useLayoutEffect} from "react";
import useSuggestionsTopOffset from "./hooks/useSuggestionsTopOffset";

import styles from './SuggestionsList.module.css'

const SuggestionsList = ({ suggestions, activeSuggestionIndex, setActiveSuggestionIndex, selectCurrentSuggestion, getInputYPosition }) => {
  const activeSuggestionRef = useRef();
  const suggestionsContainerRef = useRef();

  const inputYPosition = getInputYPosition();
  const topOffset = useSuggestionsTopOffset(suggestionsContainerRef, inputYPosition, suggestions);
  const isDisplayedUnderInput = topOffset == 'auto';
  
  useEffect(() => {
    if (suggestions.length !== 0) {
      activeSuggestionRef.current.scrollIntoView({block: 'nearest', behavior: 'instant'})
    }
  }, [activeSuggestionIndex]);

  return (
    <div 
      className={`${styles.suggestionsContainer} ${(isDisplayedUnderInput) ? styles.suggestionsListUnder : styles.suggestionsListAbove}`} 
      ref={suggestionsContainerRef} 
      style={{top: topOffset}}
    >
      <ul className={styles.suggestionsList} tabIndex={-1}>
        { 
        (suggestions.length !== 0) ?
          suggestions.map((suggestion, index) => {
            /* Solamente me interesa guardar una referencia al elemento activo, para poder scrollear a el si fuera necesario. */
            const ref = (activeSuggestionIndex === index) ? activeSuggestionRef : null;
            const activeSuggestionClass = (activeSuggestionIndex === index) ? styles.selectedSuggestion : '';
            return (
              <li 
                key={suggestion}
                className={styles.suggestionListItem + ' ' + activeSuggestionClass}
                onMouseOver={() => setActiveSuggestionIndex(index)}
                onClick={() => selectCurrentSuggestion()}
                ref={ref}
              >
                {suggestion}
              </li>  
            )
          })
        : <li className={styles.noSuggestionMsg}>Ingredient not found.</li>
        }
      </ul>
    </div>
  )
}

export default SuggestionsList;