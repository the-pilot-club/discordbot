const client = require('./bot.js')
client.on("messageCreate", (message) => {
    if (message.content.toLowerCase() === "eric") {
      message.reply("<@398557782623649794> That one guy who knew enough coding to make me a thing (with help from <@875527822611992577>). If you are seeing this message, DM him and tell him the code word || Green Horn ||")
    }
  })