const recipesInitialState = {
  isLoading: false,
  displayRecipe: false,
  recipes: []
}

const recipesReducer = (state, action) => {
  switch (action.type) {
    case ('fetchStart'):
      return {
        ...state,
        isLoading: true,
        displayRecipe: false
      }
    case ('fetchDone'):
      return {
        isLoading: false,
        displayRecipe: true,
        recipes: action.payload
      }
    case ('recipeClose'):
      return {
        ...state,
        displayRecipe: false,
      }
  }
}

export { recipesReducer, recipesInitialState }