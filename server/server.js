const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Running ");
});

app.use("/api/signup", require("./routes/signUp"));
app.use("/api/signin", require("./routes/signIn"));

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.ATLAS_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    writeConcern: { w: "majority", j: true, wtimeout: 1000 },
  })
  .then(() => console.log("Database Successfully Connected"))
  .catch((error) => console.log(error));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running on Port - ${port}`);
});
module.exports = app;
