const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Collection, Intents, Interaction } = require('discord.js');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('charters-aircraft-request')
        .setDescription('Use this commnad to request an aircraft for use in OnAir.'
        ).addStringOption(option =>
            option.setName('airline-code').setDescription('What is the code to your Airline in OnAir?').setRequired(true)
        ).addStringOption(option=>
            option.setName('aircraft-type').setDescription('What is the aircraft type you would like?').setRequired(true)
        ).addStringOption(option=>
            option.setName('seating-config').setDescription('What is the prefered seating configuration you would like?').setRequired(true)
        ).addStringOption(option=>
            option.setName('starting-location').setDescription('Where would you like to start using this aircraft? (We will get you as close as we can)').setRequired(true)
        ),
	async execute(interaction,client) {
        const channel = interaction.guild.client.channels.cache.get('864834861603487754')
        const airline = interaction.options.getString('airline-code')
        const type = interaction.options.getString('aircraft-type')
        const seating = interaction.options.getString('seating-config')
        const start = interaction.options.getString('starting-location')
        const embed = new MessageEmbed()
            .setAuthor({name:`${interaction.user.tag}`, iconURL:`${interaction.user.displayAvatarURL()}`})
            .setTitle('New Aircraft Request')
            .setDescription( 'A member of TPC has submitted a request for an aircraft for use in OnAir.')
            .setColor('0X37B6FF')
            .addFields({name:'Aircraft Details', value: `**TPC Charters User:** ${interaction.user} \n  **Airline Code:** ${airline} \n **Aircraft Type:** ${type} \n **Seating Configuration:** ${seating} \n **Starting Location:** ${start}`})
            .setFooter({text: 'Made by The Pilot Club For TPC Charters'});
        if (interaction.member.roles.cache.some(role => role.name === 'TPC Charters')){
            channel.send({content: `<@&910012872246046730>` , embeds: [embed]})
            await interaction.reply({content:`You have requested a ${type} for ${airline}. A Charters Manager will assign the aircraft as soon as they can. If you do not have the aircraft assigned within 12 hours, please try this command again.`, ephemeral: true})
        } else {
            interaction.reply({content:`You do not have the TPC Charters Role! Go to #about-and-sop to learn more!`, ephemeral: true})
        }
    }
}