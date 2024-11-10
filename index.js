import express from "express";
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Import routes
import bonusRoutes from "./routes/bonus.js";
import cookiesRoutes from "./routes/cookies.js";
import salesmanRoutes from "./routes/salesman.js";
import openCRXRoutes from "./routes/opencrx.js";
import orangeHRMRoutes from "./routes/orangehrm.js";

// Use routes
app.use("/bonus", bonusRoutes);
app.use("/cookies", cookiesRoutes);
app.use("/salesman", salesmanRoutes);
app.use("/opencrx", openCRXRoutes);
app.use("/orangehrm", orangeHRMRoutes);

// Start server
app.listen(port, () => {
  console.log(`App is listening on port ${port}.`);
});
