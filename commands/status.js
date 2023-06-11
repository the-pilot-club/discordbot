const {SlashCommandBuilder} = require('discord.js');
const {EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Sends a status update with information'
        ).addStringOption(option =>
            option.setName('subject').setDescription('What is the subject of the web service issue?').setRequired(true)
        ).addStringOption(option =>
            option.setName('status-color-1').setDescription('What is the status of the websites?').setRequired(true)
                .addChoices(
                    {name: '🟢', value: '🟢'},
                    {name: '🟡', value: '🟡'},
                    {name: '🔴', value: '🔴'},)
                    
        ).addStringOption(option =>
                option.setName('description-1').setDescription('What is the description of the status?').setRequired(true).setMaxLength(100)
        ).addStringOption(option =>
            option.setName('status-color-2').setDescription('What is the status of the websites?').setRequired(false)
                .addChoices(
                    {name: '🟢', value: '🟢'},
                    {name: '🟡', value: '🟡'},
                    {name: '🔴', value: '🔴'},)
        ).addStringOption(option =>
            option.setName('description-2').setDescription('What is the description of the status?').setRequired(false).setMaxLength(100)
        ).addStringOption(option =>
            option.setName('status-color-3').setDescription('What is the status of the websites?').setRequired(false)
                .addChoices(
                    {name: '🟢', value: '🟢'},
                    {name: '🟡', value: '🟡'},
                    {name: '🔴', value: '🔴'},)
        ).addStringOption(option =>
            option.setName('description-3').setDescription('What is the description of the status?').setRequired(false).setMaxLength(100)
        ),
    async execute(interaction) {
        const subject = interaction.options.getString('subject')
        const color1 = interaction.options.getString('status-color-1')
        const desc1 = interaction.options.getString('description-1')
        const color2 = interaction.options.getString('status-color-2')
        const desc2 = interaction.options.getString('description-2')
        const color3 = interaction.options.getString('status-color-3')
        const desc3 = interaction.options.getString('description-3')
        const notam = interaction.guild.client.channels.cache.find(channel => channel.name === "club-notams")
        const embed1 = new EmbedBuilder()
            .setTitle(`${subject}`)
            .setAuthor({
                name: `The Pilot Club`,
                iconURL: `https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png`,
                url: `https://thepilotclub.org`
            })
            .addFields({
                name: `${color1}   ${desc1}`,
                value: `\u200b`
            })
            .setColor('#37B6FF')
            .setTimestamp();
        const embed2 = new EmbedBuilder()
            .setTitle(`${subject}`)
            .setAuthor({
                name: `The Pilot Club`,
                iconURL: `https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png`,
                url: `https://thepilotclub.org`
            })
            .addFields(
                {name: `${color1}   ${desc1}`, value: `\u200b`},
                {name: `${color2}   ${desc2}`, value: `\u200b`})
            .setColor('#37B6FF')
            .setTimestamp();
        const embed3 = new EmbedBuilder()
            .setTitle(`${subject}`)
            .setAuthor({
                name: `The Pilot Club`,
                iconURL: `https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png`,
                url: `https://thepilotclub.org`
            })
            .addFields(
        {name: `${color1}   ${desc1}`, value: `\u200b`},
            {name: `${color2}   ${desc2}`, value: `\u200b`},
            {name:`${color3}   ${desc3}`, value: `\u200b`})
            .setColor('#37B6FF')
            .setTimestamp();

        if (desc2 == null){
            notam.send({embeds: [embed1]})
        }
        if( desc2 !== null && desc3 == null) {
            notam.send({embeds:[embed2]})
        }
        if(desc2 !== null && desc3 !== null) {
            notam.send({embeds: [embed3]})
        }
        await interaction.reply({content :'Done!' , ephemeral: true});
    }
}
