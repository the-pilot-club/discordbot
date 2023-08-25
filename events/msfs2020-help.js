const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
  name: 'messageCreate',
  once: false,
  execute (message) {
    if (message.content.toLowerCase() === 'msfs2020 help') {
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel('Microsoft Flight Simulator 2020 FAQ')
            .setURL('https://www.reddit.com/r/flightsim/wiki/msfsfaq')
            .setStyle(ButtonStyle.Link)
        )
      message.reply({ content: 'Check out MSFS2020 FAQ!', components: [row] })
    }
  }
}
