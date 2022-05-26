const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'messageCreate',
    once: false,
      execute(message) {
        if (message.content.toLowerCase() === "tpc callsign") {
        const embed = new MessageEmbed()
        .setTitle('TPC Callsign')
        .setDescription( 'A guide on how to get a TPC Callsign')
        .setColor('0X37B6FF')
        .addFields({name:'How to get a TPC Callsign', value: `When flying group flights you get an extra 250xp points for using a TPC callsign during the flight. \n \n To get a TPC callsign you just need to register one that has not yet been taken. You can do so here: https://support.thepilotclub.org/open.php and under the drop down click "Request TPC Callsign"`})
        .setFooter({text: 'Made by The Pilot Club For TPC Charters'});
      
        message.reply({embeds: [embed]})
        }
    }
  };