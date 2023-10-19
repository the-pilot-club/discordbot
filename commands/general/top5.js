import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'
import Mee6LevelsApi from 'mee6-levels-api'

const guildId = process.env.TPC_GUILD_ID

export default {
  data: new SlashCommandBuilder()
    .setName('top5')
    .setDescription('Posts the leaderboard top 5 members!'),
  async execute (interaction) {
    // get MEE6 leaderboard and send it to the event channel
    Mee6LevelsApi.getLeaderboardPage(guildId).then(leaderboard => {
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
        formatted += `\n${i + 1}. ` + ('<@' + list[i] + '>')
      }
      interaction.reply({
        content: `**Top 5 TPC Pilots:** \n${formatted}\n \nSee all rankings here:`,
        components: [row]
      })
    }).catch(err => {
      console.log(err)
    })
  }
}
