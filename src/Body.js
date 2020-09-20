import React from 'react'
import swal from 'sweetalert';
import Poll from './Poll.js'

const BASE_API = "https://e13241ae3958.ngrok.io"

const POLL = BASE_API + '/api/poll'
const POLLS = POLL + 's'
class Body extends React.Component
{
	constructor(props)
	{
		super(props)
		this.state = {
			question: '',
			choices:['',''],
			IDs: []
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.handleQuestion = this.handleQuestion.bind(this);
		this.handleChoice = this.handleChoice.bind(this);
		this.onAdd = this.onAdd.bind(this);
		this.onDel = this.onDel.bind(this);

		let that = this;
		fetch(POLLS)
		.then(response => response.json())
		.then(j => {
			let tempid = [];
			for(var i = 0; i < j.length; i++)
			{
				tempid.push(j[i].id)
			}
			that.setState({
				IDs: tempid
			})
		});
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
		.then(str => {
			if (!str.includes("unauthorized"))
			{
				swal(str, "", "success");
				let that = this;
				fetch(POLLS)
				.then(response => response.json())
				.then(j => {
					let tempid = [];
					for(var i = 0; i < j.length; i++)
					{
						tempid.push(j[i].id)
					}
					that.setState({
						IDs: tempid
					})
				});
			}
			else {
				swal(str, "", "error");
			}
		})
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
				<AddPoll 
				onSubmit = {this.onSubmit}
				onAdd = {this.onAdd}
				onDel = {this.onDel}
				handleChoice = {this.handleChoice}
				handleQuestion = {this.handleQuestion}
				question = {this.state.question}
				choices = {this.state.choices}
				/>
				
				<Polls 
				IDs = {this.state.IDs}
				/>
			</div>
		);
	}
}


class Polls extends React.Component{
	
	printPolls()
	{
		let lp = this.props.IDs.map((id) =>
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

	
	printChoiceBoxes()
	{
		const val = this.props.choices.map((ch,index) =>
			<div style = {{"margin":"10px"}}>
				<p>{"Choice " + (index+1)}</p>
				<input
				type = "text"
				placeholder = {"Choice " + (index+1)}
				value = {this.props.choices[index]}
				onChange = {(e) => this.props.handleChoice(index,e)}/>
			</div>
			)
		return <div>{val}</div>
	}
	render()
	{
		return(
			<div class = "add-poll">
				<div style = {{"margin":"10px"}}>
					<p>Question</p>
				<input 
				type = "text" 
				placeholder = "Question" 
				value = {this.props.question}
				onChange = {this.props.handleQuestion} />
				</div>
				{this.printChoiceBoxes()}

				<div class = "add-choice" onClick = {this.props.onAdd}>
				Add Choice
				</div>
				<div class = "del-choice" onClick = {this.props.onDel}>
				Delete Choice
				</div>

				<div class = "sub-choice" onClick = {this.props.onSubmit}>
				Submit
				</div>
			</div>
			);
	}
}


export default Body
