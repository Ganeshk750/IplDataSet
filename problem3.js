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
//=======TO GETTING PER YEAR EXTRA RUN GIVEN BY EACH TEAM FUNCTION START======//
function extraRunGivenByEachTeamPerYear(year){
let matches = extractingDataFromCSV('./matches.csv');
let deliveries = extractingDataFromCSV('./deliveries.csv');
let newArray = {};
let newObj = [];
matches.map((match) =>{
    if(year == match['season']){
       newObj.push(match['id']);
    }
});
deliveries.map((delivery) =>{
    if(newObj.includes(delivery['match_id'])){
        if(!newArray.hasOwnProperty(delivery['bowling_team'])){
            newArray[delivery['bowling_team']] = Number(delivery['extra_runs']);
        }else{
            newArray[delivery['bowling_team']] += Number(delivery['extra_runs']);
        }
    }
});
  return newArray;
}
var totalExtraRunObj = extraRunGivenByEachTeamPerYear(2016);
console.log(totalExtraRunObj);
//=======TO GETTING PER YEAR EXTRA RUN GIVEN BY EACH TEAM FUNCTION END======//