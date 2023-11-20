const express = require('express');
const app = express();
const db = require("./config/dbConnection");
const contactTable = require("./models/contact");
const userTable = require("./models/user");
const PORT = process.env.PORT || 8000;


app.use(express.json());
app.use("/", require("./routes/user"));

app.listen(PORT, (err) => {
    if(err){
        console.log("Error while running the server", err);
    }else{
        console.log("Server is running on port:", PORT);
    }
});
