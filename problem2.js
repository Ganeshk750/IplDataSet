//=======LOAD CSV FILE AND GET DATA IN THE FORM OF OBJECTS START=======//
var fs = require('fs');
function extractingDataFromCSV(path){
var readFile = fs.readFileSync(path,{
    encoding: 'utf-8'
});
readFile = readFile.split('\n');
var attribute = readFile.shift().split(',');
var newArray =[];
readFile.forEach(function(data){
    var temp ={};
    var newData = data.split(',');
    for(let i = 0; i < attribute.length; i++){
        temp[attribute[i]] = newData[i];
    }
    newArray.push(temp);
});
  return newArray;
}
//=========LOAD CSV FILE AND GET DATA IN THE FORM OF OBJECTS START========//

//=========TO GETTING PER YEAR WINNER TEAM FUNCTION START==========//
function numberOfMatchesWonsPerYearEachTeam(){
let matches = extractingDataFromCSV('./matches.csv');
let winner = matches.reduce((keys, value)=>{
        if(!keys.hasOwnProperty(value['season'])){
            keys[value['season']] = {};
        }
        if(!keys[value['season']].hasOwnProperty(value['winner'])){
            keys[value['season']][value['winner']] = 1;
            return keys;
        }else{
            keys[value['season']][value['winner']] += 1;
            return keys;
        }
},{});
     delete winner['undefined'];
     return winner;
}
var totalWinnerTeamObj = numberOfMatchesWonsPerYearEachTeam();
console.log(totalWinnerTeamObj);
//=========TO GETTING PER YEAR WINNER TEAM FUNCTION END===========//