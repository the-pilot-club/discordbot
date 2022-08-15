const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageActionRow, MessageButton} = require("discord.js");
const {MessageEmbed} = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('sync')
        .setDescription('Sync your VATSIM Ratings for TPC!'),
    async execute(interaction , client) {
        const response = await fetch(`https://callsigns.thepilotclub.org/DiscordOperations/GetVatsimRatingInfo?Discordid=${interaction.user.id}`, {
            method: 'POST'})
        let body = await response.json()
        if (body === "{Not Found}") {
            const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setLabel('Connect my account!')
                            .setURL(`https://callsigns.thepilotclub.org/sendauthentication.aspx?id=${interaction.user.id}`)
                            .setStyle('LINK'),
                    );
            await interaction.reply({content: `Please connect your VATSIM account to the TPC Discord!`,components: [row], ephemeral: true})
        } else {
            let data = JSON.parse(body)
            let rating = data.rating
            let pilotrating = data.pilotrating
            let roles = []
            if (rating == "2") { //S1
                roles.push("ATC")
                roles.push("S1")
            }else if (rating == "3") {  //S2
                roles.push("ATC")
                roles.push("S2")
            }else if (rating == "4") {  //S3
                roles.push("ATC")
                roles.push("S3")
            }else if (rating == "5") {  //C1
                roles.push("ATC")
                roles.push("C1")
            }else if (rating == "6") {  //C2
                roles.push("ATC")
            }else if (rating == "7") {  //C3
                roles.push("ATC")
                roles.push("C3")
            }else if (rating == "8") { //I1
                roles.push("ATC")
                roles.push("I1")
            }else if (rating == "9") {  //I2
                roles.push("ATC")
            }else if (rating == "10") {  //I3
                roles.push("ATC")
                roles.push("I3")
            }else if (rating == "11") {  //SUP
                roles.push("Network Supervisor")
                roles.push("ATC")
            }else if (rating == "12"){  //ADM
                roles.push("Network Administrator")
            }
            if (pilotrating == "0") {
                roles.push("P0")
            }else if (pilotrating == "1") {
                roles.push("P1")
            }else if (pilotrating == "3") {
                roles.push("P2")
            }else if (pilotrating == "7") {
                roles.push("P3")
            }else if (pilotrating == "15") {
                roles.push("P4")
            }
            let roleStr = "",
                excluded = ['TPC Custom','Carl Bot', 'Founder', 'Air Marshals', 'Training Coordinator', 'Deputy Training Coordinator', 'Training Ops Manager'
                    , 'Ground Crew','The Pilot Club', 'Developers', 'Muted', 'Flight Ops','Training Team','ATO CFI','ATO D-CFI',
                    'Examiner','Instructor','Team Lead','Staff','Charters Asst. Ops Manager',
                    'Charters Managers','Social Media Team','Early Adopters','Partners','VIP','Frequent Flyer','Commuter','Booster','Lucky Pilots','IRL Pilots','Streamers',
                    'TPC Charters','Explorers','Pilots','Group Flights','GA Flights','World Tour','Giveaway','Other Bots','Flight School', 'Livery Maker',
                    'Onboarded','CTD King','DISBOARD.org','MonitoRSS','DSL','VATBot','Statbot','StickyBot','Charters Top Gun','Insiders' , 'MSFS 2020', 'X-Plane', 'P3D', 'FSX'
                ]
                interaction.member.roles.cache.forEach(role => {
                if (role.id !== interaction.guild.roles.everyone.id
                    && excluded.indexOf(role.name) < 0
                    && roles.indexOf(role.name) < 0)
                    interaction.member.roles.remove(role).catch(e => console.error(e))
            })
                for (let i = 0; i < roles.length; i++) {
                const role = interaction.guild.roles.cache.find(role => role.name === roles[i])
                interaction.member.roles.add(role).catch(e => console.error(e))
                roleStr += `${role} `}

                const embed = new MessageEmbed()
                .setAuthor({name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                .setTitle('Your Roles have been assigned!')
                .setDescription(`${roleStr}`)
                .setColor('0X37B6FF')
                .setFooter({text: "Made for The Pilot Club" , iconURL: `https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png`})
                .setTimestamp()
            interaction.reply({embeds: [embed]}).catch(error =>
                console.log(error))
        }
    }
}