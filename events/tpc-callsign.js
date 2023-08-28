const { EmbedBuilder } = require('discord.js')
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
  name: 'messageCreate',
  once: false,
  execute (message) {
    if (message.content.toLowerCase() === 'tpc callsign') {
      const embed = new EmbedBuilder()
        .setTitle('TPC Callsign')
        .setColor('#37B6FF')
        .addFields({
          name: 'How to get a TPC Callsign',
          value: 'When flying group flights you get an extra 250xp points for using a TPC callsign during the flight.'
        })
        .addFields({
          name: '\u200b',
          value: 'To get a TPC callsign you just need to register one that has not yet been taken. You can do so with the button below and fill in the blanks!'
        })
        .setFooter({ text: 'Made by The Pilot Club' })
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel('Get a Call Sign Here!')
            .setURL('https://callsigns.thepilotclub.org/')
            .setStyle(ButtonStyle.Link))
      message.reply({ embeds: [embed], components: [row] })
    }
  }
}
