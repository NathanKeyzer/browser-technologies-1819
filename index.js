var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// css bestanden
app.use(express.static("public"));

// placeholders van toegevoegde taken
var taskObject = {
  minor_webdev: {
    label: "Minor Webdev",
    isCompleted: false
  },
  browser_tech: {
    label: "Browser Tech",
    isCompleted: false
  },
  web_app_from_scratch: {
    label:"Web App From Scratch",
    isCompleted: true
  }
};

//post een nieuwe taak
app.post("/addtask", function(req, res) {
  var newTask = req.body.newtask;
  // nieuwe taak van de post
  taskObject[newTask] = {
    label: req.body.newtask,
    isCompleted: false
  };
  console.log(taskObject);
  res.redirect("/");
});

app.post("/opslaan", function(req, res) {
  console.log(req.body);
  for (var taskKey in taskObject) {
    var task = taskObject[taskKey];
    console.log("deze", task);
  }

  res.redirect("/");
});
app.post("/removetask/:id", function(req, res) {
  var key = req.params.id;
  delete taskObject[key];
  res.redirect("/");
});

app.post("/check", function(req, res) {
  var key = req.body.check; // voorbeeld: web_app_from_scratch

  if (Array.isArray(key)) {
    // check all tasks that are selected
    key.forEach(item => {
      taskObject[item].isCompleted = true
    })
  } else {
    // check one task
    taskObject[key].isCompleted = true
  }
  // voorbeeld taskObject[key]: {label: Web App From Scratch, isCompleted: false}

  // re render page
  res.redirect("/");
});

// taak aanpassen
app.get("/edit/:id", function(req, res) {
  var id = req.params.id;

  console.log("huidig", id);

  res.render("index", { task: taskObject, editID: id });
});

//post met de nieuwe naam van de taak
app.post("/edit/:id", function(req, res) {
  var key = req.params.id
  taskObject[key].label = req.body.new;

  console.log("aangepast", taskObject[key].label);

  res.redirect("/");
});
//render the ejs and display added task, completed task
app.get("/", function(req, res) {
  res.render("index", { task: taskObject });
});

//set app to listen on port 4000
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
