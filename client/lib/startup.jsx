Meteor.subscribe("bucketitems");
Meteor.subscribe("userData");
Meteor.subscribe("categories");
Meteor.subscribe("allUserData");
Meteor.subscribe("markers");
Meteor.subscribe("events");
Meteor.subscribe("images");

Meteor.startup(function () {
	ReactDOM.render(<Navbar />, document.getElementById("render-navbar"));
	ReactDOM.render(<Footer />, document.getElementById("render-footer"));
  ReactDOM.render(<HomeText />, document.getElementById("render-quad4"));
  ReactDOM.render(<Login />, document.getElementById("render-login"));

});
