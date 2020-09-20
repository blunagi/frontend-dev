import React from 'react'
const BASE_API = "https://e13241ae3958.ngrok.io"
const VOTE = BASE_API + '/api/vote'
const POLL = BASE_API + '/api/poll'
class Bar extends React.Component{ 
	
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
			question: "",
			total: 0,
			votes: [],
			names: [],
			choice_id:[],
			percent: [],
			hasVoted:false
		}
		this.initState();
		this.handleVote = this.handleVote.bind(this);
	}

	initState()
	{
		let URL = POLL + '/' + this.props.id
		let that = this
		fetch(URL)
		.then(response => response.json())
		.then(async function(j){
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
				tempChoice.push(j.choices[i].text)
				tempChoiceID.push(j.choices[i].id)
			}

			await that.setState({
				question: question,
				total: total,
				votes: tempVotes,
				names: tempChoice,
				choice_id: tempChoiceID
			})
			
			for(let i = 0; i < j.choices.length;i++)
			{
				tempPercent.push((100 * tempVotes[i]/total).toFixed(2))
			}
			that.setState({
				percent: tempPercent
			})

		})
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
			choice:this.state.choice_id[index]
		}
		let response = await fetch(VOTE, {
  			method: 'POST', // or 'PUT'
  			headers: {
    			'Content-Type': 'application/json',
  			},
  			credentials:"include",
  			body: JSON.stringify(data),
		})
		this.initState();
		this.setState({
			hasVoted: true
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
					</div>
				);
			else
				return(
					<div className = "poll">
						<div class = "question">
							{this.state.question}
						</div>
						
						{this.printVoteList()}
					</div>
				);
	}

}

export default Poll
