const fs = require('fs'); //ability to read files
const file = require("./questions.json")
const cron = require('node-cron'); //ability to repeat code
const client = require('./bot.js')

function randomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

//Parsing questions
let questions = file.questions;
//Getting random question
console.log(questions[randomNum(0,14)][0])

 client.channels.cache.get('864834861603487754').send('Test!')
//Getting random question every day at 8am
cron.schedule('0 0 * * *', function() {
  let generatedNum = randomNum(0,14)
  console.log(questions[generatedNum][0])
   setTimeout(() => {
        console.log(questions[generatedNum][1]);
       newArr = questions.splice(generatedNum, 1)
       fs.writeFileSync("questions.json", JSON.stringify(file));
       //TODO: DELETE ITEM FROM ARRAY
   }, 1000)//Wait 12 hours: 1000 * 60 * 60 * 12
});