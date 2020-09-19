import React from 'react'
const BASE_API = "http://148.251.121.245:60343"
const USER = '/api/user'
const LOGIN = BASE_API + '/login'

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
class UserAuth extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			user: '',
			pw: ''
		};

		this.handleUser = this.handleUser.bind(this);
		this.handlePw = this.handlePw.bind(this);
		this.handleSign = this.handleSign.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	async handleUser(event)
	{
		await this.setState({
			user: event.target.value
		})
	}
	async handlePw(event)
	{
		await this.setState({
			pw: event.target.value
		})
	}
	async handleSign(event)
	{
		console.log("sign in");
		let data = {
			"username": this.state.user,
			"password": this.state.pw
		}
		console.log(data);

		let response = await fetch(USER, {
  			method: 'POST', // or 'PUT'
  			headers: {
    			'Content-Type': 'application/json',
  			},
  			body: JSON.stringify(data),
		})
		

		console.log(response.text());
  		

	}
	handleLogin(event)
	{
		console.log("login");
	}
	render()
	{
		return(
			<div class = "user-auth">
				<input
				placeholder = "Username"
				type = "text"
				value = {this.state.user}
				onChange = {this.handleUser}/>
				
				<input
				placeholder = "Password"
				type = "password"
				value = {this.state.pw}
				onChange = {this.handlePw}/>
				
				<span class = "login" onClick ={this.handleLogin}>
				Login
				</span>

				<span class = "sign" onClick = {this.handleSign}>
				Sign-up
				</span>
			</div>
			);
	}
}

export default Top