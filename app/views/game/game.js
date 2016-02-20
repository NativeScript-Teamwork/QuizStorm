var vmModule = require("./game-view-model");
var frameModule = require("ui/frame");
var sound = require("nativescript-sound");
var timer = require("timer");
var sound = require("nativescript-sound");

var timerImageSrc = "~/images/timer/timer-";
var tickSound = sound.create("~/sounds/timer-tick.mp3");
var heheSound = sound.create("~/sounds/hehehe.mp3");

var pageModules = (function() {

	var pageModules = {
		pageLoaded: function(args) {
			var page = args.object;
			page.bindingContext = vmModule.gameViewModel;
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

exports.pageLoaded = pageModules.pageLoaded;
