var observable = require("data/observable");
var globalConstants = require("~/common/global-constants");
var Everlive = require('~/everlive.all.min');
var el = new Everlive(globalConstants.ApiId);
var connection = require("~/common/internet-connection");
var playerService = require("~/services/player-service");
var questionService = require("~/services/question-service");

var GameModel = (function (_super) {
  __extends(GameModel, _super);
  function GameModel() {
    _super.call(this);
    this.questionTimer = 10;
    this.turnCol = 0;

    questionService.Question.deleteDataFromTable('Question');
    questionService.Question.seedQuestions();

    var that = this;

    this.setPlayers = function() {
      return  playerService.Players.getPlayers().then(function(data) {
        that.redPlayer = global.redPlayer;
        that.bluePlayer = global.bluePlayer;
      });
    };

    this.timerImageSrc = "~/images/timer/timer-10.png";

    if (connection.networkType === 'none') {
      questionService.Question.getAllQuestions().then(function(data) {
        var questionsSQLite = [];

        for (var i = 0; i < data.length; i += 1) {
          var question = {
            questionContent: data[i][1],
            answerA: data[i][2],
            answerB: data[i][3],
            answerC: data[i][4],
            answerD: data[i][5],
            correctAnswer: data[i][6],
            hint: data[i][7]
          };

          questionsSQLite.push(question);
        }

        that.allQuestions = questionsSQLite;
      });

      console.log('Connection type: none');
    } else if (connection.networkType === 'wifi'|| connection.networkType === 'mobile') {
      var questions = el.data('Question');

      that.allQuestions = questions.get().then(function(data) {
        return data.result;
      }, function(error){
        console.log(error);
      });

      console.log('Connecion type: wifi/mobile');
    }
  }
  return GameModel;
})(observable.Observable);

exports.gameViewModel = new GameModel();
