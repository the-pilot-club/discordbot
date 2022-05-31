const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data:  new SlashCommandBuilder()
            .setName('giveaway')
            .setDescription('picks random user with giveaway role'),
	async execute(interaction) {
        if (interaction.member.roles.cache.some(role => role.name === 'Staff') || interaction.member.roles.cache.some(role => role.name === 'Air Marshals')){
            let channel = interaction.channel;
            interaction.guild.members.fetch().then(members => {
                let result = members.filter(m => m.roles.cache.find(role => role.id == '860938566426558505'));
                let tags = result.map(m=>m.user.tag);
                //channel.send("The winner is: " + tags[Math.round(Math.random() * tags.length)] + " Congrats!");
                console.log(result.size, tags.length);
            })
        }
	},
};