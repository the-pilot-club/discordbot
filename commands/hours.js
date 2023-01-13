const {SlashCommandBuilder} = require('discord.js');
const {ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
const {EmbedBuilder} = require('discord.js');
const fetch = require('node-fetch')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('hours')
        .setDescription('See how many Hours you have on the network!'),
    async execute(interaction) {
        const response = await fetch(`https://callsigns.thepilotclub.org/DiscordOperations/GetVatsimHrsInfo?Discordid=${interaction.user.id}`, {
            method: 'POST'
        })
        let body = await response.json()
        if (body === "Not Found"){
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('Connect my account!')
                        .setURL(`https://callsigns.thepilotclub.org/sendauthentication.aspx?id=${interaction.user.id}`)
                        .setStyle(ButtonStyle.Link),
                );
            await interaction.reply({content: `Please connect your VATSIM account to the TPC Discord!`, components: [row], ephemeral: true})
        } else {
            let data = JSON.parse(body)
            const embed = new EmbedBuilder()
                .setAuthor({name: `${interaction.member.displayName} - ${data.id}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                .setTitle('Your Hours On VATSIM!')
                .addFields({name:'Pilot Hours:',value: `${data.pilot}`, inline: true},
                                {name: 'ATC Hours:', value: `${data.atc}`})
                .setColor('#37B6FF')
                .setFooter({text: "Made for The Pilot Club" , iconURL: `https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png`})
                .setTimestamp()
            if (data.s1 !== 0){
                embed.addFields({name: "S1 Hours:", value: `${data.s1}`})}
            if (data.s2 !== 0){
                embed.addFields({name: "S2 Hours:", value: `${data.s2}`})}
            if (data.s3 !== 0){
                embed.addFields({name: "S3 Hours:", value: `${data.s3}`})}
            if (data.c1 !== 0){
                embed.addFields({name: "C1 Hours:", value: `${data.c1}`})}
            if (data.c3 !== 0){
                embed.addFields({name: "C3 Hours:", value: `${data.c3}`})}
            if (data.i1 !== 0){
                embed.addFields({name: "I1 Hours:", value: `${data.i1}`})}
            if (data.i3 !== 0){
                embed.addFields({name: "I3 Hours:", value: `${data.i3}`})}
            if (data.sup !== 0){
                embed.addFields({name: "Supervisor Hours:", value: `${data.sup}`})
            if (data.adm !== 0){
                embed.addFields({name: "Administrator Hours:", value: `${data.adm}`})}
            }
            await interaction.reply({embeds:[embed],  ephemeral: true})
        }
    }
}
