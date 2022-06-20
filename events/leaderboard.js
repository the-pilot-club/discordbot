const Mee6LevelsApi = require("mee6-levels-api");
const guildId = process.env.GUILD_ID;
module.exports = {
    name: 'messageCreate',
    once: false,
      async execute(message) {
      if (message.content.toLowerCase() === "leaderboard"){
        //get MEE6 leaderboard and send it to the event channel
    Mee6LevelsApi.getLeaderboardPage(guildId).then(leaderboard => {
      //get the top 5 users
      var top5 = leaderboard.slice(0,5)
      let list = top5.map(user => user.id)
      var formatted = ""
      for (var i = 0; i < list.length; i++){
        formatted+= "\n" +("<@" + list[i] + ">")
      }
      message.reply(`Our **Top 5** of the week: \n${formatted}\nSee all rankings here: https://vats.im/tpc-leaderboard`)
    }).catch(err => {
    });
  }
      }
  };