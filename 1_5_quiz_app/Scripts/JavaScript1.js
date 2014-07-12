"use strict"
var MyQuizApp = {};
MyQuizApp.questions = [];
MyQuizApp.quizTitle = "Video Game Quiz!";
MyQuizApp.currentQuestion = "";
MyQuizApp.draggedItem = "";

// The 1st array below is the name that we will be tracking, the 2nd array below is how we will
// present the options to the user.
MyQuizApp.typeOfQuestions = [
                                ["MultipleChoice",
                                "FillInBlank",
                                "MoreThanOneCorrect",
                                "DragAndDrop"],
                                ["Multiple choice",
                                "Fill in the blank",
                                "More than one correct",
                                "Drag and drop"]
];

MyQuizApp.Quest = function (questionType, questionText, optionsArray, correctOption) {
    "use strict"
    this.questionType = questionType;
    this.questionText = questionText;
    this.optionsArray = optionsArray;
    this.correctOption = correctOption;
};

MyQuizApp.Quest.prototype.answerChosen = "_";
MyQuizApp.Quest.prototype.correctIncorrect = "";


MyQuizApp.questions.push(new MyQuizApp.Quest(
                            MyQuizApp.typeOfQuestions[0][0],
                            "Which was the year of the NES release in North America?",
                            ["1985", "1981", "1983"],
                            ["1985", ""]
));

MyQuizApp.questions.push(new MyQuizApp.Quest(
                            MyQuizApp.typeOfQuestions[0][1],
                            "What is the first name of the main character in RE4?",
                            ["", "", ""],
                            ["Leon", ""]
));

MyQuizApp.questions.push(new MyQuizApp.Quest(
                            MyQuizApp.typeOfQuestions[0][2],
                            "What game(s) was developed by Rare?",
                            ["Donkey Kong Country", "Metal Gear Solid", "Perfect Dark"],
                            ["Donkey Kong Country", "Perfect Dark"]
));

MyQuizApp.questions.push(new MyQuizApp.Quest(
                            MyQuizApp.typeOfQuestions[0][0],
                            'Which of these was the inspiration for an animated movie called "Advent Children"?',
                            ["Final Fantasy VII", "Halo 2", "Last of Us"],
                            ["Final Fantasy VII", ""]
));

MyQuizApp.questions.push(new MyQuizApp.Quest(
                            MyQuizApp.typeOfQuestions[0][3],
                            "Remove the item that doesn't belong with the others.",
                            ["Triforce of Force", "Triforce of Wisdom", "Triforce of Courage"],
                            ["Triforce of Force", ""]
));

