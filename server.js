const express = require("express");
const path = require("path");

let initialPath = path.join(__dirname,"public");
let app = express();

app.use(express.static(initialPath));
//Внизу говорим серверу, что сайт включаем с index.html
app.get("/",(req,res)=>{
    res.sendFile(path.join(initialPath,"index.html"));
})
//Сообщение об велючении сервера
app.listen("3000",() => {
    console.log("listening...");
})