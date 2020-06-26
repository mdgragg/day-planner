var planner = [];

//sets up planner with any tasks stored in local memory if there are any
function setUpPlanner() {
    if (localStorage.getItem("planner")) {
        planner = JSON.parse(localStorage.getItem("planner"));
        for (var i = 0; i < planner.length; i++) {
            var hour = planner[i].hour;
            var task = planner[i].task;
            $("#" + hour)[0].children[1].children[0].value = task;
        }
        // console.log($("#" + hour)[0].children[1].children[0].value);
    }
}

//Sets up time dependen elements. The current date is set up using moment.js
//Sets up the color coding of each text area according to the current time.
function setUpTimedElements() {
    var now = moment();
    // console.log(now);
    // console.log(moment().format("dddd" + ", " + "MMMM Do"));
    $("#date").text(moment().format("dddd" + ", " + "MMMM Do"))
    // console.log(moment().format("H"));
    var currentHour = parseInt(moment().format("H"));
    //i = id and hour form elements
    for (var i = 9; i < 18; i++) {
        // console.log($("#" + i).children(".input-text"));
        if (i < currentHour) {
            $("#" + i).children(".input-text").children().css({"background-color": "#4f625c", "color": "white"});
        } else if (i === currentHour) {
            $("#" + i).children(".input-text").children().css("background-color", "#7f8e89");
        } else {
            $("#" + i).children(".input-text").children().css("background-color", "#e0dfe5");
        }
    }
}

//Saves task upon clicking save button
$(".save").on("click", function () {
    //look for id/hour and input of element.     console.log("ID of this: " +id);
    var id = parseInt($(this).parent().parent()[0].id);
    var input = $(this).parent()[0].previousElementSibling.childNodes[1].value;

    //check if planner item is set
    if (localStorage.getItem("planner")) {
        //if planner is set get it and check if we need to create a new task or update an existing one; console.log(planner);   

        planner = JSON.parse(localStorage.getItem("planner"));
        var index = -1;
        for (var i = 0; i < planner.length; i++) {
            //if id is found in planner then we need to update task
            if (planner[i].hour === id) {
                index = i;
            }
        }
        //if index is -1 id was not found and we need to create a new task to push
        //if index is found just update task on planner variable;    console.log("Index: " + index);
        if (index === -1) {
            addTask(id, input);
        } else {
            planner[index].task = input;
        }
    } else {
        addTask(id, input);
    }
    //update planner iten on local storage
    localStorage.setItem("planner", JSON.stringify(planner));
});

//Add a task consisting of an hour and an input
function addTask(hr, input) {
    var task = {
        hour: hr,
        task: input
    }
    planner.push(task);
}

//When document is ready, set up
$(document).ready(function () {
    setUpPlanner();
    setUpTimedElements();
});