import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import linkedin from './linkedin.png'
import './Home.css'
import { LinkedIn } from 'react-linkedin-login-oauth2' //gets only the authorization code
import axios from 'axios'

const CLIENT_ID = ""
const REDIRECT_URI = ""

class Home extends Component{
  state = {
    firstName: "",
    lastName: "",
    lang: "",
    country: "",
    done: false
  };

handleSuccess = (data) => {
  axios.post("http://localhost:8080/getaccesstoken", { code: data.code }) //gets accessToken and http request for profile info
  .then(response => {
    console.log("Response: ", response.data)
    this.setState({
      firstName: response.data.localizedFirstName,
      lastName: response.data.localizedLastName,
      lang: response.data.firstName.preferredLocale.language,
      country: response.data.firstName.preferredLocale.country,
      done: true
    })
  }).catch((error) => {
    console.log("ERROR: ", error)
  });
}

handleFailure = (error) => {
  console.log(error)
}

  render() {
    const { firstName, lastName, lang, country } = this.state
    return (
      <div className="App">
        <LinkedIn
        clientId={CLIENT_ID}
          scope={"r_liteprofile"}
          onFailure={this.handleFailure}
          onSuccess={this.handleSuccess}
        redirectUri={REDIRECT_URI}> {/* Same Redirect URI from linkedin developer website*/}
          <img src={linkedin} alt="Log in with Linked In" width="230"/>
        </LinkedIn><br/><br/>
        { this.state.done ?
          <div>
            <h1>PROFILE</h1><br/>
            <h3>First Name: </h3>{firstName}
            <h3>Last Name: </h3>{lastName}
            <h3>Country: </h3>{country}
          <h3>Language: </h3>{lang}
	  <br/><br/><hr/><br/>
	  <h4 style={{margin: "auto", width: "400px"}}>{"The user's profilePicture is also available in the console inside the Response object (Press F12). This is the only information that LinkedIn provides for a public profile. If you want more data, you should ask for the Marketing Developer Platform that provides more detailed data, but you need to be a real company in order to have this."}</h4>
          </div>
          : null
        }
      </div>
    )
  }
}

export default withRouter(Home)
