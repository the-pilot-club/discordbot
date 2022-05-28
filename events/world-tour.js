const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
name: 'messageCreate',
once: false,
execute(message) {
    if (message.content.toLowerCase() === "world tour"){
        const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setLabel('Get the World Tour Role')
          .setURL("https://discord.com/channels/830201397974663229/831645469472981002/856378173280223243")
          .setStyle('LINK'),    
        ) 
        message.reply({content:"Want to join the World Tour Flight? Proceed to this message and click the Globe!", components:[row]})
      }
    }
};