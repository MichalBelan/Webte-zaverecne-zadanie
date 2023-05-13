var question = document.getElementById('otazka');
var volba = Array.from(document.getElementsByClassName('choiceText'));
var pocitadloOtazok = document.getElementById("pocitadlo-otazka");
var skoreText = document.getElementById("skore");
var currentQuestion = {};
var acceptAnswers = false;
var score = 0;
var counter = 0;
var availableQuesions = [];

var questions = [];

fetch('json.json').then((res) => {
    return res.json();

})
    .then((loadedQuestions) => {
        questions = loadedQuestions.results.map((loadedQuestion) => {
            const formattedQuestion = {
                question: loadedQuestion.question,
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 6) + 1;
            answerChoices.splice(
                formattedQuestion.answer - 1,
                0,
                loadedQuestion.correct_answer
            );

            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice;
            });

            return formattedQuestion;
        });
        Game();
    })
    .catch((err) => {
        console.error(err);
    });



const BONUS = 10;
const MAXQUESTIONS = 5;

Game = () => {
    counter = 0;
    score = 0;
    availableQuesions = [...questions];
    generujOtazku();
};

generujOtazku = () => {
    if (availableQuesions.length === 0 || counter >= MAXQUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        
        return window.location.assign('zaver.html');
    }
    counter++;
    pocitadloOtazok.innerText = counter + "/" + MAXQUESTIONS;
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    volba.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptAnswers = true;
};


const dragContainer = document.querySelectorAll('.choiceContainer');
const dropContainer = document.querySelector('.answer-container');

dragContainer.forEach((dragContainers) => {
    dragContainers.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
        e.target.style.opacity = 0.3;
    })

    dragContainers.addEventListener('dragend', (e) => {
        e.target.style.opacity = 1;
    })

})



dropContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
})

dropContainer.addEventListener('dragenter', (e) => {
    e.target.style.background = '#eee';
})

dropContainer.addEventListener('dragleave', (e) => {
    e.target.style.background = '';
})


dropContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    const dragContainerID = e.dataTransfer.getData('text/plain');
   const selectedChoice= document.getElementById(dragContainerID);
    e.target.appendChild(selectedChoice.cloneNode(true));
    selectedChoice.style.visibility = 'hidden';
    if (!acceptAnswers) return;

    acceptAnswers = false;
    
    const selectedAnswer = selectedChoice.querySelector(".choiceText").dataset['number'];
    

    
    if (selectedAnswer == currentQuestion.answer) {
        classToApply = 'correct';
    }
    else {
        classToApply = 'incorrect';
    }

    if (classToApply === 'correct') {
        pripocitaj(BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        selectedChoice.style.visibility = 'visible';
        e.target.replaceChildren();
        generujOtazku();
    }, 3000);

})


pripocitaj = num => {
    score += num;
    skoreText.innerText = score;
};
