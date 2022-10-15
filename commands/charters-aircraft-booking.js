const {SlashCommandBuilder} = require('discord.js');
const {EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('charters-booking')
        .setDescription('Use this command to book an aircraft in OnAir.'
        ).addStringOption(option =>
                option.setName('airline-code').setDescription('What is your airline code?').setRequired(true)
            ).addStringOption(option =>
                option.setName('tail-number').setDescription('What is the Tail Number of the aircraft you used').setRequired(true)
                    .addChoices(
                        {name: 'N1890C', value:'N1890C'},
                        {name: 'N2070R', value: 'N2070R'},
                        {name:'N9549H', value:'N9549H'})
            ).addStringOption(option =>
                option.setName('starting-icao').setDescription('Where will you start this flight?').setRequired(true)
            ).addStringOption(option =>
                option.setName('ending-icao').setDescription('Where will you end this flight?').setRequired(true)
            ).addIntegerOption(option =>
                option.setName('booking-begins').setDescription('When would you like to start? Aircraft can be reserved up to 3 hours before ETD. All times in Zulu.').setRequired(true)
            ).addIntegerOption(option =>
                option.setName('booking-ends').setDescription('When will you be finished?').setRequired(true)
            ).addStringOption(option =>
                option.setName('comments').setDescription('Any comments you would like to add about this booking?').setRequired(false).setMaxLength(250)
                ),
    async execute(interaction) {
        const airline = interaction.options.getString('airline-code')
        const tail = interaction.options.getString('tail-number')
        const start = interaction.options.getString('starting-icao')
        const end = interaction.options.getString('ending-icao')
        const etdstart = interaction.options.getInteger('booking-begins')
        const etdends = interaction.options.getInteger('booking-ends')
        const comments = interaction.options.getString('comments')
        const aircraft = []
        const channel = []
        if (interaction.member.roles.cache.some(role => role.name === 'TPC Charters')) {
            if (comments !== null) {
                switch(tail) {
                    case "N1890C":
                        aircraft.push('B737')
                        channel.push(process.env.N1890C_CHANNEL)
                        break
                    case "N9549H":
                        aircraft.push('A320')
                        channel.push(process.env.N9545H_CHANNEL)
                        break
                    case "N2070R":
                        aircraft.push('A320Neo')
                        channel.push(process.env.N2070R_CHANNEL)
                        break
                }
                const commentemebed = new EmbedBuilder()
                    .setAuthor({name: `${interaction.member.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                    .setTitle(`Aircraft Booking for ${airline.toUpperCase()}`)
                    .setColor('#37B6FF')
                    .addFields({
                        name: 'Booking Details', value: `**Aircraft Type:** ${aircraft} \n**Aircraft Tail Number:** ${tail} \n**Starting Airport:** ${start.toUpperCase()}\n**Ending Airport:**   ${end.toUpperCase()} \n**Booking Begins:** ${etdstart}z\n**Booking Ends:** ${etdends}z \n**Any comments the member had:**    ${comments}`
                    })
                    .setTimestamp()
                    .setFooter({text: 'Made by The Pilot Club For TPC Charters'})

                interaction.guild.client.channels.cache.get(`${channel}`).send({embeds: [commentemebed]}).catch(error =>
                    console.log(error))
            } else {
                switch(tail) {
                    case "N1890C":
                        aircraft.push('B737')
                        channel.push(process.env.N1890C_CHANNEL)
                        break
                    case "N9549H":
                        aircraft.push('A320')
                        channel.push(process.env.N9545H_CHANNEL)
                        break
                    case "N2070R":
                        aircraft.push('A320Neo')
                        channel.push(process.env.N2070R_CHANNEL)
                        break
                }
                const nocommentemebed = new EmbedBuilder()
                    .setAuthor({name: `${interaction.member.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                    .setTitle(`Aircraft Booking for ${airline.toUpperCase()}`)
                    .setColor('#37B6FF')
                    .addFields({
                        name: 'Booking Details', value: `**Aircraft Type:** ${aircraft} \n**Aircraft Tail Number:** ${tail} \n**Starting Airport:** ${start.toUpperCase()}\n**Ending Airport:**   ${end.toUpperCase()} \n**Booking Begins:** ${etdstart}z\n**Booking Ends:** ${etdends}z`
                    })
                    .setTimestamp()
                    .setFooter({text: 'Made by The Pilot Club For TPC Charters'})

                interaction.guild.client.channels.cache.get(`${channel}`).send({embeds: [nocommentemebed]}).catch(error =>
                    console.log(error))
            }
            await interaction.reply({content: `Your Booking has been submitted! Thank you!`, ephemeral: true})
        } else {
            interaction.reply({
                content: `You do not have the TPC Charters Role! Go to #about-and-sop to learn more!`,
                ephemeral: true
            })
        }
    }
}