import express from 'express';
import axios from 'axios';
import cookieParser from 'cookie-parser';
import FormData from 'form-data';

import {
  Company, bonusCalculation
} from './modules/bonuscalculation.js';

import { createSalesMan, 
         deleteSalesMan,
         readAllSalesMen,
         readSalesMan, 
         SalesMan, 
         SocialPerformanceRecord, 
         updateSalesMan, 
         addSocialPerformanceRecord, 
         readSocialPerformanceRecords, 
         readSocialPerformanceRecord, 
         deleteSocialPerformanceRecord } from './modules/managePersonal.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/cookies", (req, res) => {
  var reqCookies = req.cookies;
  if (reqCookies.content === undefined) {
    res.cookie("content", "Hello World!")
      .send("Cookie set!");
  }
  else
    res.send(reqCookies);
});

app.get("/delete-cookies", (req, res) => {
  res.clearCookie("content").send("Cookie deleted!");
});

app.get("/openHrm", async (req, res) => {
  try {
    const form = new FormData();

    form.append('client_id', 'api_oauth_id');
    form.append('client_secret', 'oauth_secret');
    form.append('grant_type', 'password');
    form.append('username', 'demouser');
    form.append('password', '*Safb02da42Demo$');

    const fetchToken = await axios.post('https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/oauth/issueToken', form);

    const token = fetchToken.data.access_token;

    const response = await axios.get('https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/search', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

app.get("/openCRX", async (req, res) => {
  try {
    const username = 'guest';
    const password = 'guest';

    // Encode the credentials to Base64
    const auth = Buffer.from(`${username}:${password}`).toString('base64');


    const response = await axios.get('https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.home1/provider/CRX/segment/Standard/userHome/guest/accessHistory', {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Basic ${auth}`
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

app.get("/bonus", async (req, res) => {
  try {
    var company = new Company(req.body.company.name, req.body.company.rating);
    var items = req.body.items;
    var bonus = bonusCalculation(company, items);
    res.json({ company: company, bonus: bonus });
  }
  catch (error) {
    console.error('Error calculating bonus:', error);
    res.status(500).json({ message: 'Error calculating bonus' });
  }
});


app.listen(port, () => {
  console.log(`App is listening on port ${port}.`);
});

// Manage-Personal Rest Apis

app.post("/createSalesMan", async (req, res) => {
  try {
    var actSalesMan = new SalesMan(req.body.sid,req.body.firstname,req.body.lastname);

    var result = createSalesMan(actSalesMan);

    res.json({result: result});
  }catch(error) {
    console.error('Error with fetching data:', error);
    res.status(500).json({message: 'Error creating SalesMan'});
    
  }
});

app.post("/readSalesMan", async (req, res) => {
  try {
    var sid = req.body.sid

    var result = readSalesMan(sid);

    res.json({result: result});
  }catch(error) {
    console.error('Error with fetching data:', error);
    res.status(500).json({message: 'Error reading SalesMan'});
    
  }
});

app.get("/readAllSalesMen", async (req, res) => {
  try {
    var result = readAllSalesMen();

    res.json({result: result});
  }catch(error) {
    console.error('Error with fetching data:', error);
    res.status(500).json({message: 'Error reading SalesMen'});
    
  }
});

app.post("/updateSalesMan", async (req, res) => {
  try {
    var actSalesMan = new SalesMan(req.body.sid,req.body.firstname,req.body.lastname);

    var result = updateSalesMan(actSalesMan);

    res.json({result: result});
  }catch(error) {
    console.error('Error with fetching data:', error);
    res.status(500).json({message: 'Error updating SalesMan'});
    
  }
});

app.post("/deleteSalesMan", async (req, res) => {
  try {
    var actSalesMan = new SalesMan(req.body.sid,req.body.firstname,req.body.lastname);

    var result = deleteSalesMan(actSalesMan);

    res.json({result: result});
  }catch(error) {
    console.error('Error with fetching data:', error);
    res.status(500).json({message: 'Error deleting SalesMan'});
    
  }
});

app.post("/addSocialPerformanceRecord", async (req, res) => {
  try {
    var actRecord = new SocialPerformanceRecord(req.body.gid,req.body.description,req.body.targetValue,req.body.actValue,req.body.year);
    
    var actSalesMan = new SalesMan(req.body.sid,req.body.firstname,req.body.lastname);

    var result = addSocialPerformanceRecord(actSalesMan, actRecord);

    res.json({result: result});
  }catch(error) {
    console.error('Error with fetching data:', error);
    res.status(500).json({message: 'Error creating Record'});
  }
});

app.post("/readSocialPerformanceRecords", async (req, res) => {
  try {    
    var actSalesMan = new SalesMan(req.body.sid,req.body.firstname,req.body.lastname);

    actSalesMan.gids = req.body.gids;

    var result = readSocialPerformanceRecords(actSalesMan);

    res.json({result: result});
  }catch(error) {
    console.error('Error with fetching data:', error);
    res.status(500).json({message: 'Error reading records'});
  }
});

app.post("/readSocialPerformanceRecord", async (req, res) => {
  try {    
    var gid = req.body.gid

    var result = readSocialPerformanceRecord(gid);

    res.json({result: result});
  }catch(error) {
    console.error('Error with fetching data:', error);
    res.status(500).json({message: 'Error reading record'});
  }
});

app.post("/deleteSocialPerformanceRecord", async (req, res) => {
  try {
    var actRecord = new SocialPerformanceRecord(req.body.gid,req.body.description,req.body.targetValue,req.body.actValue,req.body.year);
    
    var actSalesMan = new SalesMan(req.body.sid,req.body.firstname,req.body.lastname);

    var result = deleteSocialPerformanceRecord(actSalesMan, actRecord);

    res.json({result: result});
  }catch(error) {
    console.error('Error with fetching data:', error);
    res.status(500).json({message: 'Error deleting record'});
  }
});