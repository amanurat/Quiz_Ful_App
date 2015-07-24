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
    for (var i in MyQuizApp.questions) {
        MyQuizApp.questions[i].optionsArray = MyQuizApp.randomArray(MyQuizApp.questions[i].optionsArray);
    }
};

MyQuizApp.addQuestion = function () {
    var newQuestion = new MyQuizApp.Quest(MyQuizApp.typeOfQuestions[0][0], "", ["", "", ""], ["", ""]);
    MyQuizApp.questions.unshift(newQuestion);
    MyQuizApp.drawToModal();
    MyQuizApp.passValuestoModal();
    MyQuizApp.progressBarUpdate();
};

MyQuizApp.drawToTitleMain = function () {
    document.getElementById("quizTitle").innerHTML = MyQuizApp.quizTitle;
};

MyQuizApp.drawToTitleModal = function () {
    document.getElementById("modalTitleInput").value = MyQuizApp.quizTitle;
};

MyQuizApp.drawToModal = function () {
    var modalHolder = "";
    for (var i = 0; i < MyQuizApp.questions.length; i++) {
        modalHolder += "<div class='container-fluid'>" +
                            "<div class='row'>" +
                                "<div class='col-sm-12'>" +
                                    "<h4>" +
                                        "Question #" + (i + 1) +
                                    "</h4>" +
                                "</div>" +
                            "</div>" +
                            "<div class='row'>" +
                                "<div class='col-sm-3 textRight'>" +
                                    "Type Of Question" +
                                "</div>" +
                                "<div class='col-sm-9'>" +
                                    "<select name='cars' class='form-control' id='" + i + "typeOfQuestion' " +
                                    "onchange='MyQuizApp.changeTypeOfQuestion(" + i + ")'>";
        for (var j = 0; j < MyQuizApp.typeOfQuestions[0].length; j++) {
            modalHolder += "<option value='" + MyQuizApp.typeOfQuestions[0][j] + "'>" +
                                MyQuizApp.typeOfQuestions[1][j] +
                           "</option>";
        }
        modalHolder += "</select>" +
                                "</div>" +
                            "</div>" +
                            "<div class='row'>" +
                                "<div class='col-sm-3 textRight bg-info'>" +
                                     "Question" +
                                "</div>" +
                                "<div class='col-sm-9'>" +
                                     "<input type='text' id='" + i + "question' class='form-control'>" +
                                "</div>" +
                            "</div>";
        modalHolder += "<div id='" + "AnswerOptionsForQuestion" + i + "'>";
        if (MyQuizApp.questions[i].questionType !== MyQuizApp.typeOfQuestions[0][1]/*"FillInBlank"*/) {
            modalHolder += MyQuizApp.drawToModalAnswerOptionsForQuestion(i);
        }
        modalHolder += "</div>";
        modalHolder += "<div class='row'>" +
                           "<div class='col-sm-3 textRight bg-success'>" +
                                "Correct Option 1" +
                           "</div>" +
                           "<div class='col-sm-9'>" +
                               "<input type='text' id='" + i + "correctOption1' class='form-control'>" +
                           "</div>" +
                       "</div>" +
                       "<div class='row'>" +
                           "<div class='col-sm-3 textRight bg-success'>" +
                                "Correct Option 2" +
                           "</div>" +
                           "<div class='col-sm-9'>" +
                                "<input type='text' id='" + i + "correctOption2' placeholder='Optional' class='form-control'>" +
                           "</div>" +
                       "</div>";
        if (MyQuizApp.questions.length > 1) {
            modalHolder += "<div class='row textRight'>" +
                                "<div class='btn btn-danger' onclick='MyQuizApp.deleteQuestion(" + i + ");' data-toggle='tooltip' data-placement='left' title='Delete Question'>" +
                                    "<span class='fa fa-trash-o fa-2x'></span>" +
                                "</div>" +
                           "</div>"
        }
        modalHolder += "</div>"
        if (MyQuizApp.questions.length !== i + 1) {
            modalHolder += "<hr>";
        }
    }
    document.getElementById("modalTable").innerHTML = modalHolder;
    $('[data-toggle="tooltip"]').tooltip()
};

MyQuizApp.drawToModalAnswerOptionsForQuestion = function (i) {
    var holder = "<div class='row'>" +
                          "<div class='col-sm-3 textRight bg-warning'>" +
                               "Answer Option 1" +
                          "</div>" +
                          "<div class='col-sm-9'>" +
                               "<input type='text' id='" + i + "answerOption1' class='form-control'>" +
                          "</div>" +
                      "</div>" +
                      "<div class='row'>" +
                          "<div class='col-sm-3 textRight bg-warning'>" +
                              "Answer Option 2" +
                          "</div>" +
                          "<div class='col-sm-9'>" +
                              "<input type='text' id='" + i + "answerOption2' class='form-control'>" +
                          "</div>" +
                      "</div>" +
                      "<div class='row'>" +
                          "<div class='col-sm-3 textRight bg-warning'>" +
                               "Answer Option 3" +
                          "</div>" +
                          "<div class='col-sm-9'>" +
                               "<input type='text' id='" + i + "answerOption3' class='form-control'>" +
                          "</div>" +
                      "</div>";
    return holder;
};

