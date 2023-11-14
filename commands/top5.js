const { SlashCommandBuilder } = require('discord.js')
const Mee6LevelsApi = require('mee6-levels-api')
const guildId = process.env.TPC_GUILD_ID
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
module.exports = {
  data: new SlashCommandBuilder()
    .setName('top5')
    .setDescription('Posts the leaderboard top 5 members!'),
  async execute(interaction) {
    try {
      // get MEE6 leaderboard and send it to the event channel
      const leaderboard = await Mee6LevelsApi.getLeaderboardPage(guildId)
      // get the top 5 users
      const top5 = leaderboard.slice(0, 5)
      const list = top5.map(user => user.id)

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel('TPC Leaderboard')
            .setURL('https://mee6.xyz/thepilotclub')
            .setStyle(ButtonStyle.Link)
        )

      let formatted = ''
      for (let i = 0; i < list.length; i++) {
        const member = await interaction.guild.members.fetch(list[i])
        console.log(member)
        formatted += `\n${i + 1}. ${member.nickname}`
      }
      interaction.reply({
        content: `**Top 5 TPC Pilots:** \n${formatted}\n \nSee all rankings here:`,
        components: [row]
      })
    } catch (error) {
      console.error(error)
    }
  },
}
