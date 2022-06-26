const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Collection, Intents, Interaction } = require('discord.js');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('charters-pirep')
        .setDescription('Use this commnad to submit a Charters PIREP.'
        ).addStringOption(option=>
            option.setName('airline-code').setDescription('What is your airline code?').setRequired(true)
        ).addStringOption(option=>
            option.setName('aircraft-type').setDescription('What is the aircraft type of the aircraft you used?').setRequired(true)
        ).addStringOption(option=>
            option.setName('starting-location').setDescription('Where did you start this flight?').setRequired(true)
        ).addStringOption(option=>
            option.setName('ending-location').setDescription('Where did you end this flight?').setRequired(true)
        ).addIntegerOption(option=>
            option.setName('payout').setDescription('how much money did you make on this flight?').setRequired(true)
        ).addStringOption(option=>
            option.setName('landing-rate').setDescription('What was the landing rate that OnAir Gave to you?').setRequired(true)
            .addChoices(
                {name: 'Soft Landing', value: 'Soft Landing'},
                {name: 'Normal Landing', value: 'Normal Landing'},
                {name: 'Hard Landing', value: 'Hard Landing'},)
        ).addStringOption(option=>
            option.setName('crew-state').setDescription('What is your crew currently doing?').setRequired(true)
        ).addStringOption(option=>
            option.setName('comments').setDescription('Any comments you would like to add about the flight?').setRequired(false)
),
	async execute(interaction,client) {
        const channel = interaction.guild.client.channels.cache.get(process.env.TEST_CHANNEL)
        const airline = interaction.options.getString('airline-code')
        const type = interaction.options.getString('aircraft-type')
        const start = interaction.options.getString('starting-location')
        const end = interaction.options.getString('ending-location')
        const payout = interaction.options.getInteger('payout')
        const landingrate = interaction.options.getString('landing-rate')
        const crewstate = interaction.options.getString('crew-state')
        const comments = interaction.options.getString('comments')
        const commentembed = new MessageEmbed()
        .setAuthor({name:`${interaction.user.tag}`, iconURL:`${interaction.user.displayAvatarURL()}`})
        .setTitle(`PIREP for ${airline.toUpperCase()}`)            
        .setColor('0X37B6FF')
        .addFields({name:'PIREP Details', value: `**Aircraft Type:** ${type.toUpperCase()} 
             **Starting Airport:**   ${start.toUpperCase()}     **Ending Airport:**   ${end.toUpperCase()} 
             **Payout:**   ${payout} 
             **Landing Rate:**   ${landingrate}
             **Crew State:**   ${crewstate}
             **Any comments the member had:**    ${comments}` })
             .setTimestamp()
             .setFooter({text: 'Made by The Pilot Club For TPC Charters'});
        const nocommentembed = new MessageEmbed()
        .setAuthor({name:`${interaction.user.tag}`, iconURL:`${interaction.user.displayAvatarURL()}`})
        .setTitle(`PIREP for ${airline.toUpperCase()}`)
        .setColor('0X37B6FF')
         .addFields({name:'PIREP Details', value: `**Aircraft Type:** ${type.toUpperCase()} 
              **Starting Airport:**   ${start.toUpperCase()}     **Ending Airport:**   ${end.toUpperCase()} 
              **Payout:**   ${payout} 
              **Landing Rate:**   ${landingrate}
              **Crew State:**   ${crewstate}` })
              .setTimestamp()
              .setFooter({text: 'Made by The Pilot Club For TPC Charters'});
        if (interaction.member.roles.cache.some(role => role.name === 'TPC Charters')){  
            if (comments !== null){     
                channel.send({content: `<@&910012872246046730>` , embeds: [commentembed]})
            } else {
                channel.send({content: `<@&910012872246046730>` , embeds: [nocommentembed]})
            }
            await interaction.reply({content:`Your PIREP has been submitted! Thank you!`, ephemeral: true})
            } else {
            interaction.reply({content:`You do not have the TPC Charters Role! Go to #about-and-sop to learn more!`, ephemeral: true})
        }
    }
}    