MyQuizApp.changeTypeOfQuestion = function (i) {
    var questionTypeSelected = document.getElementById(i + "typeOfQuestion").value;
    var answerOptionsForQuestion = document.getElementById("AnswerOptionsForQuestion" + i);
    if (questionTypeSelected === MyQuizApp.typeOfQuestions[0][1]/*"FillInBlank"*/) {
        answerOptionsForQuestion.innerHTML = "";
    } else {
        answerOptionsForQuestion.innerHTML = MyQuizApp.drawToModalAnswerOptionsForQuestion(i);
    }
};

MyQuizApp.closeQuestion = function () {
    $("#edit-modal").modal('hide');
};

MyQuizApp.dropDown = function (type, elementID) {
    var selectoptions = document.getElementById(elementID).getElementsByTagName("option");
    for (var i = 0; i < selectoptions.length; i++) {
        if (type === MyQuizApp.typeOfQuestions[0][i]) {
            selectoptions[i].setAttribute("selected", "selected");
        } else {
            selectoptions[i].removeAttribute("selected");
        }
    }
};

MyQuizApp.deleteQuestion = function (i) {
    MyQuizApp.saveChanges();
    MyQuizApp.questions.splice(i, 1);
    MyQuizApp.drawToModal();
    MyQuizApp.passValuestoModal();
    MyQuizApp.progressBarUpdate();
    alert("Question deleted successfully!");
};

MyQuizApp.saveChanges = function () {
    var optArrayElemt;
    MyQuizApp.quizTitle = document.getElementById("modalTitleInput").value;
    for (var i = 0; i < MyQuizApp.questions.length; i++) {
        MyQuizApp.questions[i].questionType = document.getElementById(i + "typeOfQuestion").value;
        MyQuizApp.questions[i].questionText = document.getElementById(i + "question").value;
        for (var j = 0; j < MyQuizApp.questions[i].optionsArray.length; j++) {
            optArrayElemt = document.getElementById(i + "answerOption" + (j + 1))
            if (optArrayElemt) {
                MyQuizApp.questions[i].optionsArray[j] = optArrayElemt.value;
            }
        }
        for (var j = 0; j < MyQuizApp.questions[i].correctOption.length; j++) {
            MyQuizApp.questions[i].correctOption[j] = document.getElementById(i + "correctOption" + (j + 1)).value;
        }
    }
};

MyQuizApp.saveChangesAndClose = function () {
    MyQuizApp.saveChanges();
    MyQuizApp.drawToTitleMain();
    alert("Changes saved successfully!");
    $("#edit-modal").modal('hide');
};

