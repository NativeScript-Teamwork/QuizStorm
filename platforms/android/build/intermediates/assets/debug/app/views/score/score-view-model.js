var observable = require("data/observable");
var globalConstants = require("~/common/global-constants");
var connection = require("~/common/internet-connection");
var scoreService = require("~/services/score-service");
var Everlive = require('~/everlive.all.min');
var el = new Everlive(globalConstants.ApiId);

var scoreWorldwidePropName = 'scoreWorldwide';
var scoreLocalPropName = 'scoreLocal';

var ScoreModel = new observable.Observable();

var scores = el.data('Score');
var query = new Everlive.Query();
query.orderDesc('Points').take(6);

if (connection.networkType === 'none') {
	var worldwideScoreSQLite = scoreService.Scores.getTopSixWorldwideScores();
	var worldwideScoreSQLiteResult = [];

	worldwideScoreSQLite.then(function(data) {
		for (var i = 0; i < data.length; i++) {
			var score = {
				PlayerName: data[i][1],
				Points: data[i][2],
				Country: data[i][3]
			};

			worldwideScoreSQLiteResult.push(score);
		}

		ScoreModel.set(scoreWorldwidePropName, worldwideScoreSQLiteResult);
	});

	console.log('Connection type: none');
} else if (connection.networkType === 'wifi'|| connection.networkType === 'mobile') {
		scores.get(query).then(function(data) {
		ScoreModel.set(scoreWorldwidePropName, data.result);

		scoreService.Scores.deleteDataFromTable("WorldwideScore")

		for (var i = 0; i < data.result.length; i += 1) {
			var score = data.result[i];
			scoreService.Scores.addWorldwideScore(i, score.PlayerName, score.Points, score.Country);
		}
	});

	console.log('Connecion type: wifi/mobile');
}

var local = [];
local.push({name: 'Vasil', score: 150, country: 'Bulgaria'});
local.push({name: 'Ivan', score: 145, country: 'Bulgaria'});
local.push({name: 'Adrian', score: 70, country: 'Bulgaria'});
local.push({name: 'Ivaylo', score: 55, country: 'Bulgaria'});

ScoreModel.set(scoreLocalPropName, local);

// TODO: Get local statistics

exports.scoreViewModel = ScoreModel;
