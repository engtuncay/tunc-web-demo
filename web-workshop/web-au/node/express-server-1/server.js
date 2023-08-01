//jshint esversion:6

const express = require("express");

const app = express();

app.get("/",(req, res) => {
    // console çıktı verir sout gibi
    // console.log(req);
    res.send("<h1>Hello</h1>"); // response olarak gönderir
})

app.get("/contact",(req, res) => {
    // console çıktı verir sout gibi
    // console.log(req);
    res.send("<h1>Contact</h1>"); // response olarak gönderir
})

app.get("/about",(req, res) => {
    // console çıktı verir sout gibi
    // console.log(req);
    res.send("<h1>About Page</h1>"); // response olarak gönderir
})

app.listen(3000, () => {
    console.log('Server Started on Port 3000');
});




