import Express from 'express';
import axios from 'axios';

const router = Express.Router();

router.get("/", async (req, res) => {
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


export default router;