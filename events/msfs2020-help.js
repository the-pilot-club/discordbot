const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'messageCreate',
    once: false,
      execute(message) {
      if (message.content.toLowerCase() === "msfs2020 help") {
      const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
        .setLabel('Microsoft Flight Simulator 2020 FAQ')
        .setURL("https://www.reddit.com/r/flightsim/wiki/msfsfaq")
        .setStyle('LINK'),    
      )
      message.reply({content:"Check out MSFS2020 FAQ!" , components:[row]})
      }
    }
  };