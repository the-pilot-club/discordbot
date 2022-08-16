const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('charters-ferry-request')
        .setDescription('Use this command to request an aircraft to be ferried to another location.'
        ).addStringOption(option =>
            option.setName('aircraft-registration').setDescription('What is the Tail Number for the aircraft you would like ferried?').setRequired(true)
        ).addStringOption(option =>
            option.setName('starting-icao').setDescription('Where is the Aircraft located?').setRequired(true)
        ).addStringOption(option =>
            option.setName('ending-icao').setDescription('Where would you like the aircraft to go?').setRequired(true)
        ),
    async execute(interaction, client) {
        const channel = interaction.guild.client.channels.cache.get(process.env.CHARTERS_REQUEST_CHANNEL)
        const end = interaction.options.getString('ending-icao')
        const start = interaction.options.getString('starting-icao')
        const tail = interaction.options.getString('aircraft-registration')
        const embed = new MessageEmbed()
            .setAuthor({name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
            .setTitle('New Ferry Request')
            .setColor('0X37B6FF')
            .addFields({
                name: '\u200b',
                value: `**TPC Charters User:** ${interaction.user} \n**Registration Number:** ${tail.toUpperCase()} \n**Starting Location:** ${start.toUpperCase()} \n**Ending Location** ${end.toUpperCase()}`
            })
            .setFooter({text: 'Made by The Pilot Club For TPC Charters'});
        if (interaction.member.roles.cache.some(role => role.name === 'TPC Charters')) {
            channel.send({content: `<@&910012872246046730>`, embeds: [embed]})
            await interaction.reply({
                content: `You have requested for tail number ${tail.toUpperCase()} to be ferried from ${start.toUpperCase()} to ${end.toUpperCase()}. A Charters Manager will ferry the aircraft as soon as they can. If you do not have the aircraft moved within 12 hours, please try this command again.`,
                ephemeral: true
            })
        } else {
            interaction.reply({
                content: `You do not have the TPC Charters Role! Go to #about-and-sop to learn more!`,
                ephemeral: true
            })
        }
    }
}