import { useState, useEffect, useRef } from "react";
import SuggestionsList from './SuggestionsList';

import styles from './AutocompleteInput.module.css'

const AutocompleteInput = ({ suggestions, selectSuggestion }) => {

  const [value, setValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

  useEffect(() => {
    const filteredSuggestions = suggestions.filter((suggestion) => 
      suggestion.toLowerCase().indexOf(value.toLowerCase()) !== -1
    )

    setFilteredSuggestions(filteredSuggestions.sort());
  }, [value, suggestions])

  const selectCurrentSuggestion = () => {
    selectSuggestion(filteredSuggestions[activeSuggestionIndex]);
    setShowSuggestions(false);
    setValue('');
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setShowSuggestions((value !== ''));
    setActiveSuggestionIndex(0);
    setValue(value);
  }

  const handleFocus = (e) => {
    setShowSuggestions(true)
  }

  const handleBlur = (e) => {
    /* Si el focus lo tiene ahora un hijo del contenedor input, no cierro las sugerencias */
    if (e.currentTarget.contains(e.relatedTarget)) return;
    setShowSuggestions(false)
  }

  /* Permite desplazarse por la lista de sugerencias usando el teclado */
  const handleKeyPress = ({ key }) => {
    /* Evito que los controles del teclado funcionen cuando las sugerencias no estan siendo mostradas pero el input esta en focus. */
    if (!showSuggestions || !filteredSuggestions.length) return;

    switch (key) {
      case 'Enter':
        selectCurrentSuggestion();
        break;
      case 'ArrowDown':
        const nextActiveSuggestionIndex = 
          activeSuggestionIndex + 1 === filteredSuggestions.length ?
          activeSuggestionIndex :
          activeSuggestionIndex + 1

        setActiveSuggestionIndex(nextActiveSuggestionIndex);
        break;
      case 'ArrowUp':
        const prevActiveSuggestionIndex =
          activeSuggestionIndex - 1 < 0 ?
          activeSuggestionIndex :
          activeSuggestionIndex - 1

        setActiveSuggestionIndex(prevActiveSuggestionIndex);
        break;
    }
  }

  const inputRef = useRef();
  const getInputYPosition = () => {
    if (inputRef.current) {
      return inputRef.current.getBoundingClientRect().bottom;
    }
  }

  return (
    <div className={styles.inputContainer} onFocus={handleFocus} /* onBlur={handleBlur} */ tabIndex={-1} onKeyDown={handleKeyPress}>
      <input onChange={handleChange} className={styles.input} value={value} ref={inputRef} placeholder={suggestions[0]} type="text"/>
      {showSuggestions &&
        <SuggestionsList
          suggestions={filteredSuggestions}
          activeSuggestionIndex={activeSuggestionIndex}
          setActiveSuggestionIndex={setActiveSuggestionIndex}
          selectCurrentSuggestion={selectCurrentSuggestion}
          getInputYPosition={getInputYPosition}
        />
      }
    </div>
  )
}

export default AutocompleteInput;