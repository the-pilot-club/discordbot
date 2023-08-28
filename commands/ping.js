const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute (interaction) {
    await interaction.reply({
      content: 'YOU ACTUALLY USE THIS COMMAND??? DM <@398557782623649794> the words: I know what' +
            ' perfect coding looks like!\n\nOh and Pong!',
      ephemeral: true
    })
  }
}
