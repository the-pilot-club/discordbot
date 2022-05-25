const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('The link to find our leaderbaord!'),
	async execute(interaction) {
        const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setLabel('TPC Leaderboard')
          .setURL("https://mee6.xyz/thepilotclub")
          .setStyle('LINK'),
        ) ;
      await interaction.reply({content:`Check out our leaderboard!`, components: [row]})
	},
};