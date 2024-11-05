import Express from "express";
import axios from "axios";
import FormData from "form-data";

const router = Express.Router();

router.get("/", async (req, res) => {
  try {
    const form = new FormData();

    form.append("client_id", "api_oauth_id");
    form.append("client_secret", "oauth_secret");
    form.append("grant_type", "password");
    form.append("username", "demouser");
    form.append("password", "*Safb02da42Demo$");

    const fetchToken = await axios.post(
      "https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/oauth/issueToken",
      form
    );

    const token = fetchToken.data.access_token;

    const response = await axios.get(
      "https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/search",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Error fetching data" });
  }
});

export default router;
