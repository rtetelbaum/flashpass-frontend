import {combineReducers} from 'redux'

const defaultState = {
	users: [],
	decks: [],
	cards: [],
	currentUserId: 1
}

function usersReducer(prevState = defaultState.users, action) {
	switch (action.type) {
		case "GET_USERS" :
			console.log(action)
			console.log(prevState)
			return action.payload
		default :
			return prevState
	}
}

function decksReducer(prevState = defaultState.decks, action) {
	switch (action.type) {
		case "GET_DECKS" :
			return action.payload
		case "POST_DECK" :
			return [...prevState, action.payload]
		default :
			return prevState
	}
}


function currentUserIdReducer(prevState = defaultState.currentUserId, action) {
	switch (action.type) {
		case "GET_CURRENTUSERID":
			return prevState
		default: 
			return prevState 
	}
}

const rootReducer = combineReducers({
	users: usersReducer,
	decks: decksReducer,
	// cards: cardsReducer,
	currentUserId: currentUserIdReducer
})

export default rootReducer