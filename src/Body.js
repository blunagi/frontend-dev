import React from 'react'
import Poll from './Poll.js'
const BASE_API = "http://148.121.245:60343"
const POLL = BASE_API + '/api/poll'
const POLLS = POLL + 's'
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
					
					<img class="poll-img" src="/polls.png" alt="example poll"></img>
				</div>
				<AddPoll />
				
				<Polls />
			</div>
		);
	}
}


class Polls extends React.Component{
	constructor(props)
	{
		super(props);
		this.state = {
			IDs: []
		}
		let that = this;
		fetch(POLLS)
		.then(response => response.text())
		.then(j => console.log(j));
		/*
		.then(response => response.json())
		.then(j => {
			tempid = [];
			for(var i = 0; i < j.length; i++)
			{
				tempid.append j[i].id
			}
			that.setState(IDs: tempid)
		});
		*/
	}

	printPolls()
	{
		let lp = this.state.IDs.map((id) =>
			<Poll id = {id} />
		)
		return lp
	}
	render()
	{
		return(
			<div class = "polls">
			{this.printPolls()}
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
  			headers: new Headers({
    			'Content-Type': 'application/json',
  			}),
			credentials: "include",
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


export default Body
