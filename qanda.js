const fs = require('fs'); //ability to read files
const file = require("./questions.json")
const cron = require('node-cron'); //ability to repeat code
const client = require('./bot.js')

client.on('ready', () => {
    console.log("Logged in as QandA!")
})    

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


client.on("messageCreate", (message) => {
  if (message.content.toLowerCase() === "eric") {
    message.reply("<@398557782623649794> That one guy who knew enough coding to make me a thing (with help from <@875527822611992577>). If you are seeing this message, DM him and tell him the code word || Green Horn ||")
  }
})