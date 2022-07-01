const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Collection, Intents, Interaction } = require('discord.js');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('charters-aircraft-booking')
        .setDescription('Use this commnad to book an aircraft in OnAir.'
        ).addStringOption(option=>
            option.setName('airline-code').setDescription('What is your airline code?').setRequired(true)
        ).addStringOption(option=>
            option.setName('aircraft-type').setDescription('What is the aircraft type of the aircraft you will use?').setRequired(true)
        ).addStringOption(option=>
            option.setName('tail-number').setDescription('What is the tail number of the aircraft you will use?').setRequired(true)
        ).addStringOption(option=>
            option.setName('starting-icao').setDescription('Where will you start this flight?').setRequired(true)
        ).addStringOption(option=>
            option.setName('ending-icao').setDescription('Where will you end this flight?').setRequired(true)
        ).addStringOption(option=>
            option.setName('etd').setDescription('What time do you plan on departing?').setRequired(true)
        ).addStringOption(option=>
        option.setName('comments').setDescription('Any comments you would like to add about this booking?').setRequired(false)
),
	async execute(interaction,client) {
        const channel = interaction.guild.client.channels.cache.get(process.env.TEST_CHANNEL)  //CORRECT CHANNEL: CHARTERS_AIRLINEROPS_CHANNEL
        const airline = interaction.options.getString('airline-code')
        const type = interaction.options.getString('aircraft-type')
        const tail = interaction.options.getString('tail-number')
        const start = interaction.options.getString('starting-icao')
        const end = interaction.options.getString('ending-icao')
        const etd = interaction.options.getString('etd')
        const comments = interaction.options.getString('comments')
        const commentembed = new MessageEmbed()
        .setAuthor({name:`${interaction.user.tag}`, iconURL:`${interaction.user.displayAvatarURL()}`})
        .setTitle(`Aircraft Booking for ${airline.toUpperCase()}`)            
        .setColor('0X37B6FF')
        .addFields({name:'Booking Details', value: `**Aircraft Type:** ${type.toUpperCase()}\n**Aircraft Tail Number:** ${tail.toUpperCase()} \n**Starting Airport:**   ${start.toUpperCase()}\n**Ending Airport:**   ${end.toUpperCase()} \n**Estimated Time of Departure:**  ${etd}\n**Any comments the member had:**    ${comments}` })
             .setTimestamp()
             .setFooter({text: 'Made by The Pilot Club For TPC Charters'});
        const nocommentembed = new MessageEmbed()
        .setAuthor({name:`${interaction.user.tag}`, iconURL:`${interaction.user.displayAvatarURL()}`})
        .setTitle(`PIREP for ${airline.toUpperCase()}`)
        .setColor('0X37B6FF')
         .addFields({name:'PIREP Details', value: `**Aircraft Type:** ${type.toUpperCase()} \n**Aircraft Tail Nuber:** ${tail.toUpperCase()}\n **Starting Airport:**   ${start.toUpperCase()} \n**Ending Airport:**   ${end.toUpperCase()} \n**Estimated Time of Departure:**  ${etd}` })
              .setTimestamp()
              .setFooter({text: 'Made by The Pilot Club For TPC Charters'});
        if (interaction.member.roles.cache.some(role => role.name === 'TPC Charters')){  
            if (comments !== null){     
                channel.send({content: `<@&910012872246046730>` , embeds: [commentembed]})
            } else {
                channel.send({content: `<@&910012872246046730>` , embeds: [nocommentembed]})
            }
            await interaction.reply({content:`Your Booking has been submitted! Thank you!`, ephemeral: true})
            } else {
            interaction.reply({content:`You do not have the TPC Charters Role! Go to #about-and-sop to learn more!`, ephemeral: true})
        }
    }
}    