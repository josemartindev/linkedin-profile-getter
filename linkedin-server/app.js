const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios')
const fetch = require("node-fetch");
const querystring = require('query-string')
const url = "https://api.linkedin.com/v2/me"

const CLIENT_ID="77tphgacu7dzs8" //place your id here
const CLIENT_SECRET="6mnWRJO6G5goIojp" //place your secret here
const REDIRECT_URI="http://localhost:3000/auth/linkedin/callback" //place the same redirect uri from the linkedin developer website

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
    res.send(JSON.stringify({ MyHome: "Route"}));
});

app.post('/getaccesstoken', function (req, res) {
    fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      body: querystring.stringify({
        grant_type: 'authorization_code',
        code: req.body.code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET }),
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => res.json())
    .then(response =>
      axios.get(url, { headers: { Authorization: 'Bearer ' + response.access_token }
      }).then(response => {
        res.send(response.data)
      }).catch((error) => {
        console.log('Error: ' + error);
      })
    ).catch(error => console.error('Error:', error));
});

app.listen(8080, '0.0.0.0', () => {
    console.log('app now listening for requests on port 8080');
});
