var vmModule = require("./game-view-model");
var frameModule = require("ui/frame");
var sound = require("nativescript-sound");
var timer = require("timer");
var sound = require("nativescript-sound");

var timerImageSrc = "~/images/timer/timer-";
var tickSound = sound.create("~/sounds/timer-tick.mp3");
var heheSound = sound.create("~/sounds/hehehe.mp3");
var correctAnswerSound = sound.create("~/sounds/correct.mp3");
var wrongAnswerSound = sound.create("~/sounds/wrong.mp3");

var currentQuestionIndex;
var timerInterval;
var questions;

var pageModules = (function() {
	var pageModules = {
		pageLoaded: function(args) {
			var page = args.object;
			page.bindingContext = vmModule.gameViewModel;
			topmost = frameModule.topmost();

			vmModule.gameViewModel.get("allQuestions")
			.then(function(data) {
				startGame(data);
			});
		},
		answerTapped: function(args) {
			var receivedAnswer = args.object.text;

			if (currentQuestionIndex >= questions.length) {
				// what happens when the questions end
				return;
			}

			if (receivedAnswer === questions[currentQuestionIndex].CorrectAnswer) {
				increaseScoreToPlayerInTurn();
				correctAnswerSound.play();
			}
			else {
				switchPlayerTurns();
				wrongAnswerSound.play();
			}

			currentQuestionIndex++;

			if (currentQuestionIndex >= questions.length) {
				// what happens when the questions end
				return;
			}

			timer.clearInterval(timerInterval);
			vmModule.gameViewModel.set("questionTimer", 10);
			vmModule.gameViewModel.set("timerImageSrc", timerImageSrc + vmModule.gameViewModel.get("questionTimer") + ".png");
			startTimer();
			setQuestion(questions, currentQuestionIndex);
		}
	};

	return pageModules;
})();

function startTimer() {
		timerInterval = timer.setInterval(function() {
		vmModule.gameViewModel.questionTimer -= 1;
		vmModule.gameViewModel.set("timerImageSrc", timerImageSrc + vmModule.gameViewModel.questionTimer + ".png");
		tickSound.play();

		if (vmModule.gameViewModel.questionTimer === 0) {
			timer.clearInterval(timerInterval);
			heheSound.play();
			currentQuestionIndex++;

			if (currentQuestionIndex >= questions.length) {
				// what happens when the questions end
				return;
			}

			switchPlayerTurns();
			setQuestion(questions, currentQuestionIndex);
		}
	}, 1000);
}


function setQuestion(questions, questionIndex) {
	vmModule.gameViewModel.set("answerA", questions[questionIndex].AnswerA);
	vmModule.gameViewModel.set("answerB", questions[questionIndex].AnswerB);
	vmModule.gameViewModel.set("answerC", questions[questionIndex].AnswerC);
	vmModule.gameViewModel.set("answerD", questions[questionIndex].AnswerD);
	vmModule.gameViewModel.set("questionContent", questions[questionIndex].QuestionContent);
}

function randomizeArray(array) {
	var newArray = [];

	while (array.length !== 0) {
		var random = Math.floor(Math.random() * array.length);
		var value = array[random];
		array.splice(random, 1);
		newArray.push(value);
	}

	return newArray;
}

function startGame(data) {
	currentQuestionIndex = 0;
	questions = randomizeArray(data);
	assignPlayerFirstRandomly();
	startTimer();
	setQuestion(questions, currentQuestionIndex);

}

function assignPlayerFirstRandomly() {
	var random = Math.floor(Math.random() * 2);
	var redPlayer = vmModule.gameViewModel.get("redPlayer");
	var bluePlayer = vmModule.gameViewModel.get("bluePlayer");

	if (random === 0) {
		vmModule.gameViewModel.set("redPlayer", {name: redPlayer.name, score: redPlayer.score, turn: true, country: redPlayer.country});
		vmModule.gameViewModel.set("turnCol", 0);
	}
	else {
		vmModule.gameViewModel.set("bluePlayer", {name: bluePlayer.name, score: bluePlayer.score, turn: true, country: bluePlayer.country});
		vmModule.gameViewModel.set("turnCol", 1);
	}
}

function increaseScoreToPlayerInTurn() {
	var redPlayer = vmModule.gameViewModel.get("redPlayer");
	var bluePlayer = vmModule.gameViewModel.get("bluePlayer");
	var pointsToAdd = 50;

	if (redPlayer.turn) {
		vmModule.gameViewModel.set("redPlayer", {name: redPlayer.name, score: redPlayer.score + pointsToAdd, turn: redPlayer.turn, country: redPlayer.country});
	}
	else {
		vmModule.gameViewModel.set("bluePlayer", {name: bluePlayer.name, score: bluePlayer.score + pointsToAdd, turn: bluePlayer.turn, country: bluePlayer.country});
	}
}

function switchPlayerTurns() {
	var redPlayer = vmModule.gameViewModel.get("redPlayer");
	var bluePlayer = vmModule.gameViewModel.get("bluePlayer");

	if (redPlayer.turn) {
		vmModule.gameViewModel.set("redPlayer", {name: redPlayer.name, score: redPlayer.score, turn: false, country: redPlayer.country});
		vmModule.gameViewModel.set("bluePlayer", {name: bluePlayer.name, score: bluePlayer.score, turn: true, country: bluePlayer.country});
		vmModule.gameViewModel.set("turnCol", 1);
	}
	else {
		vmModule.gameViewModel.set("bluePlayer", {name: bluePlayer.name, score: bluePlayer.score, turn: false, country: bluePlayer.country});
		vmModule.gameViewModel.set("redPlayer", {name: redPlayer.name, score: redPlayer.score, turn: true, country: redPlayer.country});
		vmModule.gameViewModel.set("turnCol", 0);
	}
}

exports.pageLoaded = pageModules.pageLoaded;
exports.answerTapped = pageModules.answerTapped;
