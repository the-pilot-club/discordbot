const { SlashCommandBuilder } = require('discord.js')
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('The link to find our leaderboard!'),
  async execute (interaction) {
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel('TPC Leaderboard')
          .setURL('https://mee6.xyz/thepilotclub')
          .setStyle(ButtonStyle.Link)
      )
    await interaction.reply({ content: 'Check out our leaderboard!', components: [row] })
  }
}
