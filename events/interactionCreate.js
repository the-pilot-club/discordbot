import {EmbedBuilder} from "discord.js";
import {Config} from "../config/config.js";
const config = Config

export async function ferryRequest (interaction) {
    const channel = interaction.guild.client.channels.cache.find(channel => channel.name === 'charters-requests')
    const tail = interaction.fields.getTextInputValue('aircraft-registration')
    const start = interaction.fields.getTextInputValue('starting-icao')
    const end = interaction.fields.getTextInputValue('ending-icao')
    const embed = new EmbedBuilder()
        .setAuthor({
            name: `${interaction.member.displayName}`,
            iconURL: `${interaction.user.displayAvatarURL()}`
        })
        .setTitle('New Ferry Request')
        .setColor('#37B6FF')
        .addFields({
            name: '\u200b',
            value: `**TPC Charters User:** ${interaction.user} \n**Registration Number:** ${tail.toUpperCase()} \n**Starting Location:** ${start.toUpperCase()} \n**Ending Location** ${end.toUpperCase()}`
        })
        .setFooter({ text: 'Made by TPC Dev Team' })
    if (interaction.member.roles.cache.some(role => role.name === 'Charters Pilots')) {
        channel.send({ content: `<@&${config.chartersManagersRole()}>`, embeds: [embed] })
        return await interaction.reply({
            content: `You have requested for tail number ${tail.toUpperCase()} to be ferried from ${start.toUpperCase()} to ${end.toUpperCase()}. A Charters Manager will ferry the aircraft as soon as they can. If you do not have the aircraft moved within 12 hours, please try this command again.`,
            ephemeral: true
        })
    }
}

export async function joinCharters(interaction) {
    const channel = interaction.guild.client.channels.cache.find(channel => channel.name === 'charters-requests')
    const airline = interaction.fields.getTextInputValue('airlinecode')
    const type = interaction.fields.getTextInputValue('aircraft')
    const seating = interaction.fields.getTextInputValue('seating')
    const home = interaction.fields.getTextInputValue('homebase')
    const embed = new EmbedBuilder()
        .setAuthor({ name: `${interaction.member.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` })
        .setTitle('New Join Request')
        .setDescription('A member of TPC has requested to join TPC Charters.')
        .setColor('#37B6FF')
        .addFields({
            name: 'Member Details',
            value: `**TPC Charters User:** ${interaction.user} \n**Airline Code:** ${airline.toUpperCase()} \n**Home Base:** ${home.toUpperCase()} \n**Initial Aircraft Type Request:** ${type.toUpperCase()} \n**Seating Configuration:** ${seating}`
        })
        .setFooter({ text: 'Made by TPC Dev Team' })
    channel.send({ content: `<@&${config.chartersManagersRole()}>`, embeds: [embed] })
    return await interaction.reply({
        content: `Thank you for joining TPC Charters! We will try to assign you ${type.toUpperCase()} as soon as we can. If you have not heard anything within 12 hours, please try this command again! Welcome to TPC Charters.`,
        ephemeral: true
    })
}

export async function trainingRequest(interaction) {
    const channel = interaction.guild.client.channels.cache.find(channel => channel.name === 'training-request')
    const name = interaction.fields.getTextInputValue('name')
    const cid = interaction.fields.getTextInputValue('cid')
    const course = interaction.fields.getTextInputValue('course')
    const time = interaction.fields.getTextInputValue('time')
    const trainEmbed = new EmbedBuilder()
        .setAuthor({ name: `${interaction.member.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` })
        .setTitle('New Ad Hoc Training Request')
        .setColor('#37B6FF')
        .addFields({
            name: 'Details:',
            value: `> **Full Name:** ${name} \n> **VATSIM CID:** ${cid} \n> **Course In Progress:** ${course} \n> **Availability Today:** ${time}`
        })
        .setFooter({ text: 'Made by TPC Dev Team' })
        .setTimestamp()
    channel.send({ embeds: [trainEmbed] })
    return await interaction.reply({
        content: `Thank you for submitting an Ad Hoc training request for ${time}. Please note, requests may or may not be honored, and are deleted every 24h.`,
        ephemeral: true
    })
}