const {SlashCommandBuilder} = require('@discordjs/builders');
const Mee6LevelsApi = require("mee6-levels-api");
const guildId = process.env.TPC_GUILD_ID;
const {MessageActionRow, MessageButton} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('top5')
        .setDescription('Posts the leaderboard top 5 members!'),
    async execute(interaction, client) {
        //get MEE6 leaderboard and send it to the event channel
        Mee6LevelsApi.getLeaderboardPage(guildId).then(leaderboard => {
            //get the top 5 users
            var top5 = leaderboard.slice(0, 5)
            let list = top5.map(user => user.id)
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('TPC Leaderboard')
                        .setURL("https://mee6.xyz/thepilotclub")
                        .setStyle('LINK'),
                );
            var formatted = ""
            for (var i = 0; i < list.length; i++) {
                formatted += `\n${i + 1}. ` + ("<@" + list[i] + ">")
            }
            interaction.reply({
                content: `Our **Top 5** this week: \n${formatted}\n \nSee all rankings here:`,
                components: [row]
            })
        }).catch(err => {
        });
    }
};