import React from 'react'
import './Home.css'
import Body from './Body.js'
import Top from './Top.js'
const BASE_API = "http://148.251.121.245:60343"
const USER = BASE_API + '/user'
const LOGIN = BASE_API + '/login'



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
