const mongoose = require("mongoose");
const express = require("express");
const app = express();

const mongoDB =
    "mongodb+srv://AntraShare:antrashare2022@antrashare.z1kmw.mongodb.net/AntraShare?retryWrites=true&w=majority";

// mongoose.connect(mongoDB);
// const db = mongoose.connection;
// db.on("error", (error) => {
//     console.log("There is an error", error);
// });
// db.once("open", () => console.log("mongodb connect"));

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Connected to ${mongoDB}...`);
}).catch(console.log);

app.listen(3567, () => {
    console.log("server...");
});
