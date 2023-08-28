const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('membercount')
    .setDescription('Replies with the Member Count!'),
  async execute (interaction) {
    await interaction.reply(`Number of pilots in The Pilot Club: ${interaction.guild.memberCount}`)
  }
}
