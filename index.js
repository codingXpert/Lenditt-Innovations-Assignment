const express = require('express');
const app = express();
const db = require("./config/dbConnection");
const PORT = process.env.PORT || 8000;


app.listen(PORT, (err) => {
    if(err){
        console.log("Error while running the server", err);
    }else{
        console.log("Server is running on port:", PORT);
    }
});
