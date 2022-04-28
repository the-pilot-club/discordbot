const client = require('./bot.js')
client.on("messageCreate", (message) => {
    if (message.content.toLowerCase() === "support") {
    message.reply("To get support or submit feedback, click here: https://support.thepilotclub.org/open.php  Thank you for being a vauled member of The Pilot Club!!")
        }
  })