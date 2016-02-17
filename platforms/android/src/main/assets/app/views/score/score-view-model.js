var observable = require("data/observable");

var scoreWorldwidePropName = 'scoreWorldwide';
var scoreLocalPropName = 'scoreLocal';

var ScoreModel = new observable.Observable();

var worldwide = [];
worldwide.push({name: 'Nikolay', score: 350, country: 'Bulgaria'});
worldwide.push({name: 'John', score: 85, country: 'USA'});
worldwide.push({name: 'Pablo', score: 60, country: 'Mexico'});
worldwide.push({name: 'Dmitrii', score: 10, country: 'Russia'});

var local = [];
local.push({name: 'Vasil', score: 150, country: 'Bulgaria'});
local.push({name: 'Ivan', score: 145, country: 'Bulgaria'});
local.push({name: 'Adrian', score: 70, country: 'Bulgaria'});
local.push({name: 'Ivaylo', score: 55, country: 'Bulgaria'});

ScoreModel.set(scoreWorldwidePropName, worldwide);
ScoreModel.set(scoreLocalPropName, local);

// TODO: Get score statistics
// top 3 worldwide 
// top 3 local

exports.scoreViewModel = ScoreModel;