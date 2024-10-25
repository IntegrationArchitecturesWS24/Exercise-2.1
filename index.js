const express = require('express');
const axios = require('axios');
var cookieParser = require('cookie-parser');
const FormData = require('form-data');

const app = express();
app.use(cookieParser());

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/cookies", (req, res) => {
  var reqCookies = req.cookies;
  if(reqCookies.content === undefined) {
    res.cookie("content", "Hello World!")
    .send("Cookie set!");
  }
  else
    res.send(reqCookies);
});

app.get("/delete-cookies", (req, res) => {
  res.clearCookie("content").send("Cookie deleted!");
}); 

app.get("/openHrm", async (req,res) => {
  try {
    const form = new FormData();

    form.append('client_id','api_oauth_id');
    form.append('client_secret','oauth_secret');
    form.append('grant_type','password');
    form.append('username','demouser');
    form.append('password','*Safb02da42Demo$');

    const fetchToken = await axios.post('https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/oauth/issueToken', form);
    
    const token = fetchToken.data.access_token;

    const response = await axios.get('https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/search', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    res.json(response.data);
  } catch(error) {
    console.error('Error fetching data:', error);
    res.status(500).json({message: 'Error fetching data'});
  }
}); 

app.get("/openCRX", async (req,res) => {
  try {
    const params = {
      type: org.openmdx.base.Void,
      UserName: 'guest',
      password: 'guest'
    };

    const params2 = {
      queryType: 'query'
    }

    const auth = await axios.post('https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account');

    const response = await axios.get('http://localhost:8080/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account');

    res.json(auth.data)
  }catch(error) {
    console.error('Error fetching data:', error);
    res.status(500).json({message: 'Error fetching data'});
  }
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}.`);
});
