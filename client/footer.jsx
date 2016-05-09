Footer = React.createClass({

	hidePage () {
		ReactDOM.unmountComponentAtNode(document.getElementById("render-quad1"))
		ReactDOM.unmountComponentAtNode(document.getElementById("render-quad2"))
		ReactDOM.unmountComponentAtNode(document.getElementById("render-quad3"))
		ReactDOM.unmountComponentAtNode(document.getElementById("render-quad4"))
		ReactDOM.unmountComponentAtNode(document.getElementById("render-home"))

	},

	renderAbout (event) {
		event.preventDefault();
		this.hidePage();
		ReactDOM.render(<About />, document.getElementById('render-quad1'));
	},

	renderCredits (event) {
		event.preventDefault();
		this.hidePage();
		ReactDOM.render(<Credits />, document.getElementById('render-quad1'));
	},

	render () {
		return (
      <footer className="page-footer">
  			<div className="container">
          <div className="row">
            <div className="col 14 offset-12 s12">
              <ul className="left">
    					  <li><a href="#" className="grey-text text-lighten-3" onClick={this.renderAbout}>About</a></li>
      					<li><a href="#" className="grey-text text-lighten-3" onClick={this.renderCredits}>Credits</a></li>
                <li><a className="grey-text text-lighten-3 right" href="https://github.com/jp5486/bucket-list"> Github</a></li>
              </ul>
            </div>
          </div>
  			</div>
      </footer>
	  )
	}
})
