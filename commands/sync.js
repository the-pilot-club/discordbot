const {SlashCommandBuilder} = require('discord.js');
const {ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
const {EmbedBuilder} = require('discord.js');
const fetch = require('node-fetch')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('sync')
        .setDescription('Sync your VATSIM Ratings for TPC!'),
    async execute(interaction) {
        const response = await fetch(`https://callsigns.thepilotclub.org/DiscordOperations/GetVatsimRatingInfo?Discordid=${interaction.user.id}`, {
            method: 'POST'
        })
        let body = await response.json()
        if (body === "{Not Found}") {
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('Connect my account!')
                        .setURL(`https://callsigns.thepilotclub.org/sendauthentication.aspx?id=${interaction.user.id}`)
                        .setStyle(ButtonStyle.Link),
                );
            interaction.reply({
                content: `Please connect your VATSIM account to the TPC Discord!`,
                components: [row],
                ephemeral: true
            })
        } else {
            let data = JSON.parse(body)
            let rating = data.rating
            let pilotrating = data.pilotrating
            let roles = []
            const MANAGED_ROLES = ["ATC", "S1", "S2", "S3", "C1", "C3", "I1", "I3", "Network Supervisor", "Network Administrator", "P0", "P1", "P2", "P3", "P4"];
            if (rating === 2) { //S1
                roles.push("ATC")
                roles.push("S1")
            } else if (rating === 3) {  //S2
                roles.push("ATC")
                roles.push("S2")
            } else if (rating === 4) {  //S3
                roles.push("ATC")
                roles.push("S3")
            } else if (rating === 5) {  //C1
                roles.push("ATC")
                roles.push("C1")
            } else if (rating === 6) {  //C2
                roles.push("ATC")
            } else if (rating === 7) {  //C3
                roles.push("ATC")
                roles.push("C3")
            } else if (rating === 8) { //I1
                roles.push("ATC")
                roles.push("I1")
            } else if (rating === 9) {  //I2
                roles.push("ATC")
            } else if (rating === 10) {  //I3
                roles.push("ATC")
                roles.push("I3")
            } else if (rating === 11) {  //SUP
                roles.push("Network Supervisor")
                roles.push("ATC")
            } else if (rating === 12) {  //ADM
                roles.push("Network Administrator")
            }
            if (pilotrating === 0) {
                roles.push("P0")
            } else if (pilotrating === 1) {
                roles.push("P1")
            } else if (pilotrating === 3) {
                roles.push("P2")
            } else if (pilotrating === 7) {
                roles.push("P3")
            } else if (pilotrating === 15) {
                roles.push("P4")
            }
        let joinRoles = roles.join(', ')
            const embed = new EmbedBuilder()
                .setAuthor({name: `${interaction.member.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                .setTitle('Your Roles have been assigned!')
                .setDescription(`${joinRoles}`)
                .setColor('#37B6FF')
                .setFooter({
                    text: "Made for The Pilot Club",
                    iconURL: `https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png`
                })
                .setTimestamp()
            interaction.reply({embeds: [embed]})

            for (const role of MANAGED_ROLES) {
                const discordRole = interaction.member.guild.roles.cache.find(r => r.name === role);
                if (roles.includes(role)) {
                    if (!interaction.member.roles.cache.some(r => r.name === role)) {
                        interaction.member.roles.add(discordRole).catch(e => console.log(e));
                    }
                } else {
                    if (interaction.member.roles.cache.some(r => r.name === role)) {
                        interaction.member.roles.remove(discordRole).catch(e => console.log(e));
                    }
                }
            }
        }
    }
}