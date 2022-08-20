const {EmbedBuilder} = require("discord.js");
module.exports = {
    name: 'messageCreate',
    once: false,
    execute(client) {
        const sergechannel = client.guild.channels.cache.find(channel => channel.name === "serges-office")
        const adminbotlog = client.guild.channels.cache.find(channel => channel.name === "admin-bot-logs")
        if (sergechannel.position !== 0) {
             const embed = new EmbedBuilder()
                 .setTitle('SERGES OFFICE MOVED')
                 .setColor(`#FF0000`)
                 .setFooter({text:`Made by The Pilot Club` ,iconURL: `https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png`})
                 .setTimestamp()
            adminbotlog.send({content: '<@398557782623649794>' ,embeds:[embed]})
             sergechannel.setPosition(0)
         }
    },
};