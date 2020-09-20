import React from 'react'
import ReactDOM from 'react-dom'
import Home from './Home.js'
import './index.css'
class Page extends React.Component{
	render()
	{
		return(<Home />);
	}
}

ReactDOM.render(<Page />, document.getElementById("root"));
