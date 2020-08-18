const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 3000;

let toDoList = ["Buy Food", "Cook Food"];
let workItems = [];


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

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
        listTitle: day,
        newListItems: toDoList
    });
});

app.get("/work", (req, res) => {
    console.log(req.body)
    res.render("list", {
        listTitle: "Work List",
        route: "work",
        newListItems: workItems
    })
});

app.post("/work", (req, res) => {
    console.log(req.body)
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work")
})

app.post("/", (req, res) => {
    
    if(req.body.list === "Work") {
        workItems.push(req.body.toDoItem);
        res.redirect("/work");
    } else {
        toDoList.push(req.body.toDoItem);
        res.redirect("/");
    }
    // console.log(req.body.toDoItem);
})

app.listen(port, () => console.log(`Server is running on port ${port}.`));