var observable = require("data/observable");
var globalConstants = require("~/common/global-constants");
var Everlive = require('~/everlive.all.min');
var el = new Everlive(globalConstants.ApiId);

var GameModel = (function (_super) {
  __extends(GameModel, _super);
  function GameModel() {
    _super.call(this);
    this.questionTimer = 10;
    this.timerImageSrc = "~/images/timer/timer-10.png";

    var questions = el.data('Question');
    // var query = new Everlive.Query();
    // query.take(2);

    this.allQuestions = questions.get().then(function(data) {
      return data.result;
    }, function(error){
      console.log(error);
    });
  }

  return GameModel;
})(observable.Observable);

exports.gameViewModel = new GameModel();
