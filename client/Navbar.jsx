
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
			ReactDOM.render(<AutoSlider />, document.getElementById('render-quad1'))
		ReactDOM.render(<HomeText />, document.getElementById('render-quad2'))
			} else {
			ReactDOM.render(<BucketList />, document.getElementById('render-quad1'));
  	  // ReactDOM.render(<CategoriesReact />, document.getElementById("render-quad2"));
  	  ReactDOM.render(<Map />, document.getElementById("render-quad3"));
  	}
	},

  renderBucketList (event) {
  	event.preventDefault();
		this.hidePage();
		ReactDOM.render(<BucketList />, document.getElementById('render-quad1'));
    // ReactDOM.render(<CategoriesReact />, document.getElementById("render-quad2"));
  },

	renderEvents (event) {
		event.preventDefault();
		this.hidePage();
		ReactDOM.render(<Events />, document.getElementById('render-quad2'));
	},

	renderLandingPage(event){
		event.preventDefault();
		this.hidePage();
		ReactDOM.render(<AutoSlider />, document.getElementById('render-home'));
		ReactDOM.render(<HomeText />, document.getElementById('render-quad2'));
	},

  renderForm(event){
    event.preventDefault();
    this.hidePage();
    if (Meteor.user() == null) {
    ReactDOM.render(<LoginForm />, document.getElementById('render-quad4'));
    } else {
    Meteor.logout();
    this.renderHome();
    }
  },

	render (){
		return (
			<nav>
			  <div className="nav-wrapper">
			      <ul id="nav-mobile" className="left">
							<li><a className="waves-effect middle waves-light btn-large" href="#" onClick={this.renderHome}>Home</a></li>
			      </ul>
			      <ul>
              <li className= "right middle waves-effect waves-light btn-large" onClick={this.renderForm}>login/logout</li>
            </ul>
			  </div>
			</nav>
		)
	}
});
