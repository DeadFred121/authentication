import React, { Component } from 'react';
import { api, setJwt } from './api/init'
import SignIn from './components/SignIn';
import decodeJWT from 'jwt-decode';
import './App.css';

class App extends Component {
  state = {
    token: localStorage.getItem('token'),
    loginError: null
  }

  handleSignIn = async (event) =>  {
    event.preventDefault()
    const form = event.target
    const elements = form.elements

    try {

      const response = await api.post('/auth', {
        email: elements.email.value,
        password: elements.password.value
      })

      this.setState({
        token: response.data.token
      })

      setJwt(response.data.token)

    } catch (error) {
      this.setState({
        loginError: error.message
      })
    }

  }
    

  render() {
    const tokenDetails = this.state.token && decodeJWT(this.state.token)
    return (
      <div className="App">
       { this.state.token ? (
        <p>
          Welcome, { tokenDetails.email }! <br />
          You logged in at: { new Date(tokenDetails.iat * 1000).toLocaleDateString() }!<br />
          Your token expires at: { new Date(tokenDetails.exp * 1000).toLocaleDateString() }!
        </p>
       ) : (
        <SignIn loginError={this.state.loginError} handleSignIn={this.handleSignIn} />
        )}
      </div>
    );

  }
    componentDidMount () {
      this.state.token && setJwt(this.state.token)

    }
}

export default App;
