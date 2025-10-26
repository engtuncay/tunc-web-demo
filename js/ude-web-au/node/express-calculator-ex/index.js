const express = require("express");
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

// dirname : dosyanın bulunduğu adresi yazar D:\www\abcproj gibi
app.get("/", (req, res) => {
    res.sendFile( __dirname + "/index.html");
});

app.post("/",(req,res) => {

    let num1 = Number(req.body.num1);
    let num2 = Number(req.body.num2);
    let result = num1 + num2;
    res.send("The result of calculation : " + result);

})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});



