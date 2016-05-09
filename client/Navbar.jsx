
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
    ReactDOM.render(<LoginForm />, document.getElementById('render-quad2'));
  },

	render (){
		return (
			<nav>
			  <div className="nav-wrapper">
        <a href="#" data-activates="mobile" class="button-collapse"><i class="material-icons">menu</i></a>
			      <ul id="nav-mobile" className="left hide-on-med-and-down">
							<li><a className="waves-effect eaves-light btn" href="#" onClick={this.renderHome}>Home</a></li>
							<li><a className="waves-effect eaves-light btn" href="#" onClick={this.renderBucketList}>Personal Bucket List</a></li>
							<li><a className="waves-effect eaves-light btn" href="#" onClick={this.renderEvents}>Map</a></li>
			      </ul>
            <ul id="mobile" className="side-nav">
              <li><a className="waves-effect eaves-light btn" href="#" onClick={this.renderHome}>Home</a></li>
              <li><a className="waves-effect eaves-light btn" href="#" onClick={this.renderBucketList}>Personal Bucket List</a></li>
              <li><a className="waves-effect eaves-light btn" href="#" onClick={this.renderEvents}>Map</a></li>
            </ul>
			      <ul>
              <li className= "right waves-effect eaves-light btn" onClick={this.renderForm}>login</li>
            </ul>
			  </div>
			</nav>
		)
	}
});
