var vmModule = require("./game-view-model");
var frameModule = require("ui/frame");
var sound = require("nativescript-sound");
var timer = require("timer");
var sound = require("nativescript-sound");

var timerImageSrc = "~/images/timer/timer-";
var tickSound = sound.create("~/sounds/timer-tick.mp3");
var heheSound = sound.create("~/sounds/hehehe.mp3");

var questions;

var pageModules = (function() {
	var pageModules = {
		pageLoaded: function(args) {
			var page = args.object;
			page.bindingContext = vmModule.gameViewModel;
			vmModule.gameViewModel.get("allQuestions")
				.then(function(data) {
					setQuestion(data);
				});
			topmost = frameModule.topmost();
			startTimer();
		}
	};

	return pageModules;
})();

function startTimer() {
	var timerInterval = timer.setInterval(function() {
		vmModule.gameViewModel.questionTimer -= 1;
		vmModule.gameViewModel.set("timerImageSrc", timerImageSrc + vmModule.gameViewModel.questionTimer + ".png");
		tickSound.play();

		if (vmModule.gameViewModel.questionTimer === 0) {
			timer.clearInterval(timerInterval);
			heheSound.play();
		}
	}, 1000);
}

function setQuestion(data) {
	vmModule.gameViewModel.set("answerA", data[0].AnswerA);
	vmModule.gameViewModel.set("answerB", data[0].AnswerB);
	vmModule.gameViewModel.set("answerC", data[0].AnswerC);
	vmModule.gameViewModel.set("answerD", data[0].AnswerD);
	vmModule.gameViewModel.set("questionContent", data[0].QuestionContent);
}

exports.pageLoaded = pageModules.pageLoaded;
