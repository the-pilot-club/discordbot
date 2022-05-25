const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('metar')
        .setDescription('gives metar for specific airport').addStringOption(option =>
        option.setName('airport')
        .setDescription('The input to echo back')
        .setRequired(true)),
	async execute(interaction) {
		const airport = interaction.options.getString('airport')
      const response = await fetch(`https://metar.vatsim.net/metar.php?id=${airport}`);
      const body = await response.text();
      if (body != undefined){
        var metarEmbed =
        {
          "type": "rich",
          "title": `WEATHER REPORT`,
          "description": airport.toUpperCase(),
          "color": 0X37B6FF,
          "fields": [
            {
              "name": `METAR`,
              "value": body
            }
          ],
          "footer": {
            "text": `Made by The Pilot Club`
          }
        }
      interaction.reply({ embeds: [metarEmbed] })
      //interaction.reply(body)
        //test
    } else {
      interaction.reply("METAR isn't posted for: " + airport)
    };
	},
};