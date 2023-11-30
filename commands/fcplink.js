const { SlashCommandBuilder } = require('discord.js')
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fcplink')
    .setDescription('The link to the Flight Crew Portal'),
  async execute (interaction) {
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel('Flight Crew Portal')
          .setURL('https://flightcrew.thepilotclub.org/')
          .setStyle(ButtonStyle.Link)
      )
    await interaction.reply({ content: 'Here is the link to the FCP:', components: [row] })
  }
}
