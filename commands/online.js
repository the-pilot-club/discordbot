const {SlashCommandBuilder} = require('discord.js');
const {EmbedBuilder} = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-online-members')
        .setDescription('Gets the members who are online'),
    async execute(interaction) {
        const users = []
        const livemembersResponse = await fetch(`https://data.vatsim.net/v3/vatsim-data.json`);
        const liveMembers = await livemembersResponse.json()
        const tpcPilots = liveMembers.pilots
        //getting remarks with OPERATED BY THEPILOTCLUB.ORG
        const remakrsFiltered = tpcPilots.filter(tpcPilots => tpcPilots.flight_plan?.remarks.toUpperCase().indexOf("OPERATED BY THEPILOTCLUB.ORG") > -1)
        //callsign's loop through each array
        for (let i = 0; i < remakrsFiltered.length; i++) {
            let remarkObj = remakrsFiltered[i];
            console.log(remarkObj.callsign)
            users.push(remarkObj.callsign , ' - ', remarkObj.name, " - ", remarkObj.cid, '\n');
        }
        const embed = new EmbedBuilder()
            .setTitle('Current Online TPC Members')
            .setDescription(`${users.join('')}`)
            .setColor(`#37B6FF`)
            .setFooter({text:`Made for The Pilot Club` ,iconURL: `https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png`})
            .setTimestamp()


        if (users.length === 0) {
            await interaction.reply({
                content: `No one is online :(`
            }).catch(error =>
                console.error(error))
        }

        await interaction.reply({
            embeds: [embed]
        }).catch(error =>
            console.error(error))
    }
};