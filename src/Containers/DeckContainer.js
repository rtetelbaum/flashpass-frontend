import React from 'react'
import DeckComponent from '../Components/DeckComponent'
import CreateDeckComponent from '../Components/CreateDeckComponent'
import {Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import {getDecks} from '../Redux/actions'
import "@fontsource/reenie-beanie"

class DeckContainer extends React.Component {

	componentDidMount() {
		this.props.getDecks()
	}

	arrayOfDecks = () => {
		const userDecksArray = this.props.decks.filter(deckEl => deckEl.user_id === this.props.user.id)
		const sortedUserDecksArray = userDecksArray.sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
		return sortedUserDecksArray.map(deckEl => <DeckComponent key={deckEl.id} deckObj={deckEl} />)
	}

	render () {
		return (
			<div id="deckContainer">

				{this.props.user !== null ?
					<h1 style={{'color': '#FFF', 'fontFamily': 'Reenie Beanie', 'fontSize': '48px'}}>Welcome {this.props.user.first_name}!</h1>
					: 
					<h1 style={{'color': '#FFF', 'fontFamily': 'Reenie Beanie', 'fontSize': '48px'}}>Loading...</h1>
				}

				<Switch>
					<Route path="/decks/create" component={CreateDeckComponent} />
					<Route path="/decks/:id" render={routerProps => {
						const deckId = parseInt(routerProps.match.params.id)
						const foundDeck = this.props.decks.find(deckEl => deckEl.id === deckId)
						return foundDeck ? 
							(
							<>
								<DeckComponent deckObj={foundDeck} />
							</>
							)
							:
							null
					}} />
					{this.props.user === null ? null :
						<Route path="/decks" render={() => 
							// this.props.decks.filter(deckEl => deckEl.user_id === this.props.user.id).length === 0 || this.props.user === null
							this.props.user === null
							?
							<p style={{'color': '#FFF', 'fontFamily': 'Reenie Beanie', 'fontSize': '48px'}}>Please create a deck.</p>
							:
							this.arrayOfDecks()}
						/>
					}
				</Switch>
			</div>
		)
	}
}

function msp(state) {
	return {
		user: state.user,
		decks: state.decks
	}
}

function mdp(dispatch) {
	return {
		getDecks: () => dispatch(getDecks())
	}
}

export default connect(msp, mdp)(DeckContainer)