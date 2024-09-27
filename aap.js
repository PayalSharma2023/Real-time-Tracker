const express = require('express');
const app = express();
const path = require("path");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const http = require("http");
const server = new http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname , "public")));
io.listen(3000);

io.on("connection", function (socket){
    socket.on("send-location", function(data){
        io.emit("receive-location", {id: socket.id, ...data})
    });

    socket.on("disconnect", function(){
        io.emit("user-disconnected", socket.id);
    })
    console.log("connected");
});


app.get("/", function (req, res) {
    res.render("index");
});
