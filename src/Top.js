import React from 'react';
import swal from 'sweetalert';
const BASE_API = "https://onlypolls.nilsand.re:60343/"
const USER = BASE_API + '/api/user'
const LOGIN = BASE_API + '/api/login'
class Top extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state ={
			displayUser: ''
		}
		this.setDisplay = this.setDisplay.bind(this);
	}
	setDisplay(n)
	{
		this.setState({
			displayUser: n
		})
	}
	render()
	{
		if(this.state.displayUser==='')
		{
			return(
				<div id = "top">
					<div id = "header">
						<img alt="logo" src="/logo.png"></img>
					</div>
					<UserAuth setDisplay = {this.setDisplay}/>
				</div>
			);	
		}
		else{
			return(
				<div id = "top">
					<div id = "header">
						<img alt="logo" src="/logo.png"></img>
					</div>
					<div>
						<p>Logged in</p>
					</div>
				</div>
			);

		}
	}
}
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function logged_in() {
	console.log(getCookie("session"));
	return getCookie("session") !== "" && getCookie("session") != undefined;
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

		let res = await fetch(USER, {
  			method: 'POST', // or 'PUT'
  			headers: {
    			'Content-Type': 'application/json',
  			},
  			body: JSON.stringify(data),
		})
		if (res.ok)
		{
			swal("Perfect!", "Successfully signed up", "success")
		}
		else {
			swal("Username already exists", "", "error")
		}
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
		.then(str => {
			if(str!=="Unauthorized")
			{
				swal("Successfully logged in", "", "success");
				this.props.setDisplay(this.state.user);
			}
			else {
				swal("Unauthorized credentials", "", "error");
			}
		})
	}
	render()
	{
		if (logged_in())
		{
			return(null);
		}
		else {
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
					Signup
					</span>
				</div>
				);
		}
	}
}

export default Top
