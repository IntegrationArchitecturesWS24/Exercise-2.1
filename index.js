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
    const form


    const response = await axios.post('https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/oauth/issueToken', 
      {
        Headers: {

        }
      });
    
    res.json(response.data)
  } catch(error) {
    console.error('Error fetching data:', error);
    res.status(500).json({message: 'Error fetching data'});
  }
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}.`);
});
