import { useState, useEffect } from "react";
import SuggestionsList from './SuggestionsList';

import './AutocompleteInput.css'

const AutocompleteInput = ({ suggestions, addIngredient }) => {

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

  const handleChange = (e) => {
    setActiveSuggestionIndex(0);
    setValue(e.target.value);
  }

  const handleFocus = (e) => {
    setShowSuggestions(true)
  }

  const handleBlur = (e) => {
    /* Si clickeo en un hijo del contenedor, no cierro las sugerencias */
    if (e.currentTarget.contains(e.relatedTarget)) return;
    setShowSuggestions(false)
  }

  const selectSuggestion = (index) => {
    addIngredient(filteredSuggestions[index]);
    setShowSuggestions(false);
    setValue('');
  }

  return (
    <div className="autocomplete-input-container" onFocus={handleFocus} onBlurCapture={handleBlur}>
      <input onChange={handleChange} className="autocomplete-input-input" value={value}/>
      {showSuggestions &&
        <SuggestionsList
          suggestions={filteredSuggestions}
          activeSuggestionIndex={activeSuggestionIndex}
          setActiveSuggestionIndex={setActiveSuggestionIndex}
          selectSuggestion={selectSuggestion}
        />
      }
    </div>
  )
}

export default AutocompleteInput;