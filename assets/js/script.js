
var tempArray = [];
var storedAppointments;
var returnedAppointments;



function setUpTimedElements() {
    var now = moment();
    $("#date").text(moment().format("dddd" + ", " + "MMMM Do"  + ", " + "YYYY"))
    var currentHour = parseInt(moment().format("H"));
    for (var i = 9; i < 18; i++) {
        if (i < currentHour) {
            $("#" + i).children(".input-text").children().css({"background-color": "#4f625c", "color": "white"});
        } else if (i === currentHour) {
            $("#" + i).children(".input-text").children().css({"background-color": "#7f8e89", "color": "white"});
        } else {
            $("#" + i).children(".input-text").children().css("background-color", "#e0dfe5");
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

//rename these

$(window).on("load", function () {
   

    function renderAppointments() {
        storedAppointments = JSON.parse(localStorage.getItem("inputs"));
        if (storedAppointments !== null) {
            for (i = 0; i < storedAppointments.length; i++) {
                returnedAppointments = storedAppointments[i];
                details = returnedAppointments.details;
                timeIndex = returnedAppointments.time;
                timeIndex = timeIndex.replace(":00", '');
                if (details !== null) {
                    $("#" + timeIndex).children('div').children('div').children('textarea').val(details);
                }
            }
        }
    }

    renderAppointments();

})

// rename these

$(".save").click(function () {
    appointText = $(this).parent('div').children('div').children('textarea').val();
    appointTime = $(this).parent('div').parent().attr("id");
    appointment = {
        time: appointTime,
        details: appointText
    }
    planner = JSON.parse(localStorage.getItem("inputs"));
    if (planner === null) {
        localStorage.setItem('inputs', JSON.stringify([{ time: appointTime, details: appointText }]));
    }
    else {
        planner.push(appointment);
        localStorage.setItem("inputs", JSON.stringify(planner));

    }
    $(this).parent('div').children('div').children('textarea').replaceWith($('<textarea>' + appointText.addClass("textarea") + '</textarea>'));
})


$(document).ready(function () {
    setUpPlanner();
    setUpTimedElements();
});