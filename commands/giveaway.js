const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data:  new SlashCommandBuilder()
            .setName('giveaway')
            .setDescription('picks random user with giveaway role'),
	async execute(interaction) {
        if (interaction.member.roles.cache.some(role => role.name === 'Staff') || interaction.member.roles.cache.some(role => role.name === 'Air Marshals')){
            interaction.guild.roles.fetch('860938566426558505').then(role => {
                let members = role.members.map(m=>m.user.tag);
                interaction.reply("The winner is: " + members[Math.round(Math.random() * members.length)] + " Congrats!");
                console.log(members.length)
            })
        }
	},
};