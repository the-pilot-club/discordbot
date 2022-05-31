const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data:  new SlashCommandBuilder()
            .setName('giveaway')
            .setDescription('picks random user with giveaway role'),
	async execute(interaction) {
        if (interaction.member.roles.cache.some(role => role.name === 'Staff') || interaction.member.roles.cache.some(role => role.name === 'Air Marshals')){
            let members = interaction.guild.roles.cache.get('860938566426558505').members.map(m=>m.user.tag)
            interaction.reply("The winner is: " + members[Math.round(Math.random() * members.length)] + " Congrats!");
        }
	},
};