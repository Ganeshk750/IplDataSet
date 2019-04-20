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

//=========TO GETTING PER YEAR TOTAL MATCH FUNCTION START===========//
function totalMatchPerSeason(){
let matcheObj = extractingDataFromCSV('./matches.csv');
let totalMatch = matcheObj.reduce((keys, value)=>{
     if(keys.hasOwnProperty(value['season'])){
         keys[value['season']] += 1;
         return keys;
     }else{
         keys[value['season']] = 1;
         return keys;
     }
},{});
     delete totalMatch['undefined'];
     return totalMatch;
}
var seasonObj = totalMatchPerSeason();
console.log(seasonObj);
//=========TO GETTING PER YEAR TOTAL MATCH FUNCTION END===========//

