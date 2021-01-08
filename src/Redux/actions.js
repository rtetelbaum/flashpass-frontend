import {
	GET_USER,
	REMOVE_USER,
	POST_USER,
	POST_LOGIN,
	POST_DECK,
	POST_CARD,
	DELETE_DECK,
	DELETE_CARD,
	PATCH_DECK_COMPLETED,
	PATCH_CARD,
	GET_DECKS
	} from './actionTypes';

const BASE_URL = "https://flashp.herokuapp.com"

export function getUser(currentUser) {
	return function (dispatch) {
		dispatch({ type: GET_USER, payload: currentUser })
	}
}

export function removeUser() {
	return function (dispatch) {
		dispatch({ type: REMOVE_USER })
	}
}

export function postUser(newUser) {
	return function (dispatch) {
		fetch(`${BASE_URL}/api/v1/users`, {
			method: 'POST',
			headers: {
				accepts: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({user: newUser}),
		})
			.then(response => response.json())
			.then(user => {
				dispatch({ type: POST_USER, payload: user })
			})
	}
}

export function postLogin(userInfo) {
	return function (dispatch) {
		fetch(`${BASE_URL}/api/v1/login`, {
			method: 'POST',
			headers: {
				accepts: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({user: userInfo}),
		})
			.then(response => response.json())
			.then(data => {
				localStorage.setItem("token", data.jwt)
				dispatch({ type: POST_LOGIN, payload: data})
			})
	}
}

export function getDecks() {
	const token = localStorage.getItem("token")
	return function (dispatch) {
		fetch(`${BASE_URL}/api/v1/decks`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		})
			.then(response => response.json())
			.then(arrayOfDecks => {
				dispatch({ type: GET_DECKS, payload: arrayOfDecks })
			})
	}
}

export function postDeck(newDeckObj) {
	const token = localStorage.getItem("token")
	return function (dispatch) {
		fetch(`${BASE_URL}/api/v1/decks`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(newDeckObj),
		})
			.then(response => response.json())
			.then(deckObj => {
				dispatch({ type: POST_DECK, payload: deckObj })
			})
	}
}

export function deleteDeck(deckObjId) {
	const token = localStorage.getItem("token")
	return function (dispatch) {
		fetch(`${BASE_URL}/api/v1/decks/${deckObjId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		})
			.then(response => response.json())
			.then(deckObj => {
				dispatch({ type: DELETE_DECK, payload: deckObjId })
			})
	}
}

export function patchDeckCompleted(deckObj) {
	const token = localStorage.getItem("token")
	return function (dispatch) {
		fetch(`${BASE_URL}/api/v1/decks/${deckObj.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(deckObj),
		})
			.then(response => response.json())
			.then(returnedDeckObj => {
				dispatch({ type: PATCH_DECK_COMPLETED, payload: returnedDeckObj })
			})
	}
}

export function postCard(newCardObj) {
	const token = localStorage.getItem("token")
	return function (dispatch) {
		fetch(`${BASE_URL}/api/v1/cards`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(newCardObj),
		})
			.then(response => response.json())
			.then(cardObj => {
				dispatch({ type: POST_CARD, payload: cardObj })
			})
	}
}

export function deleteCard(cardObj) {
	const token = localStorage.getItem("token")
	return function (dispatch) {
		fetch(`${BASE_URL}/api/v1/cards/${cardObj.id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		})
			.then(response => response.json())
			.then(data => {
				dispatch({ type: DELETE_CARD, payload: cardObj })
			})
		}
}

export function patchCard(updatedCardObj) {
	const token = localStorage.getItem("token")
	return function (dispatch) {
		fetch(`${BASE_URL}/api/v1/cards/${updatedCardObj.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(updatedCardObj),
		})
			.then(response => response.json())
			.then(cardObj => {
				dispatch({ type: PATCH_CARD, payload: cardObj })
			})
	}
}