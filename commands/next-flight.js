const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('next-flight')
		.setDescription('The link to find our out our next flight!'),
	async execute(interaction) {
        const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setLabel('Next TPC Group Flight')
          .setURL("https://thepilotclub.org/dispatch")
          .setStyle('LINK'),
        ) ;
      await interaction.reply({content:`Next TPC Group Flight:`, components: [row]})
}
};