var observable = require("data/observable");
var globalConstants = require("~/common/global-constants");
var Everlive = require('~/everlive.all.min');
var playerService = require("~/services/player-service");
var el = new Everlive(globalConstants.ApiId);

var GameModel = (function (_super) {
  __extends(GameModel, _super);
  function GameModel() {
    _super.call(this);
    this.questionTimer = 10;
    this.turnCol = 0;

    var that = this;

    playerService.Players.getPlayers()
    .then(function(data) {
      that.redPlayer = {name: data[0][1], score: +data[0][2], turn: false};
      that.bluePlayer = {name: data[1][1], score: +data[1][2], turn: false};

    });

    this.timerImageSrc = "~/images/timer/timer-10.png";

    var questions = el.data('Question');

    this.allQuestions = questions.get().then(function(data) {
      return data.result;
    }, function(error){
      console.log(error);
    });
  }
  return GameModel;
})(observable.Observable);

exports.gameViewModel = new GameModel();
