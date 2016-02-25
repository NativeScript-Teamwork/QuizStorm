var observable = require("data/observable");
var view = require("ui/core/view");
var globalConstants = require("~/common/global-constants");
var connection = require("~/common/internet-connection");
var scoreService = require("~/services/score-service");
var playerService = require("~/services/player-service");
var Everlive = require('~/everlive.all.min');
var el = new Everlive(globalConstants.ApiId);

var winnerNamePropName = "winnerName";
var winnerPointsPropName = "winnerPoints";

var GameWinViewModel = new observable.Observable();

GameWinViewModel.setWinner = function() {
  if (global.redPlayer.score > global.bluePlayer.score) {
    GameWinViewModel.set("nameOfWinner", global.redPlayer.name);
    GameWinViewModel.set("scoreOfWinner", global.redPlayer.score);
  }
  else {
    GameWinViewModel.set("nameOfWinner", global.bluePlayer.name);
    GameWinViewModel.set("scoreOfWinner", global.bluePlayer.score);
  }
};

exports.gameWinViewModel = GameWinViewModel;
exports.setWinner = GameWinViewModel.setWinner;
