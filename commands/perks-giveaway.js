const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data:  new SlashCommandBuilder()
            .setName('perks-giveaway')
            .setDescription('picks random user with company perks role(s)'),
	async execute(interaction) {
        if (interaction.member.roles.cache.some(role => role.name === 'Staff') || interaction.member.roles.cache.some(role => role.name === 'Air Marshals')){
            interaction.guild.members.fetch().then(members => {
                let result = members.filter(m => m.roles.cache.find(role => role.id == process.env.VIP_ROLE || role.id == process.env.COMMUTER_ROLE 
                || role.id == process.env.FREQUENTFLIER_ROLE))
                let tags = result.map(m=>m.user.tag);
                interaction.reply("And the winner is " + tags[Math.floor(Math.random() * tags.length)] + ". Congratulations!");
            })
        } else {
	   interaction.reply("Sorry, /giveaway is staff only")
	}
	},
};