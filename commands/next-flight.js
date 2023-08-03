const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const {ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('next-flight')
        .setDescription('The link to find out our next flight!'),
    async execute(interaction) {

        const events = await interaction.guild.scheduledEvents.fetch();
        const sortedEvents = events.sort((a, b) => a.scheduledStartAt - b.scheduledStartAt);
        const event = sortedEvents.first();
        const embed = new EmbedBuilder()
            .setAuthor({name: `${event.name}`})
            .setDescription(`${event.description}`)
            .addFields({name: 'Event Start Time:', value: `${event.scheduledStartAt}`}, {
                name: 'Voice Channel:',
                value: `<#${event.channelId}>`
            })
            .setColor('#37B6FF')
            .setImage(event.coverImageURL())
            .setTimestamp()

            .setFooter({
                text: "Made by TPC Dev Team",
                iconURL: `https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png`
            })
            .setTimestamp()
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("More TPC Group Flights")
                    .setURL("https://thepilotclub.org/dispatch")
                    .setStyle(ButtonStyle.Link),
            );
        await interaction.reply({content: `Next TPC Group Flight:`, embeds: [embed], components: [row]})
    }
};
