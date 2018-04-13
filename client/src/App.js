import React, { Component } from 'react';
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'
import SignUpLogIn from './components/SignUpLogIn'
import axios from 'axios'
import FacilitiesList from './components/FacilitiesList'
import {saveAuthTokens, setAxiosDefaults, userIsLoggedIn, clearAuthTokens} from './util/SessionHeaderUtil'

export default class App extends Component {

  state = {
    signedIn: false,
    facilities: []
  }

  async componentWillMount() {
    try {
      const signedIn = userIsLoggedIn()
      let facilities = []
      if(signedIn) {
        setAxiosDefaults()
        facilities = await this.getFacilities()
      }
      this.setState({
        facilities,
        signedIn
      })
    } catch (error) {
      console.log(error)
    }
  }

  getFacilities = async () => {
    try {
      const response = await axios.get('/facilities')
      return response.data
    } catch (error) {
      console.log(error)
      return []
    }
  }

  signUp = async (email, password, password_confirmation) => {
    try {
      const payload = {
        email,
        password,
        password_confirmation
      }
      const response = await axios.post('/auth', payload)
      saveAuthTokens(response.headers)

      this.setState({signedIn: true})
    } catch (error) {
      console.log(error)
    }
  }

  signIn = async (email, password) => {
    try {
      const payload = {
        email,
        password
      }
      const response = await axios.post('/auth/sign_in', payload)
      saveAuthTokens(response.headers)
      const facilities = await this.getFacilities()
      this.setState({
        signedIn: true,
        facilities
      })
    } catch (error) {
      console.log(error)
    }
  }

  signOut = async(event) => {
    try {
      event.preventDefault()
      await axios.delete('/auth/sign_out')
      clearAuthTokens()
      this.setState({signedIn: false})
    } catch (error) {
      console.log(error)
    }
  }

  render() {

    const SignUpLogInComponent = () => (
      <SignUpLogIn
        signUp={this.signUp}
        signIn={this.signIn}/>
    )

    const FacilitiesComponent = () => (
      <FacilitiesList
        facilities={this.state.facilities}/>
    )

    return (
      <Router>
        <div>
          <button onClick={this.signOut}>Sign Out</button>
          <Switch>
            <Route exact path="/signUp" render={SignUpLogInComponent} />
            <Route exact path="/facilities" render={FacilitiesComponent}/>
          </Switch>

          {this.state.signedIn ? <Redirect to="/facilities"/> : <Redirect to="/signUp"/>}
        </div>
      </Router>
    );
  }
}

