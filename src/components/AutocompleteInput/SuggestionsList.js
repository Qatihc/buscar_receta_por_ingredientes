const SuggestionsList = ({ suggestions, activeSuggestionIndex, setActiveSuggestionIndex, selectSuggestion }) => {

  return (
    <div className="autocomplete-input-suggestions-container">
    <ul tabIndex="0" className="autocomplete-input-suggestions-list">
      { 
      (suggestions.length !== 0) ?
        suggestions.map((suggestion, index) => 
          <li 
            key={suggestion}
            className={`autocomplete-input-suggestion ${activeSuggestionIndex === index ? 'selected-suggestion' : ''}`}
            onMouseOver={() => setActiveSuggestionIndex(index)}
            onClick={() => selectSuggestion(index)}
          >
            {suggestion}
          </li>  
        )
      : <li className="autocomplete-input-no-suggestion-msg">Ingrediente no encontrado.</li>
      }
    </ul>
    </div>
  )
}

export default SuggestionsList;