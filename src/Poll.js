import React from 'react'
const BASE_API = "http://148.251.121.245:60343"
const VOTE = BASE_API + '/api/vote'
const POLL = BASE_API + '/api/poll'
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
			total: 0,
			votes: [],
			names: [],
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

	initState()
	{
		let URL = POLL + '/' + this.props.id
		fetch(URL)
		.then(response => response.text())
		.then(str => console.log(str))
		/*
		.then(response => response.json())
		.then(j => {
			let question = j.text
			let tempVotes = []
			let tempChoiceID = []
			let tempChoice = []
			let tempPercent = []
			let total = 0;
			for(let i = 0; i < j.choices.length;i++)
			{
				total += j.choices[i].numVotes
				tempVotes.push(j.choices[i].numVotes)
				tempChoice
			}
		})
		*/
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
		/*let newVotes = this.state.votes;
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
		})*/
		let data = {
			choice:index
		}
		console.log(data);
		fetch(VOTE, {
  			method: 'POST', // or 'PUT'
  			headers: {
    			'Content-Type': 'application/json',
  			},
  			body: JSON.stringify(data),
		})
		.then(response => response.text())
		.then(str => console.log(str));

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

export default Poll