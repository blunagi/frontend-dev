import React from 'react'
const BASE_API = "http://148.251.121.245:60343"
const VOTE = BASE_API + '/api/vote'
const POLL = BASE_API + '/api/poll'
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
				<AddPoll />
				<div class="polls">
					<Poll />
				</div>
			</div>
		);
	}
}

class AddPoll extends React.Component{
	constructor(props)
	{
		super(props);
		this.state = {
			question: '',
			choices:['','']
		};
		this.handleQuestion = this.handleQuestion.bind(this);
		this.handleChoice = this.handleChoice.bind(this);
		this.onAdd = this.onAdd.bind(this);
		this.onDel = this.onDel.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	handleQuestion(event)
	{
		this.setState({
			question: event.target.value
		});
	}
	handleChoice(index,event)
	{
		let tempChoices = this.state.choices;
		tempChoices[index] = event.target.value;
		this.setState({
			choices: tempChoices
		})
	}
	async onSubmit(event)
	{
		console.log("submitted")
		let data = {
			text: this.state.question,
			multiple_answers: false,
			choices: this.state.choices
		};
		
		fetch(POLL, {
  			method: 'POST', // or 'PUT'
  			headers: {
    			'Content-Type': 'application/json',
  			},
  			body: JSON.stringify(data),
		})
		.then(response => response.text())
		.then(str => {console.log(str)})

	}
	onAdd(event)
	{
		if(this.state.choices.length <10)
		{
			let tempChoices = this.state.choices;
			tempChoices.push('');
			this.setState({
				choices: tempChoices
			})
		}
	}
	onDel(event)
	{
		if(this.state.choices.length>2)
		{
			let tempChoices = this.state.choices;
			tempChoices.pop()
			this.setState({
				choices: tempChoices
			})
		} 
	}
	printChoiceBoxes()
	{
		const val = this.state.choices.map((ch,index) =>
			<div style = {{"margin":"10px"}}>
				{"Choice " + (index+1)}
				<input
				type = "text"
				placeholder = {"Choice " + (index+1)}
				value = {this.state.choices[index]}
				onChange = {(e) => this.handleChoice(index,e)}/>
			</div>
			)
		return <div>{val}</div>
	}
	render()
	{
		return(
			<div class = "add-poll">
				<div style = {{"margin":"10px"}}>
				Question
				<input 
				type = "text" 
				placeholder = "Question" 
				value = {this.state.question}
				onChange = {this.handleQuestion} />
				</div>
				{this.printChoiceBoxes()}

				<div class = "add-choice" onClick = {this.onAdd}>
				Add Choice
				</div>
				<div class = "del-choice" onClick = {this.onDel}>
				Delete Choice
				</div>

				<div class = "sub-choice" onClick = {this.onSubmit}>
				Submit
				</div>
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
			id: 1,
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
		let response = await fetch(VOTE, {
  			method: 'POST', // or 'PUT'
  			headers: {
    			'Content-Type': 'application/json',
  			},
  			body: JSON.stringify(data),
		})
		console.log(response.text());

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

export default Body
