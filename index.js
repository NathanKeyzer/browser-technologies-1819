var express = require("express");
var bodyParser = require("body-parser");
var app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//render css files
app.use(express.static("public"));

var taskObject = {
  minor_webdev: {
    label: "Minor Webdev"
  },
  browser_tech: {
    label: "Browser Tech"
  },
  todo: {
    label: "todo"
  }
};

var complete = ["web app from scratch", "css to the rescue", "project1"];

app.post("/addtask", function(req, res) {
  var newTask = req.body.newtask;

  taskObject[newTask] = {
    label: req.body.newtask
  };
  console.log(taskObject);
  res.redirect("/");
});
app.post("/opslaan", function(req, res) {
  console.log(req.body);
  for (let taskKey in taskObject) {
    const task = taskObject[taskKey];
    console.log("deze", task);
  }

  res.redirect("/");
});
app.post("/removetask/:id", function(req, res) {
  var id = req.params.id;

  delete taskObject[id];
  res.redirect("/");
});
app.post("/check", function(req, res) {
  var completeTask = req.body.check;

  if (typeof completeTask === "string") {
    complete.push(completeTask);

    task.splice(task.indexOf(completeTask), 1);
  } else if (typeof completeTask === "object") {
    for (var i = 0; i < completeTask.length; i++) {
      complete.push(completeTask[i]);
      task.splice(task.indexOf(completeTask[i]), 1);
    }
  }
  res.redirect("/");
});

app.get("/edit/:id", function(req, res) {
  var id = req.params.id;

  res.render("index", { task: taskObject, complete: complete, editID: id });
});
app.post("/edit/:id", function(req, res) {
  taskObject[req.params.id].label = req.body.new;
  res.redirect("/");
});

app.get("/", function(req, res) {
  res.render("index", { task: taskObject, complete: complete });
});

//set app to listen on port 4000
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
