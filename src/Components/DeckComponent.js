import React from 'react'
import {Route, Switch, NavLink} from 'react-router-dom'
import CardComponent from './CardComponent'
import CreateCardComponent from './CreateCardComponent'
import DeleteDeckComponent from './DeleteDeckComponent'
import ToggleCompletedComponent from './ToggleCompletedComponent'
import {connect} from 'react-redux'

function DeckComponent(props) {

	// const lastCardId = props.deckObj.cards[props.deckObj.cards.length - 1].id
	// console.log(lastCardId)
	
	const arrayOfCards = () => {
		return props.deckObj.cards.map(cardEl => <CardComponent key={cardEl.id} cardObj={cardEl} />)
	}

	return (
		<div>
			<h1>Deck Component</h1>
			<NavLink to={`/decks/${props.deckObj.id}/cards/${props.deckObj.cards[0].id}`}>
				<h3>{props.deckObj.title}</h3>
			</NavLink>	
			<p>{props.deckObj.subject}</p>
			<p>{props.deckObj.completed ? "Completed" : "Not Completed"}</p>
			<p>Card Count: {props.decks.find(deck => deck.id === props.deckObj.id).cards.length}</p>
			<ToggleCompletedComponent currentDeck={props.deckObj} />
			<DeleteDeckComponent currentDeckId={props.deckObj.id} /> 
			<CreateCardComponent currentDeckId={props.deckObj.id} />
			<Switch>
				<Route path="/decks/:id/cards/:id" render={routerProps => {
					const cardId = parseInt(routerProps.match.params.id)
					const foundCard = props.deckObj.cards.find(cardEl => cardEl.id === cardId)
					return foundCard ? <CardComponent cardObj={foundCard} /> : <h3>Loading...</h3>
				}} />
				<Route exact path="/decks/:id/cards" render={() => arrayOfCards()} />
			</Switch>
		</div>
	)
}

function msp(state) {
	return {
		decks: state.decks,
	}
}

export default connect(msp)(DeckComponent)