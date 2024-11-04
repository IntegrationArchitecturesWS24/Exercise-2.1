import express from "express";
import {
  createSalesMan,
  deleteSalesMan,
  readAllSalesMen,
  readSalesMan,
  SalesMan,
  SocialPerformanceRecord,
  updateSalesMan,
  addSocialPerformanceRecord,
  readSocialPerformanceRecords,
  readSocialPerformanceRecord,
  deleteSocialPerformanceRecord,
} from "../modules/managePersonal.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    var actSalesMan = new SalesMan(
      req.body.sid,
      req.body.firstname,
      req.body.lastname
    );

    if (!createSalesMan(actSalesMan))
      return res.status(400).json({ error: "Salesman already exists" });

    res.status(201).send();
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed creating salesman" });
  }
});

router.get("/:sid", async (req, res) => {
  try {
    var sid = req.params.sid;

    var result = readSalesMan(sid);
    if (!result) return res.json({ error: "Salesman not found" }, 404);

    res.json(result);
  } catch (error) {
    console.error("Error with fetching data:", error);
    res.status(500).json({ error: "Failed reading salesman" });
  }
});

router.get("/", async (req, res) => {
  try {
    var result = readAllSalesMen();
    res.json(result);
  } catch (error) {
    console.error("Error with fetching data:", error);
    res.status(500).json({ error: "Failed reading all salesman" });
  }
});

router.put("/", async (req, res) => {
  try {
    var updatedSalesman = new SalesMan(
      req.body.sid,
      req.body.firstname,
      req.body.lastname
    );
    req.body.gids.forEach((gid) => {
      updatedSalesman.addSocialPerformanceRecord(gid);
    });

    if (!updateSalesMan(updatedSalesman))
      return res.status(400).json({ error: "Salesman not found" });
    res.status(202).send();
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error updating salesman" });
  }
});

router.delete("/:sid", async (req, res) => {
  try {
    var salesman = readSalesMan(req.params.sid);

    if (!salesman) return res.status(404).json({ error: "Salesman not found" });

    if (!deleteSalesMan(salesman))
      return res.status(500).json({ error: "Failed deletiing salesman" });

    res.status(202).send();
  } catch (error) {
    console.error("Error with fetching data:", error);
    res.status(500).json({ error: "Failed deleting SalesMan" });
  }
});

router.post("/:sid/record", async (req, res) => {
  try {
    var salesman = readSalesMan(req.params.sid);

    if (!salesman) return res.status(404).json({ error: "Salesman not found" });

    var record = new SocialPerformanceRecord(
      req.body.gid,
      req.body.description,
      req.body.targetValue,
      req.body.actValue,
      req.body.year
    );

    if (!addSocialPerformanceRecord(salesman, record))
      return res.status(400).json({ error: "Record already exists" });
    res.status(201).send();
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed creating Record" });
  }
});

router.get("/:sid/record", async (req, res) => {
  try {
    var salesman = readSalesMan(req.params.sid);
    if (!salesman) return res.status(404).json({ error: "Salesman not found" });

    res.status(200).json(readSocialPerformanceRecords(salesman));
  } catch (error) {
    console.error("Error with fetching data:", error);
    res.status(500).json({ error: "Failed reading records" });
  }
});

router.delete("/:sid/record/:gid", async (req, res) => {
  try {
    var salesman = readSalesMan(req.params.sid);
    if (!salesman) return res.status(404).json({ error: "Salesman not found" });

    var record = readSocialPerformanceRecord(req.params.gid);

    if (!deleteSocialPerformanceRecord(salesman, record))
      return res.status(500).json({ error: "Failed deleting record" });

    res.status(202).send();
  } catch (error) {
    console.error("Error with fetching data:", error);
    res.status(500).json({ message: "Error deleting record" });
  }
});

export default router;