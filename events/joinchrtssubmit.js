const {EmbedBuilder} = require("discord.js");
module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction) {
        if (interaction.customId === 'join-charters') {
            const channel = interaction.guild.client.channels.cache.find(channel => channel.name === "charters-requests")
            const airline = interaction.fields.getTextInputValue('airlinecode')
            const type = interaction.fields.getTextInputValue('aircraft')
            const seating = interaction.fields.getTextInputValue('seating')
            const home = interaction.fields.getTextInputValue('homebase')
            const embed = new EmbedBuilder()
                .setAuthor({name: `${interaction.member.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                .setTitle('New Join Request')
                .setDescription('A member of TPC has requested to join TPC Charters.')
                .setColor('#37B6FF')
                .addFields({
                    name: 'Member Details',
                    value: `**TPC Charters User:** ${interaction.user} \n**Airline Code:** ${airline.toUpperCase()} \n**Home Base:** ${home.toUpperCase()} \n**Initial Aircraft Type Request:** ${type.toUpperCase()} \n**Seating Configuration:** ${seating}`
                })
                .setFooter({text: 'Made by TPC Dev Team'});
            await interaction.reply({
                content: `Thank you for joining TPC Charters! We will try to assign you ${type.toUpperCase()} as soon as we can. If you have not heard anything within 12 hours, please try this command again! Welcome to TPC Charters.`,
                ephemeral: true
            })
            channel.send({content: `<@&910012872246046730>`, embeds: [embed]})
        }
    }
}