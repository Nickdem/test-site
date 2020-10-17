import { cards } from './data'

export function giveMeCards() {
    return async dispatch => {
        try {
            await dispatch(fetchCardsSuccess(cards))
        } catch (e) {
            dispatch(fetchCardsError(e))
        }
    }
}

export function selectCard(card) {
    cards.find(c => c.title.subname === card.title.subname)
    return async dispatch => {
        dispatch(fetchCardsSuccess(cards))
    }
}

function fetchCardsSuccess(cards) {
    return{
        type: 'FETCH_CARDS_SUCCESS',
        cards,
        loading: false
    }
}

function fetchCardsError(e) {
    return{
        type: 'FETCH_CARDS_ERROR',
        error: e
    }
  }