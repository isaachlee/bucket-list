Credits = React.createClass({

	hidePage () {
		ReactDOM.unmountComponentAtNode(document.getElementById("render-quad1"))
		ReactDOM.unmountComponentAtNode(document.getElementById("render-quad2"))
		ReactDOM.unmountComponentAtNode(document.getElementById("render-quad3"))
		ReactDOM.unmountComponentAtNode(document.getElementById("render-quad4"))
	},

	render () {
		return (
			<div className>
				<ul>
					<li><a href="https://www.meteor.com"><img className='meteor-logo' src='meteor.png' /></a></li>
					<li><a href="https://www.mongodb.com"><img className='mongo-logo' src='mongodb.png' /></a></li>
					<li><a href="https://facebook.github.io/react/"><img className='react-logo' src='react.png' /></a></li>
					<li><a href="https://cordova.apache.org/"><img className='cordova-logo' src='cordova.png' /></a></li>
					<li><a href="https://github.com"><img className='github-logo' src='github.jpg'/></a></li>

				</ul>
			</div>
	  )
	}
})
