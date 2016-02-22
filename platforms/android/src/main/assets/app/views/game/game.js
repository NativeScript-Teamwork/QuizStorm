var vmModule = require("./game-view-model");
var frameModule = require("ui/frame");
var sound = require("nativescript-sound");
var timer = require("timer");
var sound = require("nativescript-sound");
var colorModule = require("color");
var animation = require("ui/animation");

var timerImageSrc = "~/images/timer/timer-";
var tickSound = sound.create("~/sounds/timer-tick.mp3");
var heheSound = sound.create("~/sounds/hehehe.mp3");
var correctAnswerSound = sound.create("~/sounds/correct.mp3");
var wrongAnswerSound = sound.create("~/sounds/wrong.mp3");

var currentQuestionIndex;
var timerInterval;
var questions;

var largeFont = 20;
var smallFont = 16;
var defaultAnswerColor = new colorModule.Color("#2184C8");
var wrongAnswerColor = new colorModule.Color("#D9523C");
var correctAnswerColor = new colorModule.Color("#76B900");

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
		answerSwiped: function(args) {
			var receivedAnswer = args.object.text;
			var answer = args.object;

			if (currentQuestionIndex >= questions.length) {
				// what happens when the questions end
				timer.clearInterval(timerInterval);
				navigateToGameWinPage();
				return;
			}

			if (receivedAnswer === questions[currentQuestionIndex].CorrectAnswer) {
				increaseScoreToPlayerInTurn();
				correctAnswerSound.play();

				animateAnswerWithColor(answer, correctAnswerColor)
				.then(function() {
					prepareForNextQuestion();
				});
			}
			else {
				switchPlayerTurns();
				wrongAnswerSound.play();

				animateAnswerWithColor(answer, wrongAnswerColor)
				.then(function() {
					prepareForNextQuestion();
				});
			}
		},
		enlargeTextDoubleTap: function(args) {
			if (args.object.fontSize === smallFont) {
				args.object.fontSize = largeFont;
			}
			else if (args.object.fontSize === largeFont) {
				args.object.fontSize = smallFont;
			}
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
				navigateToGameWinPage();
				return;
			}

			startTimer();
			setVisualTimerToDefault();
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

function navigateToGameWinPage() {
	var navigationEntry = {
		moduleName: "./views/game-win/game-win",
		backstackVisible: false,
		animated: true,
		navigationTransition: {
			transition: "flip "
		},
	};

	topmost.navigate(navigationEntry);
}

function setVisualTimerToDefault() {
	vmModule.gameViewModel.set("questionTimer", 10);
	vmModule.gameViewModel.set("timerImageSrc", timerImageSrc + vmModule.gameViewModel.get("questionTimer") + ".png");
}

function animateAnswerWithColor(answer, colorToAnimate) {
	return answer.animate({
		translate: { x: 100, y: 0},
		duration: 500,
		backgroundColor: colorToAnimate
	})
	.then(function () {
		return answer.animate({
			translate: { x: 0, y: 0},
			duration: 500,
			backgroundColor: defaultAnswerColor
		});
	});
}

function prepareForNextQuestion() {
	currentQuestionIndex++;

	if (currentQuestionIndex >= questions.length) {
		// what happens when the questions end
		timer.clearInterval(timerInterval);
		navigateToGameWinPage();
		return;
	}

	timer.clearInterval(timerInterval);
	setVisualTimerToDefault();
	startTimer();
	setQuestion(questions, currentQuestionIndex);
}

exports.pageLoaded = pageModules.pageLoaded;
exports.answerSwiped = pageModules.answerSwiped;
exports.enlargeTextDoubleTap = pageModules.enlargeTextDoubleTap;
