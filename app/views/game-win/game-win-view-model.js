var observable = require("data/observable");
var view = require("ui/core/view");
var globalConstants = require("~/common/global-constants");
var connection = require("~/common/internet-connection");
var scoreService = require("~/services/score-service");
var playerService = require("~/services/player-service");
var Everlive = require('~/everlive.all.min');
var el = new Everlive(globalConstants.ApiId);

var winnerNamePropName = "winnerName";
var winnerPointsPropName = "winnerPoints"

var GameWinViewModel = new observable.Observable();

page.on("navigatedTo", function (eventData) {
   var playerOne = page.navigationContext.playerOne;
   console.log(playerOne.name);
});

playerService.Players.getPlayerWinner().then(function(data) {
	console.log(data.result[0][1]);
	console.log(data.result[0][2]);
	GameWinViewModel.set(winnerNamePropName, data.result[0][1]);
	GameWinViewModel.set(winnerPointsPropName, data.result[0][2]);
});

exports.gameWinViewModel = GameWinViewModel;