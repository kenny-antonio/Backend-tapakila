const express = require("express");
const user = require("./routes/userRoutes.js");
const bodyParser = require("body-parser");
const event = require("./routes/eventRoutes.js");
const cors = require("cors");
const ticket = require("./routes/ticketRoutes.js");
const reservation = require("./routes/reservationRoutes.js");
const path = require("path");

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.use('/users',user);
app.use('/events',event);
app.use('/tickets',ticket);
app.use('/reservations',reservation)
app.use('/',(req,res)=>{
    res.send("Server is running on port 8080");
})

module.exports= app;