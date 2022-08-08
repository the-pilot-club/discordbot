const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('aircraft-booking')
        .setDescription('Use this command to book an aircraft in OnAir.'
        )
        .addSubcommand(subcommand =>
                subcommand.setName('n2052d')
                    .setDescription('A320 Aircraft with tail number N2052D')
            .addStringOption(option =>
                option.setName('airline-code').setDescription('What is your airline code?').setRequired(true)
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
                ))
        .addSubcommand(subcommand =>
            subcommand.setName('n1551j')
                .setDescription('A320 Aircraft with tail number N1551J')
                .addStringOption(option =>
                    option.setName('airline-code').setDescription('What is your airline code?').setRequired(true)
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
            ))
        .addSubcommand(subcommand =>
            subcommand.setName('n9155k')
                .setDescription('A320 Aircraft with tail number N9115K')
                .addStringOption(option =>
                    option.setName('airline-code').setDescription('What is your airline code?').setRequired(true)
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
            ))
        .addSubcommand(subcommand =>
            subcommand.setName('n2467g')
                .setDescription('B737 Aircraft with tail number N2467G')
                .addStringOption(option =>
                    option.setName('airline-code').setDescription('What is your airline code?').setRequired(true)
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
            ))
        .addSubcommand(subcommand =>
            subcommand.setName('n1890c')
                .setDescription('B737 Aircraft with tail number N1890C')
                .addStringOption(option =>
                    option.setName('airline-code').setDescription('What is your airline code?').setRequired(true)
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
            ))
        .addSubcommand(subcommand =>
            subcommand.setName('n3123f')
                .setDescription('CRJ-1000 Aircraft with tail number N3123F')
                .addStringOption(option =>
                    option.setName('airline-code').setDescription('What is your airline code?').setRequired(true)
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
            ))
        .addSubcommand(subcommand =>
            subcommand.setName('n7780t')
                .setDescription('CRJ-1000 Aircraft with tail number N7780T')
                .addStringOption(option =>
                    option.setName('airline-code').setDescription('What is your airline code?').setRequired(true)
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
            ))
        .addSubcommand(subcommand =>
            subcommand.setName('n4741n')
                .setDescription('A320 Aircraft with tail number N4741N')
                .addStringOption(option =>
                    option.setName('airline-code').setDescription('What is your airline code?').setRequired(true)
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
            ))
        .addSubcommand(subcommand =>
            subcommand.setName('n7999f')
                .setDescription('B736 Aircraft with tail number N7999F')
                .addStringOption(option =>
                    option.setName('airline-code').setDescription('What is your airline code?').setRequired(true)
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
            )),
    async execute(interaction) {
        const airline = interaction.options.getString('airline-code')
        const start = interaction.options.getString('starting-icao')
        const end = interaction.options.getString('ending-icao')
        const etdstart = interaction.options.getInteger('booking-begins')
        const etdends = interaction.options.getInteger('booking-ends')
        const comments = interaction.options.getString('comments')
        if (interaction.member.roles.cache.some(role => role.name === 'TPC Charters')) {
            if (comments !== null) {
                switch(interaction.options.getSubcommand()) {
                    case "n2052d":
                        const n2052de1 = new MessageEmbed()
                            .setAuthor({name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                            .setTitle(`Aircraft Booking for ${airline.toUpperCase()}`)
                            .setColor('#37B6FF')
                            .addFields({
                                name: 'Booking Details', value: `**Aircraft Type:** A320 \n**Aircraft Tail Number:** N2052D \n**Starting Airport:** ${start.toUpperCase()}\n**Ending Airport:**   ${end.toUpperCase()} \n**Booking Begins:** ${etdstart}z\n**Booking Ends:** ${etdends}z \n**Any comments the member had:**    ${comments}`
                            })
                            .setTimestamp()
                            .setFooter({text: 'Made by The Pilot Club For TPC Charters'});

                        interaction.guild.client.channels.cache.get(process.env.A320_AIRCRAFT_1CHANNEL).send({content: `<@&910012872246046730>`, embeds: [n2052de1]})
                        break
                    case "n1551j":
                        const n1151je1 = new MessageEmbed()
                            .setAuthor({name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                            .setTitle(`Aircraft Booking for ${airline.toUpperCase()}`)
                            .setColor('#37B6FF')
                            .addFields({
                                name: 'Booking Details',
                                value: `**Aircraft Type:** A320Neo\n**Aircraft Tail Number:** N1551J \n**Starting Airport:** ${start.toUpperCase()}\n**Ending Airport:**   ${end.toUpperCase()} \n**Booking Begins:** ${etdstart}z\n**Booking Ends:** ${etdends}z \n**Any comments the member had:**    ${comments}`
                            })
                            .setTimestamp()
                            .setFooter({text: 'Made by The Pilot Club For TPC Charters'});
                        interaction.guild.client.channels.cache.get(process.env.A320_AIRCRAFT_2CHANNEL).send({content: `<@&910012872246046730>`, embeds: [n1151je1]})
                        break
                    case "n9155k" :
                        const n9155ke1 = new MessageEmbed()
                            .setAuthor({name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                            .setTitle(`Aircraft Booking for ${airline.toUpperCase()}`)
                            .setColor('#37B6FF')
                            .addFields({
                                name: 'Booking Details',
                                value: `**Aircraft Type:** A320\n**Aircraft Tail Number:** N9155K \n**Starting Airport:** ${start.toUpperCase()}\n**Ending Airport:**   ${end.toUpperCase()} \n**Booking Begins:** ${etdstart}z\n**Booking Ends:** ${etdends}z \n**Any comments the member had:**    ${comments}`
                            })
                            .setTimestamp()
                            .setFooter({text: 'Made by The Pilot Club For TPC Charters'});
                        interaction.guild.client.channels.cache.get(process.env.A320_AIRCRAFT_3CHANNEL).send({content: `<@&910012872246046730>`, embeds: [n9155ke1]})
                        break
                    case "n2467g":
                        const n2467ge1 = new MessageEmbed()
                            .setAuthor({name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                            .setTitle(`Aircraft Booking for ${airline.toUpperCase()}`)
                            .setColor('#37B6FF')
                            .addFields({
                                name: 'Booking Details',
                                value: `**Aircraft Type:** B737\n**Aircraft Tail Number:** N2467G \n**Starting Airport:** ${start.toUpperCase()}\n**Ending Airport:**   ${end.toUpperCase()} \n**Booking Begins:** ${etdstart}z\n**Booking Ends:** ${etdends}z \n**Any comments the member had:**    ${comments}`
                            })
                            .setTimestamp()
                            .setFooter({text: 'Made by The Pilot Club For TPC Charters'});
                        interaction.guild.client.channels.cache.get(process.env.B737_AIRCRAFT_1CHANNEL).send({content: `<@&910012872246046730>`, embeds: [n2467ge1]})
                        break
                    case "n1890c":
                        const n1890ce1 = new MessageEmbed()
                            .setAuthor({name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                            .setTitle(`Aircraft Booking for ${airline.toUpperCase()}`)
                            .setColor('#37B6FF')
                            .addFields({
                                name: 'Booking Details',
                                value: `**Aircraft Type:** B737\n**Aircraft Tail Number:** N1890C \n**Starting Airport:** ${start.toUpperCase()}\n**Ending Airport:**   ${end.toUpperCase()} \n**Booking Begins:** ${etdstart}z\n**Booking Ends:** ${etdends}z \n**Any comments the member had:**    ${comments}`
                            })
                            .setTimestamp()
                            .setFooter({text: 'Made by The Pilot Club For TPC Charters'});
                        interaction.guild.client.channels.cache.get(process.env.B737_AIRCRAFT_2CHANNEL).send({content: `<@&910012872246046730>`, embeds: [n1890ce1]})
                        break
                    case "n3123f":
                        const n3123fe1 = new MessageEmbed()
                            .setAuthor({name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                            .setTitle(`Aircraft Booking for ${airline.toUpperCase()}`)
                            .setColor('#37B6FF')
                            .addFields({
                                name: 'Booking Details',
                                value: `**Aircraft Type:** CRJ1000\n**Aircraft Tail Number:** N3123F \n**Starting Airport:** ${start.toUpperCase()}\n**Ending Airport:**   ${end.toUpperCase()} \n**Booking Begins:** ${etdstart}z\n**Booking Ends:** ${etdends}z \n**Any comments the member had:**    ${comments}`
                            })
                            .setTimestamp()
                            .setFooter({text: 'Made by The Pilot Club For TPC Charters'});
                        interaction.guild.client.channels.cache.get(process.env.CRJX_AIRCRAFT1_CHANNEL).send({content: `<@&910012872246046730>`, embeds: [n3123fe1]})
                        break
                    case "n7780t":
                        const n7780te1 = new MessageEmbed()
                            .setAuthor({name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                            .setTitle(`Aircraft Booking for ${airline.toUpperCase()}`)
                            .setColor('#37B6FF')
                            .addFields({
                                name: 'Booking Details',
                                value: `**Aircraft Type:** CRJ1000\n**Aircraft Tail Number:** N7780T \n**Starting Airport:** ${start.toUpperCase()}\n**Ending Airport:**   ${end.toUpperCase()} \n**Booking Begins:** ${etdstart}z\n**Booking Ends:** ${etdends}z \n**Any comments the member had:**    ${comments}`
                            })
                            .setTimestamp()
                            .setFooter({text: 'Made by The Pilot Club For TPC Charters'});
                        interaction.guild.client.channels.cache.get(process.env.CRJX_AIRCRAFT2_CHANNEL).send({content: `<@&910012872246046730>`, embeds: [n7780te1]})
                        break
                    case "n4741n":
                        const n4741e1 = new MessageEmbed()
                            .setAuthor({name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                            .setTitle(`Aircraft Booking for ${airline.toUpperCase()}`)
                            .setColor('#37B6FF')
                            .addFields({
                                name: 'Booking Details',
                                value: `**Aircraft Type:** A320Neo\n**Aircraft Tail Number:** N4741N \n**Starting Airport:** ${start.toUpperCase()}\n**Ending Airport:**   ${end.toUpperCase()} \n**Booking Begins:** ${etdstart}z\n**Booking Ends:** ${etdends}z \n**Any comments the member had:**    ${comments}`
                            })
                            .setTimestamp()
                            .setFooter({text: 'Made by The Pilot Club For TPC Charters'});
                        interaction.guild.client.channels.cache.get(process.env.A320_AIRCRAFT_4CHANNEL).send({content: '<@&910012872246046730>', embeds:[n4741e1]})
                        break
                    case "n7999f":
                        const n7999fe1 = new MessageEmbed()
                            .setAuthor({name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                            .setTitle(`Aircraft Booking for ${airline.toUpperCase()}`)
                            .setColor('#37B6FF')
                            .addFields({
                                name: 'Booking Details',
                                value: `**Aircraft Type:** B736\n**Aircraft Tail Number:** N7999F \n**Starting Airport:** ${start.toUpperCase()}\n**Ending Airport:**   ${end.toUpperCase()} \n**Booking Begins:** ${etdstart}z\n**Booking Ends:** ${etdends}z \n**Any comments the member had:**    ${comments}`
                            })
                            .setTimestamp()
                            .setFooter({text: 'Made by The Pilot Club For TPC Charters'});
                        interaction.guild.client.channels.cache.get(process.env.B736_AIRCRAFT_1CHANNEL).send({content: '<@&910012872246046730>', embeds:[n7999fe1]})
                        break
                }
            } else {
                switch(interaction.options.getSubcommand()) {
                    case "n2052d":
                        const n2052de2 = new MessageEmbed()
                            .setAuthor({name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                            .setTitle(`Aircraft Booking for ${airline.toUpperCase()}`)
                            .setColor('#37B6FF')
                            .addFields({
                                name: 'Booking Details', value: `**Aircraft Type:** A320 \n**Aircraft Tail Number:** N2052D \n**Starting Airport:** ${start.toUpperCase()}\n**Ending Airport:**   ${end.toUpperCase()} \n**Booking Begins:** ${etdstart}z\n**Booking Ends:** ${etdends}z`
                            })
                            .setTimestamp()
                            .setFooter({text: 'Made by The Pilot Club For TPC Charters'});

                        interaction.guild.client.channels.cache.get(process.env.A320_AIRCRAFT_1CHANNEL).send({content: `<@&910012872246046730>`, embeds: [n2052de2]})
                        break
                    case "n1551j":
                        const n1151je2 = new MessageEmbed()
                            .setAuthor({name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                            .setTitle(`Aircraft Booking for ${airline.toUpperCase()}`)
                            .setColor('#37B6FF')
                            .addFields({
                                name: 'Booking Details',
                                value: `**Aircraft Type:** A320Neo\n**Aircraft Tail Number:** N1551J \n**Starting Airport:** ${start.toUpperCase()}\n**Ending Airport:**   ${end.toUpperCase()} \n**Booking Begins:** ${etdstart}z\n**Booking Ends:** ${etdends}z`
                            })
                            .setTimestamp()
                            .setFooter({text: 'Made by The Pilot Club For TPC Charters'});
                        interaction.guild.client.channels.cache.get(process.env.A320_AIRCRAFT_2CHANNEL).send({content: `<@&910012872246046730>`, embeds: [n1151je2]})
                        break
                    case "n9155k" :
                        const n9155ke2 = new MessageEmbed()
                            .setAuthor({name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                            .setTitle(`Aircraft Booking for ${airline.toUpperCase()}`)
                            .setColor('#37B6FF')
                            .addFields({
                                name: 'Booking Details',
                                value: `**Aircraft Type:** A320\n**Aircraft Tail Number:** N9155K \n**Starting Airport:** ${start.toUpperCase()}\n**Ending Airport:**   ${end.toUpperCase()} \n**Booking Begins:** ${etdstart}z\n**Booking Ends:** ${etdends}z`
                            })
                            .setTimestamp()
                            .setFooter({text: 'Made by The Pilot Club For TPC Charters'});
                        interaction.guild.client.channels.cache.get(process.env.A320_AIRCRAFT_3CHANNEL).send({content: `<@&910012872246046730>`, embeds: [n9155ke2]})
                        break
                    case "n2467g":
                        const n2467ge2 = new MessageEmbed()
                            .setAuthor({name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                            .setTitle(`Aircraft Booking for ${airline.toUpperCase()}`)
                            .setColor('#37B6FF')
                            .addFields({
                                name: 'Booking Details',
                                value: `**Aircraft Type:** B737\n**Aircraft Tail Number:** N2467G \n**Starting Airport:** ${start.toUpperCase()}\n**Ending Airport:**   ${end.toUpperCase()} \n**Booking Begins:** ${etdstart}z\n**Booking Ends:** ${etdends}z`
                            })
                            .setTimestamp()
                            .setFooter({text: 'Made by The Pilot Club For TPC Charters'});
                        interaction.guild.client.channels.cache.get(process.env.B737_AIRCRAFT_1CHANNEL).send({content: `<@&910012872246046730>`, embeds: [n2467ge2]})
                        break
                    case "n1890c":
                        const n1890ce2 = new MessageEmbed()
                            .setAuthor({name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                            .setTitle(`Aircraft Booking for ${airline.toUpperCase()}`)
                            .setColor('#37B6FF')
                            .addFields({
                                name: 'Booking Details',
                                value: `**Aircraft Type:** B737\n**Aircraft Tail Number:** N1890C \n**Starting Airport:** ${start.toUpperCase()}\n**Ending Airport:**   ${end.toUpperCase()} \n**Booking Begins:** ${etdstart}z\n**Booking Ends:** ${etdends}z`
                            })
                            .setTimestamp()
                            .setFooter({text: 'Made by The Pilot Club For TPC Charters'});
                        interaction.guild.client.channels.cache.get(process.env.B737_AIRCRAFT_2CHANNEL).send({content: `<@&910012872246046730>`, embeds: [n1890ce2]})
                        break
                    case "n3123f":
                        const n3123fe2 = new MessageEmbed()
                            .setAuthor({name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                            .setTitle(`Aircraft Booking for ${airline.toUpperCase()}`)
                            .setColor('#37B6FF')
                            .addFields({
                                name: 'Booking Details',
                                value: `**Aircraft Type:** CRJ1000\n**Aircraft Tail Number:** N3123F \n**Starting Airport:** ${start.toUpperCase()}\n**Ending Airport:**   ${end.toUpperCase()} \n**Booking Begins:** ${etdstart}z\n**Booking Ends:** ${etdends}z`
                            })
                            .setTimestamp()
                            .setFooter({text: 'Made by The Pilot Club For TPC Charters'});
                        interaction.guild.client.channels.cache.get(process.env.CRJX_AIRCRAFT1_CHANNEL).send({content: `<@&910012872246046730>`, embeds: [n3123fe2]})
                        break
                    case "n7780t":
                        const n7780te2 = new MessageEmbed()
                            .setAuthor({name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                            .setTitle(`Aircraft Booking for ${airline.toUpperCase()}`)
                            .setColor('#37B6FF')
                            .addFields({
                                name: 'Booking Details',
                                value: `**Aircraft Type:** CRJ1000\n**Aircraft Tail Number:** N7780T \n**Starting Airport:** ${start.toUpperCase()}\n**Ending Airport:**   ${end.toUpperCase()} \n**Booking Begins:** ${etdstart}z\n**Booking Ends:** ${etdends}z`
                            })
                            .setTimestamp()
                            .setFooter({text: 'Made by The Pilot Club For TPC Charters'});
                        interaction.guild.client.channels.cache.get(process.env.CRJX_AIRCRAFT2_CHANNEL).send({content: `<@&910012872246046730>`, embeds: [n7780te2]})
                        break
                    case "n4741n":
                        const n4741e2 = new MessageEmbed()
                            .setAuthor({name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                            .setTitle(`Aircraft Booking for ${airline.toUpperCase()}`)
                            .setColor('#37B6FF')
                            .addFields({
                                name: 'Booking Details',
                                value: `**Aircraft Type:** A320Neo\n**Aircraft Tail Number:** N4741N \n**Starting Airport:** ${start.toUpperCase()}\n**Ending Airport:**   ${end.toUpperCase()} \n**Booking Begins:** ${etdstart}z\n**Booking Ends:** ${etdends}z`
                            })
                            .setTimestamp()
                            .setFooter({text: 'Made by The Pilot Club For TPC Charters'});
                        interaction.guild.client.channels.cache.get(process.env.A320_AIRCRAFT_4CHANNEL).send({content: '<@&910012872246046730>', embeds:[n4741e2]})
                        break
                    case "n7999f":
                        const n7999fe2 = new MessageEmbed()
                            .setAuthor({name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                            .setTitle(`Aircraft Booking for ${airline.toUpperCase()}`)
                            .setColor('#37B6FF')
                            .addFields({
                                name: 'Booking Details',
                                value: `**Aircraft Type:** B736\n**Aircraft Tail Number:** N7999F \n**Starting Airport:** ${start.toUpperCase()}\n**Ending Airport:**   ${end.toUpperCase()} \n**Booking Begins:** ${etdstart}z\n**Booking Ends:** ${etdends}z`
                            })
                            .setTimestamp()
                            .setFooter({text: 'Made by The Pilot Club For TPC Charters'});
                        interaction.guild.client.channels.cache.get(process.env.B736_AIRCRAFT_1CHANNEL).send({content: '<@&910012872246046730>', embeds:[n7999fe2]})
                        break

                }
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