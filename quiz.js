//getting all elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .timer_line");
const timeOff = quiz_box.querySelector("header .time_left")

const options_list = document.querySelectorAll(".option_list");

//If Start button is clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activateInfo");//show the info box
}

//If Exit button is clicked
exit_btn.onclick = ()=>{    
    info_box.classList.remove("activateInfo"); //hide the info box
}

//If Continue button is clicked
continue_btn.onclick = ()=> {
    info_box.classList.remove("activateInfo"); //hide the info box
       quiz_box.classList.add("activateQuiz"); //show the quiz box
       showQuestions(0);
       queCounter(1);
       startTimer(30);
       startTimerLine(0);
}

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 30;
let widthValue = 0;
let userScore = 0;

const Next_btn = quiz_box.querySelector(".Next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");



restart_quiz.onclick = ()=>{
 quiz_box.classList.add("activeQuiz");
 result_box.classList.remove("activeResult");
let que_count = 0;
let que_numb = 1;
let timeValue = 30;
let widthValue = 0;
let userScore = 0;
showQuestions(que_count);
queCounter(que_numb);
clearInterval(counter);
startTimer(timeValue);
clearInterval(counterLine);
startTimerLine(widthValue);
Next_btn.style.display = "none";
timeOff.textContent = "Time Left";

}

quit_quiz.onclick = () => {
    window.location.reload();
}

//If Next Button Clicked
Next_btn.onclick = ()=> {
    if(que_count < questions.lengt - 1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        Next_btn.style.display = "none";
        timeOff.textContent = "Time Left";
   
    }else{
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Questions completed");
        showResultBox();
    }
}

//getting questions and options from array
function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+ questions[index].numb +"." + questions[index].question + '</span>';
    let option_tag =  '<div class = "option">' + questions[index].options[0] + '<span></span></div>'
    + '<div class = "option">' + questions[index].options[1] + '<span></span></div>'
    +'<div class = "option">' + questions[index].options[2] + '<span></span></div>'
    +'<div class = "option">' +  questions[index].options[3] + '<span></span></div>';

    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
         option[i].setAttribute("onclick","optionSelected(this)");

    }
}


function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = options_list.children.length;
   
    if(userAns == correctAns){ 
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is Correct");
    }else{
        answer.classList.add("incorrect")
        console.log("Answer is Wrong");
        
        //if answer is incorrect then automatically selected the correct answer
        for (let i = 0 ; i < allOptions; i++){
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class","option correct");

            }
        }
    
    }

//once user selected disabled all options
for (let i = 0; i < allOptions; i++){
    option_list.children[i].classList.add("disabled");
}
Next_btn.style.display = "block";
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";
            timeOff.textContent = "Time Off";

            let correctAns = questions[que_count].answer;
            let allOptions = options_list.children.length;

            for (let i = 0; i < allOptions; i++) {
                if(option_list.children[i].textContent == correctAns){
                    option_list.children[i].setAttribute("class","option correct");
    
                }
            }

            for (let i = 0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled");
            }
            Next_btn.style.display = "block";
        }
    }
}

function showResultBox() {
    info_box.classList.remove("activateInfo");//show the info box
    quiz_box.classList.remove("activateQuiz"); //show the quiz box
    result_box.classList.remove("activeResult"); //show the result box
    const scoreText = result_box.querySelector(".score_text");
    if(userScore > 3){
        let scoreTag = '<!--<span> congrats! Your final score is <p>'+ userScore +'</p> out of <p>'+questions.length+'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){
        let scoreTag = '<!--<span> Nice, Your final score is <p>'+ userScore +'</p> out of <p>'+questions.length+'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
else{
    let scoreTag = '<!--<span>Your final score is <p>'+ userScore +'</p> out of <p>'+questions.length+'</p></span>';
    scoreText.innerHTML = scoreTag;
}
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        timeLine.textContent = time;
        time += 1;
        timeLine.style.width = time + "px";
        if(time > 549) {
            clearInterval(counter);
            
        }
    }
}



function queCounter(index){
    const bottom_ques_counter = quiz_box.querySelector(".totalQ");
let totalQuesCountTag =  '<span><p>'+ index + '</p>of<p>'+ questions.length +'</p>Questions</span>';
bottom.bottom_ques_counter.innerHTML = totalQuesCountTag;
}