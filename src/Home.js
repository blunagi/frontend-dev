import React from 'react'
import './Home.css'
import Body from './Body.js'
import Top from './Top.js'

class Home extends React.Component
{
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
