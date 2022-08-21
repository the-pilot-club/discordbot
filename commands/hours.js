const {SlashCommandBuilder} = require('discord.js');
const {ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
const {EmbedBuilder} = require('discord.js');
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
            await interaction.reply({content: `Please connect your VATSIM account to the TPC Discord!`,components: [row], ephemeral: true})
        } else {
            let data = JSON.parse(body)
            let atc = data.atc
            let pilot = data.pilot
            let s1 = data.s1
            let s2 = data.s2
            let s3 = data.s3
            let c1 = data.c1
            let c3 = data.c3
            let i1 = data.i1
            let i3 = data.i3
            const embed = new EmbedBuilder()
                .setAuthor({name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                .setTitle('Your Hours On VATSIM!')
                .addFields({name:'Pilot Hours: ',value: `${pilot}`, inline: true},
                                {name: 'ATC Hours:', value: `${atc}`})
                .setColor('#37B6FF')
                .setFooter({text: "Made for The Pilot Club" , iconURL: `https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png`})
                .setTimestamp()
            if (s1 != "0"){
                embed.addFields({name:'S1 Hours:', value: `${s1}`})}
            if (s2 != "0"){
                embed.addFields({name: 'S2 Hours:', value: `${s2}`})}
            if (s3 != "0"){
                embed.addFields({name:'S3 Hours:', value:`${s3}`})}
            if (c1 != "0") {
                embed.addFields({name:"C1 Hours:", value:`${c1}`})}
            if (c3 != "0"){
                embed.addFields({name: "C3 Hours:", value:`${c3}`})}
            if (i1 != "0"){
                embed.addFields({name: "I1 Hours:", value:`${i1}`})}
            if (i3 != "0"){
                embed.addFields({name: "I3 Hours:", value:`${i3}`})}
            await interaction.reply({embeds:[embed],  ephemeral: true})
        }
    }
}