import Express from "express";
const router = Express.Router();

router.get("/", (req, res) => {
  var reqCookies = req.cookies;
  if (reqCookies.content === undefined) {
    res.cookie("content", "Hello World!").send("Cookie set!");
  } else res.send(reqCookies);
});

router.get("/delete", (req, res) => {
  res.clearCookie("content").send("Cookie deleted!");
});

export default router;
