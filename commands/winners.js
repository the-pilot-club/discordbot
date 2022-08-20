const {SlashCommandBuilder} = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('winners')
        .setDescription('Replies with the charters winners!'),
    async execute(interaction) {
        await interaction.reply({content: 'This Command is still in work. Come Back later to see what it does!', ephemeral: true});
    },
};