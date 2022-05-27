const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Collection, Intents, Interaction } = require('discord.js');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('idea-archive')
        .setDescription('This command if for the Admin team to process archives for ideas that have been put in the idea box.'
        ).addStringOption(option =>
            option.setName('suggestion-number').setDescription('What is the Idea Number?').setRequired(true)
        ).addStringOption(option=>
            option.setName('idea-details').setDescription('Copy and paste the idea details').setRequired(true)
        ).addStringOption(option=>
            option.setName('reason-given').setDescription('Copy and paste the reason given details').setRequired(false)
        ),
	async execute(interaction,client) {
        const channel = interaction.guild.client.channels.cache.get('979566041061552217')
        const number = interaction.options.getString('suggestion-number')
        const idea = interaction.options.getString('idea-details')
        const reason = interaction.options.getString('reason-given')
        const noreasonembed = new MessageEmbed()
            .setAuthor({name:`${interaction.user.tag}`, iconURL:`${interaction.user.displayAvatarURL()}`})
            .setTitle(`Implemented Idea Archive for Suggestion #${number}`)
            .setColor('0X37B6FF')
            .addFields({name: `Suggestion Deatails:`, value:`${idea}`}) 
            .setFooter({text: 'Made by The Pilot Club For Adminisration'});

        const reasonembed = new MessageEmbed()
        .setAuthor({name:`${interaction.user.tag}`, iconURL:`${interaction.user.displayAvatarURL()}`})
        .setTitle(`Implemented Idea Archive for Suggestion #${number}`)
        .setColor('0X37B6FF')
        .addFields({name: `Suggestion Deatails:`, value:`${idea}`})
        .addFields({name: `Reason Given`, value: `${reason}`})  
        .setFooter({text: 'Made by The Pilot Club For Adminisration'});

    if (interaction.member.roles.cache.some(role => role.name === 'Air Marshals')){
        if (reason !== null){     
            channel.send({embeds: [reasonembed]})
        } else {
            channel.send({embeds: [noreasonembed]})
        }
        await interaction.reply({content:`The idea has been posted in the archive channel`, ephemeral: true})
    } else {
        interaction.reply({content:`This command is only for the Admin of The Pilot Club. Please try another command.`, ephemeral: true})
    }
}

}