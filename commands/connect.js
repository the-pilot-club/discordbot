const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('connect')
		.setDescription('Connect your Discord Account to your VATSIM Account in the pilot Club!'),
	async execute(interaction) {
        const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setLabel('Connect my account!')
          .setURL(`https://callsigns.thepilotclub.org/sendauthentication.aspx?id=${interaction.user.id}`)
          .setStyle('LINK'),
        ) ;
      await interaction.reply({content:`This feature is not avaiable yet!`,}) //components: [row]})
}
};