import React from 'react'
const BASE_API = "http://148.251.121.245:60343"
const USER = BASE_API + '/api/user'
const LOGIN = BASE_API + '/api/login'

class Top extends React.Component
{

	render()
	{
		return(
		<div id = "top">
			<div id = "header">
				<img alt="logo" src="/logo.png"></img>
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

		fetch(USER, {
  			method: 'POST', // or 'PUT'
  			headers: {
    			'Content-Type': 'application/json',
  			},
  			body: JSON.stringify(data),
		})
		.then(response => response.text())
		.then(str => console.log(str))
  		

	}
	async handleLogin(event)
	{
		console.log("login");
		let data = {
			"username": this.state.user,
			"password": this.state.pw,
			"remember": false
		}
		console.log(data);

		fetch(LOGIN, {
  			method: 'POST', // or 'PUT'
  			headers: {
    			'Content-Type': 'application/json',
  			},
			credentials: "include",
  			body: JSON.stringify(data),
		})
		.then(response => response.text())
		.then(str => console.log(str))
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
