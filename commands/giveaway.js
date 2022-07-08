const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data:  new SlashCommandBuilder()
            .setName('giveaway')
            .setDescription('Picks a random user with giveaway role.'),
	async execute(interaction) {
        if (interaction.member.roles.cache.some(role => role.name === 'Staff') || interaction.member.roles.cache.some(role => role.name === 'Air Marshals')){
            interaction.guild.members.fetch().then(members => {
                let result = members.filter(m => m.roles.cache.find(role => role.id == process.env.GIVEAWAY_ROLE));
                let tags = result.map(m=>m.user.tag);
                interaction.reply("And the winner is " + tags[Math.floor(Math.random() * tags.length)] + ". Congratulations!");
            })
        } else {
	   interaction.reply("Sorry, /giveaway is staff only")
	}
	},
};
