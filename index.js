const express = require("express");
const app = express();
app.use(express.static("public"));
app.listen(process.env.PORT || 3000);
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});
module.exports = app;
