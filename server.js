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
        service: 'mail.ru',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    const mailOptions = {
        from: 'adamgrella@mail.ru',
        to: 'adamgrella@mail.ru',
        subject: 'Postfolio',
        text: `First name: ${firstname}, \nLast name: ${lastname}, \nEmail: ${email}, \nMessage: ${msg}`
    }

    transporter.sendMail(mailOptions, (err, result) => {
        if (err){
            console.log(err);
            res.json('opps! it seems like some error occured plz. try again.')
        } else{
            res.json('thanks for e-mailing me. I will reply to you within 2 working days');
        }
    })
})



