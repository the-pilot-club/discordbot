const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pilots-role')
        .setDescription('Assigns All Member the pilots role :)'),
    async execute(interaction) {
        const guild = interaction.client.guilds.cache.get(process.env.TPC_DEV_ID);
        const members = await interaction.guild.members.fetch();
        const role = interaction.guild.roles.cache.find(role => role.name === 'Pilots')
        members.forEach(members => members.roles.add(role));
        await interaction.reply({content: 'Done!', ephemeral: true}).catch(error =>
            console.error`I failed at the edit reply stage`)
    }
};