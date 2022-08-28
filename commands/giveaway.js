const {SlashCommandBuilder} = require('discord.js');
const {EmbedBuilder} = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('giveaway')
        .setDescription('Picks a random user with giveaway role.'),
    async execute(interaction) {
        if (interaction.member.roles.cache.some(role => role.name === 'Staff') || interaction.member.roles.cache.some(role => role.name === 'Air Marshals')) {
            interaction.guild.members.fetch().then(members => {
                let result = members.filter(m => m.roles.cache.find(role => role.id === process.env.GIVEAWAY_ROLE));
                let tags = result.map(m => m.user.toString());
                let winner = tags[Math.floor(Math.random() * tags.length)]
                const winnere = new EmbedBuilder()
                    .setTitle("Giveaway Winner")
                    .setAuthor({
                        name: `The Pilot Club`,
                        iconURL: `https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png`
                    })
                    .addFields({name:`\u200b`, value:`And the winner is ${winner} Congratulations!`})
                    .setColor('YELLOW')
                    .setFooter("Made For The Pilot Club Giveaway's")
                    .setTimestamp()

                 interaction.deferReply()
                 setTimeout(function (){
                     interaction.editReply({embeds:[winnere]});
                 },3000)

            })
        } else {
            interaction.reply("Sorry, /giveaway is staff only")
        }
    },
};
