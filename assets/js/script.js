var planner = [];


function setUpTimedElements() {
    var now = moment();
    $("#date").text(moment().format("dddd" + ", " + "MMMM Do"  + ", " + "YYYY"))
    var currentHour = parseInt(moment().format("H"));
    for (var i = 9; i < 18; i++) {
        if (i < currentHour) {
            $("#" + i).children('div').children(".input-text").children().css({"background-color": "#4f625c", "color": "white"});
        } else if (i === currentHour) {
            $("#" + i).children('div').children(".input-text").children().css({"background-color": "#7f8e89", "color": "white"});
        } else {
            $("#" + i).children('div').children(".input-text").children().css("background-color", "#e0dfe5");
        }
    }
}


function setUpPlanner() {
    if (localStorage.getItem("planner")) {
        planner = JSON.parse(localStorage.getItem("planner"));
        for (var i = 0; i < planner.length; i++) {
            var hour = planner[i].hour;
            var task = planner[i].task;
            $("#" + hour)[0].children[1].children[0].value = task;
        }
    }
}


$(window).on("load", function () {
    function renderTasks() {
        storedTasks = JSON.parse(localStorage.getItem("inputs"));
        if (storedTasks !== null) {
            for (i = 0; i < storedTasks.length; i++) {
                returnedTasks = storedTasks[i];
                details = returnedTasks.details;
                timeIndex = returnedTasks.time;
                timeIndex = timeIndex.replace(":00", '');
                if (details !== null) {
                    $("#" + timeIndex).children('div').children('div').children('textarea').val(details);
                }
            }
        }
    }

    renderTasks();

})


$(".save").click(function () {
    tasksText = $(this).parent('div').children('div').children('textarea').val();
    tasksTime = $(this).parent('div').parent().attr("id");
    tasks = {
        time: tasksTime,
        details: tasksText
    }
    planner = JSON.parse(localStorage.getItem("inputs"));
    if (planner === null) {
        localStorage.setItem('inputs', JSON.stringify([{ time: tasksTime, details: tasksText }]));
    }
    else {
        planner.push(tasks);
        localStorage.setItem("inputs", JSON.stringify(planner));

    }
    $(this).parent('div').children('div').children('textarea').replaceWith($('<textarea>' + tasksText.addClass("textarea") + '</textarea>'));
})


$(document).ready(function () {
    setUpPlanner();
    setUpTimedElements();
});