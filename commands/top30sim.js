const {SlashCommandBuilder} = require('discord.js');
const {ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
const {EmbedBuilder} = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('top-vatsim-pilots')
        .setDescription('See who has the top hours in the last month!'),
    async execute(interaction) {
        const response = await fetch(`https://callsigns.thepilotclub.org/DiscordOperations/GetLastMonthTopHoursVatsim/`, {
            method: 'POST'
        })
        let body = await response.json()
        //console.log(body)
        let data = JSON.parse(body)
       //console.log(data)
             let did = data.discord_id
             let time = data.totaltime
   console.log(time)
    //         const embed = new EmbedBuilder()
    //             .setAuthor({
    //                 name: `${interaction.member.displayName}`,
    //                 iconURL: `${interaction.user.displayAvatarURL()}`
    //             })
    //             .setTitle('Your Hours On VATSIM!')
    //             .addFields({name: 'Pilot Hours: ', value: `${pilot}`, inline: true},
    //                 {name: 'ATC Hours:', value: `${atc}`})
    //             .setColor('#37B6FF')
    //             .setFooter({
    //                 text: "Made for The Pilot Club",
    //                 iconURL: `https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png`
    //             })
    //             .setTimestamp()
    //         if (s1 != "0") {
    //             embed.addFields({name: 'S1 Hours:', value: `${s1}`})
    //         }
    //         if (s2 != "0") {
    //             embed.addFields({name: 'S2 Hours:', value: `${s2}`})
    //         }
    //         if (s3 != "0") {
    //             embed.addFields({name: 'S3 Hours:', value: `${s3}`})
    //         }
    //         if (c1 != "0") {
    //             embed.addFields({name: "C1 Hours:", value: `${c1}`})
    //         }
    //         if (c3 != "0") {
    //             embed.addFields({name: "C3 Hours:", value: `${c3}`})
    //         }
    //         if (i1 != "0") {
    //             embed.addFields({name: "I1 Hours:", value: `${i1}`})
    //         }
    //         if (i3 != "0") {
    //             embed.addFields({name: "I3 Hours:", value: `${i3}`})
    //         }
             await interaction.reply({content: 'FUCK YOU', ephemeral: true})
    //     }
    // }
}}