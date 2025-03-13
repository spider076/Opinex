const express = require("express");
const cors = require("express-cors");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req,res)=> {
    console.log("hi");
    return res.send("Hiii");
})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});