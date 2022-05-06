const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 80
dotenv.config();

let initialPath = path.join(__dirname,"public");
let app = express();

app.use(express.static(initialPath));
app.use(express.json());
//Внизу говорим серверу, что сайт включаем с index.html
app.get("/",(req,res)=>{
    res.sendFile(path.join(initialPath,"index.html"));
})
//Сообщение об велючении сервера
app.listen(PORT,() => {
    console.log("listening...");
})


app.post('/mail', (req, res) => {
    const { firstname, lastname, email, msg } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail.com',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    const mailOptions = {
        from: 'pkakasein@gmail.com',
        to: 'pkakasein@gmail.com',
        subject: 'Новое сообщение на сайте!',
        text: `Имя: ${firstname}, \nФамилия: ${lastname}, \nПочта: ${email}, \nСообщение: ${msg}`
    }

    transporter.sendMail(mailOptions, (err, result) => {
        if (err){
            console.log(err);
            res.json('Судя по всему, случилась какая-то проблема. Пожалуйста, напишите мне - pkakasein@gmail.com')
        } else{
            res.json('Спасибо что написали мне! Скоро я вам отвечу');
        }
    })
})



