const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 3000;

const toDoList = [];

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    var today = new Date();
    var options = {
        weekday: 'long',
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleString("en-US", options);

    res.render("list", {
        kindOfDay: day,
        toDoList: toDoList
    });
});

app.post("/", (req, res) => {
    toDoList.push(req.body.toDoItem);
    // console.log(toDoList)
    res.redirect("/");
})

app.listen(port, () => console.log(`Server is running on port ${port}.`));