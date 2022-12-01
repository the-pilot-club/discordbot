const {SlashCommandBuilder} = require('discord.js');
const {EmbedBuilder} = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('giveaway')
        .setDescription('Picks a random user with giveaway role.'),
    async execute(interaction) {
        if (interaction.member.roles.cache.some(role => role.name === 'Staff') || interaction.member.roles.cache.some(role => role.name === 'Air Marshals')) {
            interaction.guild.members.fetch().then(members => {
                let result = members.filter(m => m.roles.cache.find(role => role.name === "Giveaway"));
                let tags = result.map(m => m.user.toString());
                let winner = tags[Math.floor(Math.random() * tags.length)]
                if (winner !== undefined) {
                const winnerEmbed = new EmbedBuilder()
                    .setDescription(`And the winner is ${winner} Congratulations!`)
                    .setAuthor({
                        name: `The Pilot Club`,
                        iconURL: `https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png`
                    })
                    .setColor('#37B6FF')
                    .setFooter({text:"Made For The Pilot Club Giveaways"})
                    .setTimestamp()

                 interaction.deferReply()
                 setTimeout(function (){
                     interaction.editReply({embeds:[winnerEmbed]});
                 },3000)}else { interaction.reply('No one has this role.')}

            })
        } else {
            interaction.reply("Sorry, /giveaway is staff only")
        }
    },
};
