const {SlashCommandBuilder} = require('discord.js');
const {EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('charters-pirep')
        .setDescription('Use this command to submit a Charters PIREP.'
        ).addStringOption(option =>
            option.setName('airline-code').setDescription('What is your airline code?').setRequired(true)
        ).addStringOption(option =>
            option.setName('aircraft-type').setDescription('What is the aircraft type of the aircraft you used?').setRequired(true)
        ).addStringOption(option =>
            option.setName('tail-number').setDescription('What is the tail number of the aircraft you used?').setRequired(true)
        ).addStringOption(option =>
            option.setName('starting-icao').setDescription('Where did you start this flight?').setRequired(true)
        ).addStringOption(option =>
            option.setName('ending-icao').setDescription('Where did you end this flight?').setRequired(true)
        ).addStringOption(option =>
            option.setName('airtime').setDescription('How long were the engines running in hours (eg 1.5h)?').setRequired(true)
        ).addIntegerOption(option =>
            option.setName('payout').setDescription('how much money did you make on this flight?').setRequired(true)
        ).addStringOption(option =>
            option.setName('landing-rate').setDescription('What was the landing rate that OnAir Gave to you?').setRequired(true)
                .addChoices(
                    {name: 'Very Smooth Landing', value: 'Very Smooth Landing'},
                    {name: 'Smooth Landing', value: 'Smooth Landing'},
                    {name: 'Regular Landing', value: 'Regular Landing'},
                    {name: 'Hard Landing', value: 'Hard Landing'},
                    {name: 'Very Hard Landing', value:'Very Hard Landing'})
        ).addStringOption(option =>
            option.setName('crew-state').setDescription('State whether on duty or resting. Give state end-time in  Zulu/UTC.').setRequired(true)
                .addChoices(
                    {name: 'On Duty', value: 'On Duty'},
                    {name: 'Resting', value: 'Resting'}
                )
        ).addStringOption(option =>
            option.setName('until-what-time').setDescription('Put what time the crew are on duty/resting to').setRequired(true)
        ).addStringOption(option =>
            option.setName('comments').setDescription('Any comments you would like to add about the flight?').setRequired(false).setMaxLength(250)
        ),
    async execute(interaction) {
        const airchannel = interaction.guild.client.channels.cache.get(process.env.AIRLINER_PIREPS_CHANNEL)
        const gachannel = interaction.guild.client.channels.cache.get(process.env.GA_PIREPS_CHANNEL)
        const airline = interaction.options.getString('airline-code')
        const type = interaction.options.getString('aircraft-type')
        const tail = interaction.options.getString('tail-number')
        const start = interaction.options.getString('starting-icao')
        const end = interaction.options.getString('ending-icao')
        const airtime = interaction.options.getString('airtime')
        const payout = interaction.options.getInteger('payout')
        const landingrate = interaction.options.getString('landing-rate')
        const crewstate = interaction.options.getString('crew-state')
        const until = interaction.options.getString('until-what-time')
        const comments = interaction.options.getString('comments')
        const commentembed = new EmbedBuilder()
            .setAuthor({name: `${interaction.member.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}`})
            .setTitle(`PIREP Details for ${airline.toUpperCase()}`)
            .setColor('#37B6FF')
            .addFields({
                name: '\u200b',
                value: `**Aircraft Type:** ${type.toUpperCase()}\n**Aircraft Tail Number:** ${tail.toUpperCase()} \n**Starting Airport:**   ${start.toUpperCase()}\n**Ending Airport:**   ${end.toUpperCase()} \n**Airtime:**  ${airtime}\n**Payout:**   ${payout} \n**Landing Rate:**   ${landingrate}\n**Crew State:**   ${crewstate} until: ${until}\n**Any comments the member had:**    ${comments}`
            })
            .setTimestamp()
            .setFooter({text: 'Made by The Pilot Club For TPC Charters'});
        const nocommentembed = new EmbedBuilder()
            .setAuthor({name: `${interaction.member.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}`})
            .setTitle(`PIREP Details for ${airline.toUpperCase()}`)
            .setColor('#37B6FF')
            .addFields({
                name: '\u200b',
                value: `**Aircraft Type:** ${type.toUpperCase()} \n**Aircraft Tail Number:** ${tail.toUpperCase()}\n **Starting Airport:**   ${start.toUpperCase()}\n**Ending Airport:**   ${end.toUpperCase()} \n**Airtime:**  ${airtime} \n**Payout:**   ${payout} \n**Landing Rate:**   ${landingrate} \n**Crew State:**   ${crewstate} until: ${until}`
            })
            .setTimestamp()
            .setFooter({text: 'Made by The Pilot Club For TPC Charters'});
        if (interaction.member.roles.cache.some(role => role.name === 'TPC Charters')) {
            if (comments !== null) {
                switch (tail) {
                    case "N1890C":
                        airchannel.send({embeds: [commentembed]})
                            break
                    case "n1890c":
                        airchannel.send({embeds: [commentembed]})
                        break
                    case "N9549H":
                        airchannel.send({embeds: [commentembed]})
                        break
                    case "n9549h":
                        airchannel.send({embeds: [commentembed]})
                        break
                    case "N2070R":
                        airchannel.send({embeds: [commentembed]})
                        break
                    case "n2070r":
                        airchannel.send({embeds: [commentembed]})
                        break
                    default:
                        gachannel.send({embeds: [commentembed]})
                        break
                    }
            } else {
                switch (tail) {
                    case "N1890C":
                        airchannel.send({embeds: [nocommentembed]})
                        break
                    case "n1890c":
                        airchannel.send({embeds: [nocommentembed]})
                        break
                    case "N9549H":
                        airchannel.send({embeds: [nocommentembed]})
                        break
                    case "n9549h":
                        airchannel.send({embeds: [nocommentembed]})
                        break
                    case "N2070R":
                        airchannel.send({embeds: [nocommentembed]})
                        break
                    case "n2070r":
                        airchannel.send({embeds: [nocommentembed]})
                        break
                    default:
                        gachannel.send({embeds: [nocommentembed]})
                        break
                }
            }
            await interaction.reply({content: `Your PIREP has been submitted! Thank you!`, ephemeral: true})
        } else {
            interaction.reply({
                content: `You do not have the TPC Charters Role! Go to #about-and-sop to learn more!`,
                ephemeral: true
            })
        }
    }
}    