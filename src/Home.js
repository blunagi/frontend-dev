import React from 'react'
import './Home.css'



class UserAuth extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			email: '',
			pw: ''
		};

		this.handleEmail = this.handleEmail.bind(this);
		this.handlePw = this.handlePw.bind(this);
	}

	async handleEmail(event)
	{
		await this.setState({
			email: event.target.value
		})
	}
	async handlePw(event)
	{
		await this.setState({
			pw: event.target.value
		})
	}
	render()
	{
		return(
			<div class = "user-auth">
				<input
				placeholder = "Email"
				type = "email"
				value = {this.state.email}
				onChange = {this.handleEmail}/>
				
				<input
				placeholder = "Password"
				type = "password"
				value = {this.state.pw}
				onChange = {this.handlePw}/>
				
				<span class = "login">
				Login
				</span>

				<span>
				Sign-up
				</span>
			</div>
			);
	}
}

class Top extends React.Component
{

	render()
	{
		return(
		<div id = "top">
			<div id = "header">
				<img src="/logo.png"></img>
			</div>
			<UserAuth />
		</div>);
	}
}

class Body extends React.Component{
	render()
	{
		return(
			<div>
				<div class = "intro">
					<div class = "webdesc">
						Lorem ipsum dolor sit amet, 
						consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
						labore et dolore magna aliqua. Ut enim ad minim veniam, 
						quis nostrud 
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						<div class = "down-arrow">
							<span class = "da">&darr;</span> View Polls
						</div>
					</div>
					
					<img class="poll-img" src="/polls.png"></img>
				</div>

				<Bar />
			</div>
		);
	}
}

class Bar extends React.Component{ 
	constructor(props)
	{
		super(props);
	}
	render()
	{
		return(
			<div class = "container">
			</div>
		);
	}

}

class Home extends React.Component
{
	constructor(props)
	{
		super(props);
	}
	render()
	{
		return(
			<div>
				<Top />

				<Body />
			</div>);
	}
}
export default Home
