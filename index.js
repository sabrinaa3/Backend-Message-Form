var express = require('express');
var http = require('http');
var path = require('path');
var nodemailer = require('nodemailer');

var app = express();
var server = http.Server(app);
var port = 400;

app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "page")));

// Routing 
app.get("/", function(req, response) {
    response.sendFile(path.join(__dirname, "index.html"));
})

app.post("/send_email", function(req, res) {
    var from = req.body.from;
    var subject = req.body.subject;
    var message = req.body.message; 

    var transporter = nodemailer.createTransport ({
        service: 'gmail',
        auth: {
            user: "sabrina.tj.a.06@gmail.com",
            pass: "uixykfcrykwvwqpb",
        }
    });

    var mailOptions = {
        from: from, 
        to: "sabrina.tj.a.06@gmail.com", 
        subject: subject, 
        text: message
    }

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error)
            res.redirect("/?success=false"); // Redirect with failure indicator
        } else {
            console.log("Email Send: " + info.response)
            res.redirect("/?success=true"); // Redirect with success indicator
        }
    })
})

// initilize web server
server.listen(port, function(){
    console.log("Starting server on port: " + port)
})