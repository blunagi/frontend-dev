import React from 'react'
import './Home.css'

class PollBox extends React.Component
{
	//props: poll_name, poll_desc
	constructor(props)
	{
		super(props);
	}
	render()
	{
		return(
			<div className = "pollbox">
				<div className = "pollbox-head">
					{this.props.poll_name}
				</div>
				
				<hr />

				<div className = "pollbox-desc">
					{this.props.poll_desc}
				</div>
			</div>
		)
	}
}

class PollBoxes extends React.Component
{
	constructor(props)
	{
		super(props);
	}
	render()
	{
		return(
			<div id = "pollboxes">
				<PollBox poll_name = "Poll 1" poll_desc = "DESC1" />
				<PollBox poll_name = "Poll 2" poll_desc = "DESC2" />
				<PollBox poll_name = "Poll 3" poll_desc = "DESC3" />
			</div>
			);
	}
}

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
class Home extends React.Component
{
	constructor(props)
	{
		super(props)
	}
	render()
	{
		return(
			<div>
				<Top />

				<PollBoxes />
			</div>);
	}
}
export default Home
