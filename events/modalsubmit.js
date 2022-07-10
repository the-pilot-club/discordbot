const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction) {
        if (interaction.customId === 'join-charters') {
            const channel = interaction.guild.client.channels.cache.get(process.env.CHARTERS_REQUEST_CHANNEL)
            const airline = interaction.fields.getTextInputValue('airlinecode')
            const type = interaction.fields.getTextInputValue('aircraft')
            const seating = interaction.fields.getTextInputValue('seating')
            const home = interaction.fields.getTextInputValue('homebase')
            const embed = new MessageEmbed()
                .setAuthor({name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                .setTitle('New Join Request')
                .setDescription('A member of TPC has requested to join TPC Charters.')
                .setColor('0X37B6FF')
                .addFields({
                    name: 'Member Details',
                    value: `**TPC Charters User:** ${interaction.user} \n**Airline Code:** ${airline.toUpperCase()} \n**Home Base:** ${home.toUpperCase()} \n**Initial Aircraft Type Request:** ${type.toUpperCase()} \n**Seating Configuration:** ${seating}`
                })
                .setFooter({text: 'Made by The Pilot Club For TPC Charters'});
            await interaction.reply({content: 'Your request to join charters has been submitted', ephemeral: true})
            channel.send({content: `<@&910012872246046730>`, embeds: [embed]})
        }
    }
}