MyQuizApp.randomArray = function (array) {
    // While there remain elements to shuffle...
    "use strict"
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

MyQuizApp.randomizeOptions = function () {
    "use strict"
    for (var i in MyQuizApp.questions) {
        MyQuizApp.questions[i].optionsArray = MyQuizApp.randomArray(MyQuizApp.questions[i].optionsArray);
    }
};

MyQuizApp.addQuestion = function () {
    "use strict"
    var newQuestion = new MyQuizApp.Quest(MyQuizApp.typeOfQuestions[0][0], "", ["", "", ""], ["", ""]);
    MyQuizApp.questions.unshift(newQuestion);
    MyQuizApp.drawToModal();
    MyQuizApp.passValuestoModal();
    MyQuizApp.progressBarUpdate();
};

MyQuizApp.drawToTitleMain = function () {
    document.getElementById("quiz title").innerHTML = MyQuizApp.quizTitle;
};

MyQuizApp.drawToTitleModal = function () {
    var modalTitleHolder = "";
    modalTitleHolder += "<input type='text' id='modal title input' class='form-control' value='"
    modalTitleHolder += MyQuizApp.quizTitle;
    modalTitleHolder += "'>";
    document.getElementById("modal title").innerHTML = modalTitleHolder;
};

MyQuizApp.drawToModal = function () {
    "use strict"
    var modalHolder = "";
    for (var i = 0; i < MyQuizApp.questions.length; i++) {
        modalHolder += "<tr><td><ul style='list-style-type:none'>";
        modalHolder += "<li>";
        modalHolder += "&nbsp;&nbsp;<span class='fa fa-level-down fa-rotate-270'></span>&nbsp;Type Of Question";
        modalHolder += "<select name='cars' class='form-control' id='" + i + "type of question'>";
        for (var j = 0; j < MyQuizApp.typeOfQuestions[0].length; j++) {
            modalHolder += "<option value='" + MyQuizApp.typeOfQuestions[0][j] + "'>";
            modalHolder += MyQuizApp.typeOfQuestions[1][j] + "</option>";
        };
        modalHolder += "</select>";
        modalHolder += "</li>";
        modalHolder += "<li>&nbsp;&nbsp;<span class='fa fa-level-down fa-rotate-270'></span>&nbsp;";
        modalHolder += "Question<input type='text' id='" + i + "question' class='form-control'></li>";
        modalHolder += "<li>&nbsp;&nbsp;<span class='fa fa-level-down fa-rotate-270'></span>&nbsp;";
        modalHolder += "Answer Option 1<input type='text' id='" + i + "answer option 1' class='form-control'></li>";
        modalHolder += "<li>&nbsp;&nbsp;<span class='fa fa-level-down fa-rotate-270'></span>&nbsp;";
        modalHolder += "Answer Option 2<input type='text' id='" + i + "answer option 2' class='form-control'></li>";
        modalHolder += "<li>&nbsp;&nbsp;<span class='fa fa-level-down fa-rotate-270'></span>&nbsp;";
        modalHolder += "Answer Option 3<input type='text' id='" + i + "answer option 3' class='form-control'></li>";
        modalHolder += "<li>&nbsp;&nbsp;<span class='fa fa-level-down fa-rotate-270'></span>&nbsp;";
        modalHolder += "Correct Option 1<input type='text' id='" + i + "correct option 1' class='form-control'></li>";
        modalHolder += "<li>&nbsp;&nbsp;<span class='fa fa-level-down fa-rotate-270'></span>&nbsp;";
        modalHolder += "Correct Option 2<input type='text' id='" + i + "correct option 2' placeholder='Optional' class='form-control'></li>";
        modalHolder += "<li>&nbsp;</li>";
        if (MyQuizApp.questions.length === 1) {
            modalHolder += "<li class='displayNone'>";
        } else {
            modalHolder += "<li>";
        }
        modalHolder += "<div class='btn btn-danger' onclick='MyQuizApp.deleteQuestion(";
        modalHolder += i + ");'><span class='fa fa-hand-o-right fa-2x'></span>..<span class='fa fa-trash-o fa-2x'></span></div></li>";
        modalHolder += "</ul></td></tr>";
        if (MyQuizApp.questions.length !== i + 1) {
            modalHolder += "<tr><td><hr></td></tr>";
        }
    }
    document.getElementById("modal table").innerHTML = modalHolder;
};

MyQuizApp.closeQuestion = function () {
    $("#edit-modal").modal('hide');
}

MyQuizApp.dropDown = function (type, elementID) {
    "use strict"
    var selectoptions = document.getElementById(elementID).getElementsByTagName("option");
    for (var i = 0; i < selectoptions.length; i++) {
        selectoptions[i].removeAttribute("selected");
    }
    if (type === MyQuizApp.typeOfQuestions[0][0]) {
        selectoptions[0].setAttribute("selected", "selected");
    } else if (type === MyQuizApp.typeOfQuestions[0][1]) {
        selectoptions[1].setAttribute("selected", "selected");
    } else if (type === MyQuizApp.typeOfQuestions[0][2]) {
        selectoptions[2].setAttribute("selected", "selected");
    } else if (type === MyQuizApp.typeOfQuestions[0][3]) {
        selectoptions[3].setAttribute("selected", "selected");
    } else {
        alert("Error, please contact administrator");
    }
};

MyQuizApp.deleteQuestion = function (i) {
    "use strict"
    MyQuizApp.saveChanges();
    MyQuizApp.questions.splice(i, 1);
    MyQuizApp.drawToModal();
    MyQuizApp.passValuestoModal();
    MyQuizApp.progressBarUpdate();
    alert("Question deleted successfully!");
};

MyQuizApp.saveChanges = function () {
    "use strict"
    MyQuizApp.quizTitle = document.getElementById("modal title input").value;
    for (var i = 0; i < MyQuizApp.questions.length; i++) {
        MyQuizApp.questions[i].questionType = document.getElementById(i + "type of question").value;
        MyQuizApp.questions[i].questionText = document.getElementById(i + "question").value;
        for (var j = 0; j < MyQuizApp.questions[i].optionsArray.length; j++) {
            var n = j + 1;
            MyQuizApp.questions[i].optionsArray[j] = document.getElementById(i + "answer option " + n).value;
        }
        for (var j = 0; j < MyQuizApp.questions[i].correctOption.length; j++) {
            var n = j + 1;
            MyQuizApp.questions[i].correctOption[j] = document.getElementById(i + "correct option " + n).value;
        }
    }
};

MyQuizApp.saveChangesAndClose = function () {
    "use strict"
    MyQuizApp.saveChanges();
    MyQuizApp.drawToTitleMain();
    alert("Changes saved successfully!");
    $("#edit-modal").modal('hide');
};

MyQuizApp.passValuestoModal = function () {
    "use strict"
    var type, text, op1, op2, op3, c1, c2;
    for (var i = 0; i < MyQuizApp.questions.length; i++) {
        type = MyQuizApp.questions[i].questionType;
        text = MyQuizApp.questions[i].questionText;
        op1 = MyQuizApp.questions[i].optionsArray[0];
        op2 = MyQuizApp.questions[i].optionsArray[1];
        op3 = MyQuizApp.questions[i].optionsArray[2];
        c1 = MyQuizApp.questions[i].correctOption[0];
        c2 = MyQuizApp.questions[i].correctOption[1];
        MyQuizApp.dropDown(type, i + "type of question");
        document.getElementById(i + "question").value = text;
        document.getElementById(i + "answer option 1").value = op1;
        document.getElementById(i + "answer option 2").value = op2;
        document.getElementById(i + "answer option 3").value = op3;
        document.getElementById(i + "correct option 1").value = c1;
        document.getElementById(i + "correct option 2").value = c2;
    }
};

MyQuizApp.randomAll = function () {
    MyQuizApp.questions = MyQuizApp.randomArray(MyQuizApp.questions);
    MyQuizApp.randomizeOptions();
    MyQuizApp.drawToModal();
    MyQuizApp.passValuestoModal();
    MyQuizApp.saveChanges();
    MyQuizApp.drawToTitleMain();
    MyQuizApp.saveChanges();
};

MyQuizApp.openModalWindow = function () {
    $("#edit-modal").modal();
};

MyQuizApp.progressBarUpdate = function () {
    var listHolder = "<li><span>Start</span></li>";
    for (var i = 0; i < MyQuizApp.questions.length; i++) {
        listHolder += "<li class='enabled' id='";
        listHolder += i + "barQuestion";
        listHolder += "'><span>" + (i + 1) + "<span class='";
        if (MyQuizApp.questions[i].correctIncorrect === "correct") {
            listHolder += "fa fa-check";
        } else if (MyQuizApp.questions[i].correctIncorrect === "incorrect") {
            listHolder += "fa fa-times";
        }
        listHolder += "'></span></span></li>";
    }
    listHolder += "<li><span>Finish</span></li>";
    document.getElementById("progress bar").innerHTML = listHolder;
};

MyQuizApp.startQuiz = function () {
    MyQuizApp.currentQuestion = 0;
    document.getElementById("respuestas").className = "col-md-12 column";
    document.getElementById("respuestasDrag").className = "displayNone";
    var typeQuestions = MyQuizApp.OptionsHTML(MyQuizApp.currentQuestion);
    document.getElementById("preguntas").innerHTML = MyQuizApp.questions[0].questionText;
    $('#respuestas').html(typeQuestions);
    document.getElementById("start next").innerHTML = "Submit&nbsp;&nbsp;<span class='fa fa-play fa-2x'></span>";
    document.getElementById("submit").className = "displayNone";
    document.getElementById("start next").setAttribute("onclick", "MyQuizApp.nextQuestion();");
    $("#ready-go-modal").modal();
    setTimeout(function () {
        $("#ready-go-modal").modal('hide');
    }, 1000); // how long do you want the delay to be? 
};

MyQuizApp.displayAnswersModal = function (q) {
    if (MyQuizApp.questions[q].correctIncorrect === "correct") {
        $("#correct-modal").modal();
        setTimeout(function () {
            $("#correct-modal").modal('hide');
        }, 1000); // how long do you want the delay to be? 
    } else {
        $("#incorrect-modal").modal();
        setTimeout(function () {
            $("#incorrect-modal").modal('hide');
        }, 1000); // how long do you want the delay to be?
    }
    MyQuizApp.progressBarUpdate();
};

MyQuizApp.OptionsHTML = function (q) {
    var type = MyQuizApp.questions[q].questionType;
    if (MyQuizApp[type]) { return MyQuizApp[type](q); }
    else { return "Error, please contact your administrator"; }
};

MyQuizApp.nextQuestion = function () {
    var i = MyQuizApp.currentQuestion;
    var iNext = i + 1;
    document.getElementById("respuestas").className = "col-md-12 column";
    document.getElementById("respuestasDrag").className = "displayNone";
    MyQuizApp.getAnswer();
    if (MyQuizApp.currentQuestion === MyQuizApp.questions.length - 1) {
        MyQuizApp.finalResults();
    } else {
        var typeQuestions = MyQuizApp.OptionsHTML(iNext);
        document.getElementById("preguntas").innerHTML = MyQuizApp.questions[iNext].questionText;
        $("#respuestas").html(typeQuestions);
        MyQuizApp.currentQuestion++;
        MyQuizApp.displayAnswersModal(i);
    }

};

MyQuizApp.getAnswer = function () {
    var q = MyQuizApp.currentQuestion;
    var options = MyQuizApp.questions[q].optionsArray;
    MyQuizApp.questions[q].correctIncorrect = "incorrect"

    // FOR MULTIPLE CHOICE
    if (MyQuizApp.questions[q].questionType === "MultipleChoice") {
        for (var i = 0; i < options.length; i++) {
            if (document.getElementById(options[i]).checked) {
                MyQuizApp.questions[q].answerChosen = document.getElementById(options[i]).value;
                break;
            }
        }
    }

    // FOR FILL IN BLANK
    if (MyQuizApp.questions[q].questionType === "FillInBlank") {
        if (document.getElementById("tigre tono").value !== "") {
            MyQuizApp.questions[q].answerChosen = document.getElementById("tigre tono").value;
        }
    }

    // FOR MORE THAN ONE CORRECT
    if (MyQuizApp.questions[q].questionType === "MoreThanOneCorrect") {
        MyQuizApp.questions[q].answerChosen = ["", "", ""];
        for (var i = 0; i < options.length; i++) {
            if (document.getElementById(options[i]).checked) {
                MyQuizApp.questions[q].answerChosen[i] = document.getElementById(options[i]).value;
            }
        }
        var correctArray = MyQuizApp.questions[q].correctOption.join("").split("").sort().join("");
        var myArray = MyQuizApp.questions[q].answerChosen.join("").split("").sort().join("");
        if (correctArray == myArray) { MyQuizApp.questions[q].correctIncorrect = "correct"; }
    }

    // FOR DRAG AND DROP
    if (MyQuizApp.questions[q].questionType === "DragAndDrop") {
        MyQuizApp.resetDrag();
    }


    //CHECK FOR ALLLLLL IN THE END (EXCEPT FOR "MORE THAN ONE CORRECT"
    for (var i = 0; i < MyQuizApp.questions[q].correctOption.length; i++) {
        if (MyQuizApp.questions[q].questionType === "MoreThanOneCorrect") { break;}
        if (MyQuizApp.questions[q].answerChosen.toLowerCase() === MyQuizApp.questions[q].correctOption[i].toLowerCase()) {
            MyQuizApp.questions[q].correctIncorrect = "correct";
            break;
        }
    }
};

MyQuizApp.MultipleChoice = function (quest) {
    var options = MyQuizApp.questions[quest].optionsArray;
    var holder = "";
    holder += "<div class='btn-group' data-toggle='buttons'>";
    for (var i = 0; i < options.length ; i++) {
        holder += "<label class='btn btn-default'><input type='radio' id='"
        holder += options[i];
        holder += "' value='" + options[i];
        holder += "'>" + options[i] + "</label>"
    }
    holder += "</div>";
    return holder;
};

MyQuizApp.FillInBlank = function () {
    var options = MyQuizApp.questions[MyQuizApp.currentQuestion].optionsArray;
    var holder = "<form class='navbar-form navbar-left'><div class='form-group'>";
    holder += "<input id='tigre tono'";
    holder += "type='text' class='form-control' placeholder='Enter answer'></div></form>";
    return holder;
};

MyQuizApp.MoreThanOneCorrect = function (quest) {
    var options = MyQuizApp.questions[quest].optionsArray;
    var holder = "<div>(Select All Possible Answers)</div>";
    holder += "<div class='btn-group' data-toggle='buttons'>";
    for (var i = 0; i < options.length ; i++) {
        holder += "<label class='btn btn-default'><input type='checkbox' id='"
        holder += options[i];
        holder += "' value='" + options[i];
        holder += "'>" + options[i] + "</label>"
    }
    holder += "</div>";
    return holder;
};

MyQuizApp.DragAndDrop = function (quest) {
    document.getElementById("respuestas").className = "displayNone";
    document.getElementById("respuestasDrag").className = "col-md-12 column displayNormal";
    var arrayX = MyQuizApp.questions[quest].optionsArray
    document.getElementById("Xdraggable1").innerHTML = arrayX[0];
    document.getElementById("Xdraggable2").innerHTML = arrayX[1];
    document.getElementById("Xdraggable3").innerHTML = arrayX[2];
};

MyQuizApp.finalResults = function () {
    var numberCorrect = 0;
    var percentageCorrect;
    var holder;
    MyQuizApp.progressBarUpdate();
    for (var i = 0; i < MyQuizApp.questions.length; i++) {
        if (MyQuizApp.questions[i].correctIncorrect === "correct") { numberCorrect++; }
    }
    percentageCorrect = numberCorrect / MyQuizApp.questions.length;
    percentageCorrect = parseInt(percentageCorrect * 100) + "%";
    document.getElementById("final results").innerHTML = percentageCorrect;
    holder = "<tr><td>Your Answer</td><td>&nbsp;:&nbsp;</td><td>Correct Answer</td></tr>";
    for (var i = 0; i < MyQuizApp.questions.length; i++) {
        holder += "<tr><td>";
        holder += MyQuizApp.questions[i].answerChosen;
        holder += "</td><td>:</td><td>";
        holder += MyQuizApp.questions[i].correctOption[0] + ",";
        holder += MyQuizApp.questions[i].correctOption[1];
        holder += "</td></tr>";
        document.getElementById("final table").innerHTML = holder;
    }
    $("#final-modal").modal();
};

$(function () {
    $("#draggable1").draggable({ revert: 'invalid', });
    $("#draggable2").draggable({ revert: 'invalid', });
    $("#draggable3").draggable({ revert: 'invalid', });

    $("#draggable1").data({
        'originalLeft': $("#draggable1").css('left'),
        'origionalTop': $("#draggable1").css('top')
    });
    $("#draggable2").data({
        'originalLeft': $("#draggable1").css('left'),
        'origionalTop': $("#draggable1").css('top')
    });
    $("#draggable3").data({
        'originalLeft': $("#draggable1").css('left'),
        'origionalTop': $("#draggable1").css('top')
    });

    $("#droppable").droppable({
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            var Xsufix = ui.draggable.attr("id");
            var Answer = document.getElementById("X" + Xsufix).innerHTML;
            MyQuizApp.questions[MyQuizApp.currentQuestion].answerChosen = Answer;
            MyQuizApp.nextQuestion();
        }
    });

});

MyQuizApp.resetDrag = function () {
    $("#draggable1").animate({
        top: "0px",
        left: "0px"
    });
    $("#draggable2").animate({
        top: "0px",
        left: "0px"
    });
    $("#draggable3").animate({
        top: "0px",
        left: "0px"
    });
    MyQuizApp.draggedItem = "";
}

MyQuizApp.drawToTitleModal();
MyQuizApp.drawToTitleMain();
MyQuizApp.drawToModal();
MyQuizApp.passValuestoModal();
MyQuizApp.randomAll();
MyQuizApp.saveChanges();
MyQuizApp.progressBarUpdate();