Login = React.createClass({

  submitRegistration(event) {
    event.preventDefault();
    var emailVar = ReactDOM.findDOMNode(this.refs.registerEmail).value.trim();
    var passwordVar = ReactDOM.findDOMNode(this.refs.registerPassword).value.trim();
    Accounts.createUser({
      email: emailVar,
      password: passwordVar
    });
  },

  submitLogin(event) {
    event.preventDefault();
    var emailVar = ReactDOM.findDOMNode(this.refs.loginEmail).value.trim();
    var passwordVar = ReactDOM.findDOMNode(this.refs.loginPassword).value.trim();
    Meteor.loginWithPassword(emailVar, passwordVar);
  },

  render() {
  if(Meteor.user() == null) {
    return(
      <div>
      <h2> Please log in. </h2>
        <form onSubmit={this.submitLogin}>
          <p>Email:
          <input  type="email" ref="loginEmail"/>
          </p>
          <p>Password:
          <input type="password" ref="loginPassword"/>
          </p>
          <input type="submit" value="Login" />
        </form>

      <h2> No account? No problem. Make one now! </h2>
        <form onSubmit={this.submitRegistration}>
          <p>Email:
          <input type="email" ref="registerEmail"/>
          </p>
          <p>Password
          <input type="password" ref="registerPassword"/>
          </p>
          <input type="submit" value="Register"/>
        </form>
      </div>
      )
    } else {
      return(
      <div> HELLO WORLD </div>
      )
    }
  }
});
