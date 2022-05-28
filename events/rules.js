const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'messageCreate',
    once: false,
      execute(message) {
      if (message.content.toLowerCase() === "rules") {
        const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setLabel('The Pilot Club Rules')
          .setURL("https://discord.com/channels/830201397974663229/833198809701679124/848232804282138644")
          .setStyle('LINK'),    
        )
        message.reply({content:"You can find the club rules here!", components:[row]})
      }
    }
  };