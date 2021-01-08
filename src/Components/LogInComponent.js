import React from 'react'
import {connect} from 'react-redux'
import {postLogin} from '../Redux/actions'
import {withRouter} from 'react-router-dom'
import Button from '@material-ui/core/Button'

class LogInComponent extends React.Component {
	state = {
		email: "",
		password: ""
	}

	changeHandler = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	submitHandler = (e) => {
		e.preventDefault()
		this.props.postLogin(this.state)
		this.props.history.push(`/decks`)
	}

	render () {
		return (
			<div id="loginComponent" style={{
				'border': '2px solid white',
				'borderRadius': '3%',
				'boxShadow': `5px 5px 5px 2px lightgrey`,
				'width': '250px',
				'padding': '15px',
				'textAlign': 'center',
				}}>
				<h3 style={{'color': 'white'}}>Log In</h3>
				<form onSubmit={(e) => this.submitHandler(e)}>
					<input className='inputOverride' style={{'marginBottom': '10px'}} type="email" name="email" placeholder="email" value={this.state.email} onChange={this.changeHandler} /><br />
					<input className='inputOverride' style={{'marginBottom': '10px'}} type="password" name="password" placeholder="password" value={this.state.password} onChange={this.changeHandler} /><br />
					<Button variant="contained" color="primary" type="submit">
						Log In
					</Button>
				</form>
			</div>
		)
	}
}

function msp(state) {
	return {
			user: state.user
	}
}

function mdp(dispatch) {
	return {
		postLogin: userInfo => dispatch(postLogin(userInfo)),
	}
}

export default connect(msp, mdp)(withRouter(LogInComponent))