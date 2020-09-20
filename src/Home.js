import React from 'react'
import './Home.css'
import Body from './Body.js'
import Top from './Top.js'
const BASE_API = "http://148.251.121.245:60343"



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
