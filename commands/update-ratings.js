const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageActionRow, MessageButton} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('update-ratings')
        .setDescription('Update your VATSIM Ratings with The Pilot Club!'),
    async execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Update my Ratings!')
                    .setURL(`https://callsigns.thepilotclub.org/sendauthentication.aspx?id=${interaction.user.id}`)
                    .setStyle('LINK'),
            );
        await interaction.reply({content: `Update your ratings here!`,components: [row],ephemeral: true})
    }
};