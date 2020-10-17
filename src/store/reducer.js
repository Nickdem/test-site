const initialState = {
  cards: [],
  error: null,
  loading: true
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_CARDS_SUCCESS':
      return {
        ...state, cards: action.cards, loading: action.loading
      }
    case 'FETCH_CARDS_ERROR':
      return {
        ...state, error: action.error
      }
    
    default:
      return state
  }
}