MyQuizApp.passValuestoModal = function () {
    var type, text, op1, op2, op3, c1, c2;
    var typeEl, textEl, op1El, op2El, op3El, c1El, c2El;
    for (var i = 0; i < MyQuizApp.questions.length; i++) {
        type = MyQuizApp.questions[i].questionType;
        text = MyQuizApp.questions[i].questionText;
        op1 = MyQuizApp.questions[i].optionsArray[0];
        op2 = MyQuizApp.questions[i].optionsArray[1];
        op3 = MyQuizApp.questions[i].optionsArray[2];
        c1 = MyQuizApp.questions[i].correctOption[0];
        c2 = MyQuizApp.questions[i].correctOption[1];
        MyQuizApp.dropDown(type, i + "typeOfQuestion");
        textEl = document.getElementById(i + "question");
        op1El = document.getElementById(i + "answerOption1");
        op2El = document.getElementById(i + "answerOption2");
        op3El = document.getElementById(i + "answerOption3");
        c1El = document.getElementById(i + "correctOption1");
        c2El = document.getElementById(i + "correctOption2");
        if (textEl) { textEl.value = text }
        if (op1El) { op1El.value = op1 }
        if (op2El) { op2El.value = op2 }
        if (op3El) { op3El.value = op3 }
        if (c1El) { c1El.value = c1 }
        if (c2El) { c2El.value = c2 }
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
    $('#edit-modal').on('shown.bs.modal', function () {
        $("#modalTitleInput").focus();
    })
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
    document.getElementById("progressBar").innerHTML = listHolder;
};

MyQuizApp.startQuiz = function () {
    MyQuizApp.currentQuestion = 0;
    document.getElementById("respuestas").className = "col-md-12 column";
    document.getElementById("respuestasDrag").className = "displayNone";
    var typeQuestions = MyQuizApp.OptionsHTML(MyQuizApp.currentQuestion);
    document.getElementById("preguntas").innerHTML = MyQuizApp.questions[0].questionText;
    $('#respuestas').html(typeQuestions);
    document.getElementById("startNext").innerHTML = "Submit&nbsp;&nbsp;<span class='fa fa-play fa-2x'></span>";
    document.getElementById("submit").className = "displayNone";
    document.getElementById("startNext").setAttribute("onclick", "MyQuizApp.nextQuestion();");
    $("#ready-go-modal").modal();
    setTimeout(function () {
        $("#ready-go-modal").modal('hide');
    }, 1000);
};

MyQuizApp.displayAnswersModal = function (q) {
    if (MyQuizApp.questions[q].correctIncorrect === "correct") {
        $("#correct-modal").modal();
        setTimeout(function () {
            $("#correct-modal").modal('hide');
        }, 1000);
    } else {
        $("#incorrect-modal").modal();
        setTimeout(function () {
            $("#incorrect-modal").modal('hide');
        }, 1000);
    }
    MyQuizApp.progressBarUpdate();
};

MyQuizApp.OptionsHTML = function (q) {
    var type = MyQuizApp.questions[q].questionType;
    return MyQuizApp[type] ? MyQuizApp[type](q) : "Error, please contact your administrator";
};

MyQuizApp.nextQuestion = function () {
    var i = MyQuizApp.currentQuestion;
    var iNext = i + 1;
    document.getElementById("respuestas").className = "col-md-12 column";
    document.getElementById("respuestasDrag").className = "displayNone";
    MyQuizApp.getAnswer();
    MyQuizApp.displayAnswersModal(i);
    if (MyQuizApp.currentQuestion === MyQuizApp.questions.length - 1) {
        setTimeout(function () {
            MyQuizApp.finalResults();
        }, 1000);
    } else {
        var typeQuestions = MyQuizApp.OptionsHTML(iNext);
        document.getElementById("preguntas").innerHTML = MyQuizApp.questions[iNext].questionText;
        $("#respuestas").html(typeQuestions);
        MyQuizApp.currentQuestion++;
    }
};

MyQuizApp.getAnswer = function () {
    var q = MyQuizApp.currentQuestion;
    var options = MyQuizApp.questions[q].optionsArray;
    MyQuizApp.questions[q].correctIncorrect = "incorrect";
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
        if (document.getElementById("tigreTono").value !== "") {
            MyQuizApp.questions[q].answerChosen = document.getElementById("tigreTono").value;
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
        if (MyQuizApp.questions[q].questionType === "MoreThanOneCorrect") { break; }
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
    var holder = "<form class='navbar-form navbar-left' onSubmit='return false;'><div class='form-group'>";
    holder += "<input id='tigreTono'";
    holder += "type='text' class='form-control' placeholder='Enter answer' onkeypress='MyQuizApp.enterPressed(window.event)'></div></form>";
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
    for (var i = 0; i < MyQuizApp.questions.length; i++) {
        if (MyQuizApp.questions[i].correctIncorrect === "correct") { numberCorrect++; }
    }
    percentageCorrect = numberCorrect / MyQuizApp.questions.length;
    percentageCorrect = parseInt(percentageCorrect * 100) + "%";
    document.getElementById("finalResults").innerHTML = percentageCorrect;
    holder = "<tr style='font-weight:bold'><td>Your Answer</td><td>&nbsp;:&nbsp;</td><td>Correct Answer</td></tr>";
    for (var i = 0; i < MyQuizApp.questions.length; i++) {
        holder += "<tr><td>";
        if (MyQuizApp.questions[i].questionType === MyQuizApp.typeOfQuestions[0][2]) {//"MoreThanOneCorrect"
            holder += MyQuizApp.checkHowManyMoreThanOneCorrectWereChosen(MyQuizApp.questions[i].answerChosen);
        } else {
            holder += MyQuizApp.questions[i].answerChosen;
        }
        holder += "</td>";
        if (MyQuizApp.questions[i].correctIncorrect === "correct") {
            holder += "<td class='success'><i class='fa fa-check'></i></td>";
        } else {
            holder += "<td class='warning'><i class='fa fa-times'></i></td>";
        }
        holder += "<td>";
        holder += MyQuizApp.questions[i].correctOption[0];
        holder += MyQuizApp.questions[i].correctOption[1] === "" ? "" : ", ";
        holder += MyQuizApp.questions[i].correctOption[1];
        holder += "</td></tr>";
        document.getElementById("finalTable").innerHTML = holder;
    }
    $("#final-modal").modal();
    $('[data-toggle="tooltip"]').tooltip()
};

MyQuizApp.checkHowManyMoreThanOneCorrectWereChosen = function (answerChosenArray) {
    var newAnswerChosenArray = [];
    for (var i = 0; i < answerChosenArray.length; i++) {
        if (answerChosenArray[i] !== "")
            newAnswerChosenArray.push(answerChosenArray[i])
    }
    return newAnswerChosenArray.length === 0 ? "_" : newAnswerChosenArray.join(", ");
}

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

MyQuizApp.enterPressed = function (e) {
    if (e.charCode === 13 || e.keyCode === 13) {
        MyQuizApp.nextQuestion();
    }
}

MyQuizApp.drawToTitleModal();
MyQuizApp.drawToTitleMain();
MyQuizApp.drawToModal();
MyQuizApp.passValuestoModal();
MyQuizApp.randomAll();
MyQuizApp.saveChanges();
MyQuizApp.progressBarUpdate();
