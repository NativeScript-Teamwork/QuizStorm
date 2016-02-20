var observable = require("data/observable");
var globalConstants = require("~/common/global-constants");
var Everlive = require('~/everlive.all.min');
var el = new Everlive(globalConstants.ApiId);

var scoreWorldwidePropName = 'scoreWorldwide';
var scoreLocalPropName = 'scoreLocal';

var ScoreModel = new observable.Observable();

var scores = el.data('Score');
var query = new Everlive.Query();
query.orderDesc('Points').take(6);

scores.get(query).then(function(data) {
	ScoreModel.set(scoreWorldwidePropName, data.result);
});

var local = [];
local.push({name: 'Vasil', score: 150, country: 'Bulgaria'});
local.push({name: 'Ivan', score: 145, country: 'Bulgaria'});
local.push({name: 'Adrian', score: 70, country: 'Bulgaria'});
local.push({name: 'Ivaylo', score: 55, country: 'Bulgaria'});

ScoreModel.set(scoreLocalPropName, local);

// TODO: Get local statistics

exports.scoreViewModel = ScoreModel;
