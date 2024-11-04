import Express from "express";
import { Company, bonusCalculation } from "../modules/bonuscalculation.js";

const router = Express.Router();

router.get("/bonus", async (req, res) => {
  try {
    var company = new Company(req.body.company.name, req.body.company.rating);
    var items = req.body.items;
    var bonus = bonusCalculation(company, items);
    res.json({ company: company, bonus: bonus });
  } catch (error) {
    console.error("Error calculating bonus:", error);
    res.status(500).json({ message: "Error calculating bonus" });
  }
});

export default router;
