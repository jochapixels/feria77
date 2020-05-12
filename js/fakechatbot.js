var questionNum = 0;													// keep count of question, used for IF condition.
var question = '<p class="chat-text">what is your name?</p>';				  // first question

var outputElem = '<div class="output"></div>'
var inputElem = '<div class="input-elem"></div>'

//add first question
$(outputElem).insertBefore("#typing-elem");
var index = getLength(document.getElementsByClassName("output"))
var outputText = document.getElementsByClassName("output")[index];
outputText.innerHTML = question;


function bot() {
    //process input
    var input = document.getElementById('typing-elem').children[0].value; //get answer
    var answer = '<p class="chat-text">' + input + '</p>'
    $(inputElem).insertBefore("#typing-elem");
    index = getLength(document.getElementsByClassName("input-elem"))
    var inputText = document.getElementsByClassName("input-elem")[index];
    inputText.innerHTML = answer;
    document.getElementById('typing-elem').children[0].value = ''

    if (questionNum == 0) {
        //react question
        var botText = '<p  class="chat-text">hello ' + input + '</p>'
        setTimeout(timedBotOutput, 1000, botText);
        //new question
        botText = '<p  class="chat-text">how old are you?</p>'
        setTimeout(timedBotOutput, 2000, botText);
    }

    else if (questionNum == 1) {
        //react question
        var botText = '<p  class="chat-text">That means you were born in ' + (2020 - input) + '</p>'
        setTimeout(timedBotOutput, 1000, botText);
        //new question
        //botText = '<p  class="chat-text">where are you from?</p>'
        //setTimeout(timedBotOutput, 2000, botText);
    }

}
function timedBotOutput(botText) {
    $(outputElem).insertBefore('#typing-elem');
    index = getLength(document.getElementsByClassName("output"))
    document.getElementsByClassName("output")[index].innerHTML = botText;
}

function getLength(elem) {
    if (elem.length != null) {
        return elem.length - 1;
    }
    else {
        console.log("elem is not an array");
        return null
    }

}
//push enter key (using jquery), to run bot function.
$(document).keypress(function (e) {
    if (e.which == 13) {
        bot();
        questionNum++;																						// run bot function when enter key pressed
    }
});
