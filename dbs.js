const alert = require("alert");
const mongoose = require("mongoose");
const express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
app.use(cookieParser());
app.use(
session({
secret: "mysecretkey",
resave: true,
saveUninitialized: true,
})
);
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(
bodyParser.urlencoded({
extended: true,
})
);
app.use(express.static("public"));
mongoose.connect("mongodb://127.0.0.1:27017/ServerGaurav", {
useNewUrlParser: true,
useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on("error", () => console.log("Error Connecting to Database"));
db.once("open", () => console.log("Connected to Database"));
const sch = new mongoose.Schema({
name: String,
dob: String,
session: String,
phone: Number,
email: String,
password: String,
});
const Rivera = mongoose.model("Rivera", sch);
const Gravitas = mongoose.model("Gravitas", sch);
const Clubsnchapters = mongoose.model("Clubs&Chapters", sch);
app.get("/", (req, res) => {
res.cookie("username", "John");
res.sendFile(__dirname + "/public/index.html");
});
app.post("/submit1", (req, res) => {
var mydata = new Rivera(req.body);
mydata
.save()
.then((res) => {
console.log("Data Sotred Successfully -->\n" + res);
})
.catch((e) => {
console.log("err -->" + e);
});
res.sendFile(__dirname+"/public/payment.html");
});
app.post("/send", (req, res) => {
var mydata = new Gravitas(req.body);
mydata
.save()
.then((res) => {
console.log("Data Sotred Successfully -->" + res);
})
.catch((e) => {
console.log("err -->" + e);
});
res.send("");
});
app.post("/submit2", (req, res) => {
var mydata = new Clubsnchapters(req.body);
mydata
.save()
.then((res) => {
console.log("Data Sotred Successfully -->" + res);
})
.catch((e) => {
console.log("err -->" + e);
});
res.send("");
});
app.get("/data.json", (req, res) => {
var data = [
{
username: "123",
Password: "123",
},
{
username: "Muskan",
Password: "12345",
},
];
res.send(data);
});
app.get("/home.html", (req, res) => {
req.session.loggedIn = true;
res.sendFile(__dirname + "/public/home.html");
});
app.get("/rf.html", (req, res) => {
res.sendFile(__dirname + "/public/rf.html");
});
app.get("/ev/index.html", (req, res) => {
res.sendFile(__dirname + "/public/ev/index.html");
});
app.get("/ev2/index.html", (req, res) => {
res.sendFile(__dirname + "/public/ev2/index.html");
});
app.get("/payment.html", (req, res) => {
res.sendFile(__dirname + "/public/ev/payment.html");
});
app.get("/React.html", (req, res) => {
res.sendFile(__dirname + "/public/thankyou.html");
});
app.listen("3000");