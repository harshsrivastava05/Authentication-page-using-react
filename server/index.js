const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const userRouter = require("./routes/user");

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);

mongoose.connect(
    "mongodb+srv://harshsrivastava07:manya1234harsh@cluster0.bsbrmty.mongodb.net/",
    { useNewUrlParser: true, useUnifiedTopology: true, dbName: "chatappdatabase" }
  ).then(()=>{
    console.log("connected to mongoose database")
  })

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});