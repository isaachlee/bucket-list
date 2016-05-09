
Navbar = React.createClass({

	hidePage() {
		ReactDOM.unmountComponentAtNode(document.getElementById("render-quad1"))
		ReactDOM.unmountComponentAtNode(document.getElementById("render-quad2"))
		ReactDOM.unmountComponentAtNode(document.getElementById("render-quad3"))
		ReactDOM.unmountComponentAtNode(document.getElementById("render-quad4"))
		ReactDOM.unmountComponentAtNode(document.getElementById("render-home"))

	},

	renderHome (event) {
		event.preventDefault();
		this.hidePage();
		if(Meteor.user()==null){
		    ReactDOM.render(<HomeText />, document.getElementById('render-quad2'))
			} else {
			ReactDOM.render(<BucketList />, document.getElementById('render-quad1'));
  	  ReactDOM.render(<Map />, document.getElementById("render-quad3"));
  	}
	},

  renderBucketList(event) {
  	event.preventDefault();
		this.hidePage();
		ReactDOM.render(<BucketList />, document.getElementById('render-quad1'));
    // ReactDOM.render(<CategoriesReact />, document.getElementById("render-quad2"));
  },

	renderEvents(event) {
		event.preventDefault();
		this.hidePage();
		ReactDOM.render(<Events />, document.getElementById('render-quad2'));
	},

	renderLandingPage(event){
		event.preventDefault();
		this.hidePage();
		ReactDOM.render(<HomeText />, document.getElementById('render-quad2'));
	},

  renderLogin(event){
    event.preventDefault();
    this.hidePage();
    ReactDOM.render(<Login />, document.getElementById('render-quad2'));
  },

	render (){
		return (
			<nav className="red" role="navigation">
			  <div className="nav-wrapper container">
			    <div className="navbar-header">
          <ul className="left">
            <li className="Active waves-effect waves-light btn" onClick={this.renderLandingPage}><a href="#"><i className="material-icons">view_list</i></a></li>
            <li className="waves-effect waves-light btn" onClick={this.renderHome}><a href="#" >Home</a></li>
            <li className="waves-effect waves-light btn" onClick={this.renderBucketList}><a href="#" >Personal Bucket List</a></li>
            <li className="waves-effect waves-light btn" onClick={this.renderEvents}><a href="#" >Map</a></li>
          </ul>
          <ul className="right">
            <li className="waves-effect waves-light btn" onClick={this.renderLogin}><a href="#" >Login</a></li>
          </ul>
          </div>
			  </div>
			</nav>
		)
	}
});
