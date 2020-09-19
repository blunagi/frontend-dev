import React from 'react'
import './Home.css'

class Poll extends React.Component
{
	//props: poll_name, poll_desc
	constructor(props)
	{
		super(props);
	}
	render()
	{
		return(
			<div className = "poll">
				<div className = "poll-head">
					{this.props.poll_name}
				</div>
				
				<hr />

				<div className = "poll-desc">
					{this.props.poll_desc}
				</div>
			</div>
		)
	}
}

class Polls extends React.Component
{
	constructor(props)
	{
		super(props);
	}
	render()
	{
		return(
			<div id = "polls">
				<Poll poll_name = "Poll 1" poll_desc = "DESC1" />
				<Poll poll_name = "Poll 2" poll_desc = "DESC2" />
				<Poll poll_name = "Poll 3" poll_desc = "DESC3" />
			</div>
			);
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
				<div id = "header">
					OnlyPolls
				</div>

				<Polls />
			</div>);
	}
}
export default Home