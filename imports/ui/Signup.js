import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }
  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    if(password.length < 8) {
      return this.setState({error: 'Password must be 8 or more characters.'});
    }

    Accounts.createUser({email, password}, (err) => {
      console.log('Signup callback', err);

      if(err) {
        this.setState({error: err.reason});
      } else {
        this.setState({error: ''});
      }
    });
  }

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Signup to SRTLNK</h1>

            {this.state.error ? <p>{this.state.error}</p> : undefined}

            <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
              <input type="email" ref="email" name="email" autoComplete="username" placeholder="Email"/>
              <input type="password" ref="password" name="password" autoComplete="new-password" placeholder="Password"/>
              <button className="button">Create Account</button>
            </form>

            <Link to="/">Have an account?</Link>
          </div>
      </div>
    );
  }
}
