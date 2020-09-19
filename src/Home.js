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
				placeholder = "Username"
				type = "text"
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

			<Poll />


			</div>
		);
	}
}

class Bar extends React.Component{ 
	constructor(props)
	{
		super(props);
		console.log(this.props);
	}
	render()
	{
		let p = this.props.percent;
		let message = this.props.percent;
		if(p === " ")
		{
			p = "0%";
			message = " "
		}
		return(
			<div class = "container">
				<div style = {{
					textAlign:"left",
					paddingLeft: "3px",
					minHeight:"100%",
					borderRadius: "10px",
					borderBottomRightRadius:"10px",
					width:p,
					backgroundColor:'#ef514d'}}>
						{message}
				</div>
			</div>
		);
	}

}


class Poll extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state ={
			question: "Cats or Dogs?",
			desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
			id: "ID",
			total: 5,
			votes: [2,3],
			names: ["Woof!", "Nya?"],
			percent: [],
			hasVoted:false
		}
		let newPercent = new Array(this.state.votes.length);
		let i = 0;
		for(;i<this.state.votes.length;i++)
		{
			newPercent[i] = this.getPercent(this.state.votes[i]);
		}
		console.log(newPercent);
		this.setState({
			percent: newPercent
		});

		this.handleVote = this.handleVote.bind(this);
	}

	printVoteList()
	{
		const pList = this.state.names.map((n,index) =>
			<div className = "option" key = {index} onClick={(e)=>this.handleVote(index,e)} >
				{n}
				<Bar percent = " " />

			</div>
		);

		return(pList);
	}
	async handleVote(index,e)
	{
		let newVotes = this.state.votes;
		newVotes[index]++;
		await this.setState({
			total: this.state.total+1
		})
		let newPercent = new Array(this.state.votes.length);
		let i = 0;
		for(;i<this.state.votes.length;i++)
		{
			newPercent[i] = this.getPercent(this.state.votes[i]);
		}
		this.setState({
			hasVoted:true,
			percent: newPercent,
			votes:newVotes
		})
	}
	printVotedList()
	{
		const pList = this.state.names.map((n,index) =>
			<div className = "option" key = {index}>
				<div>
					<span>{n}</span>
					<Bar percent = {this.state.percent[index] + "%"} />
				</div>
				
			</div>
		);

		return(pList);
	}
	getPercent(n)
	{
		return (100*n/this.state.total).toFixed(2);
	}
	render()
	{
			if(this.state.hasVoted)
				return(
					<div className = "poll">
						<div class = "question">
							{this.state.question}
						</div>
						
						{this.printVotedList()}

						<div class = "poll-desc">
							{this.state.desc}
						</div>
					</div>
				);
			else
				return(
					<div className = "poll">
						<div class = "question">
							{this.state.question}
						</div>
						
						{this.printVoteList()}

						<div class = "poll-desc">
							{this.state.desc}
						</div>
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
