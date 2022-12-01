const {EmbedBuilder} = require("discord.js");
module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction) {
        if (interaction.customId === 'training-request') {
            const channel = interaction.guild.client.channels.cache.find(channel => channel.name === "training-request")
            const name = interaction.fields.getTextInputValue('name')
            const cid = interaction.fields.getTextInputValue('cid')
            const course = interaction.fields.getTextInputValue('course')
            const time = interaction.fields.getTextInputValue('time')
            const trainEmbed = new EmbedBuilder()
                .setAuthor({name: `${interaction.member.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                .setTitle('New Ad Hoc Training Request')
                .setColor('#37B6FF')
                .addFields({
                    name: 'Details:',
                    value: `> **Full Name:** ${name} \n> **VATSIM CID:** ${cid} \n> **Course In Progress:** ${course} \n> **Availability Today:** ${time}`
                })
                .setFooter({text: 'Made by The Pilot Club For TPC Flight School'})
                .setTimestamp();
            await interaction.reply({
                content: `Thank you for submitting an Ad Hoc training request for ${time}. Please note, requests may or may not be honored, and are deleted every 24h.`,
                ephemeral: true
            })
            channel.send({embeds: [trainEmbed]})
        }
    }
}