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
//=======TO GETTING ECONOMICAL BOWLERS OF THE YEAR FUNCTION START======//
function topEconomicalBowler(year){
    let matches = extractingDataFromCSV('./matches.csv');
    let deliveries = extractingDataFromCSV('./deliveries.csv');
    let newArray = {};
    let newObj = [];
    matches.map((match)=>{
      if(year == match['season']){
          newObj.push(match['id']);
      }
    });
    deliveries.map((delivery)=>{
        if(newObj.includes(delivery['match_id'])){
            if(!newArray.hasOwnProperty(delivery['bowler'])){
                newArray[delivery['bowler']] = {'runs': Number(delivery['total_runs']), 'ball':1}
            }else{
                newArray[delivery['bowler']].runs += Number(delivery['total_runs']);
                newArray[delivery['bowler']].ball += 1;
            }
        }
    });
     //return newArray;
    let econimicalArray = Object.keys(newArray).reduce((keys,value)=>{
          keys.push([value,newArray[value].runs/(newArray[value].ball/6)]);
          return keys;  
   },[]);
     // return econimicalArray;
   econimicalArray.sort((start,end)=>{
      start = start[1];
      end = end[1];
      return start - end;
   });
   // return econimicalArray;
   let sortedBowler = {};
   for(let i = 0; i < 10; i++){
       sortedBowler[econimicalArray[i][0]] = econimicalArray[i][1];
   }
    return sortedBowler;
}
var economicalBowlerObj = topEconomicalBowler(2015);
console.log(economicalBowlerObj);

//=======TO GETTING ECONOMICAL BOWLERS OF THE YEAR FUNCTION START======//