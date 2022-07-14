const express = require("express");
const resource = require("./app");
require("dotenv").config({ path: "./vars/.env" });

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/productos", resource);

app.get("/", (req, res) => {
  res.render(__dirname + "/public.index.html");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
