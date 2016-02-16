var vmModule = require("./home-view-model");
var sound = require("nativescript-sound");

function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.mainViewModel;
}

function bananaSoundPlay() {
	var bananaSound = sound.create("~/sounds/banana.mp3");
	bananaSound.play();
}


exports.pageLoaded = pageLoaded;
exports.bananaSoundPlay = bananaSoundPlay;
