const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pilots-role')
    .setDescription('Assigns all members the Pilots role :)'),
  async execute (interaction) {
    const members = await interaction.guild.members.fetch()
    const role = interaction.guild.roles.cache.find(role => role.name === 'Pilots')
    members.forEach(members => members.roles.add(role))
    await interaction.reply({ content: 'Done!', ephemeral: true }).catch(error => {
      console.error(`I failed at the edit reply stage: ${error}`)
    })
  }
}
