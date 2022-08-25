const {SlashCommandBuilder} = require('discord.js');
const {ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
    module.exports = {
        data: new SlashCommandBuilder()
            .setName('indicator')
            .setDescription('Shows you what your current VATSIM Indicator is!'),
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
                await interaction.reply({
                    content: `Please connect your VATSIM account to the TPC Discord!`,
                    components: [row],
                    ephemeral: true
                })
            } else {
                let data = JSON.parse(body)
                let id = data.id
                await interaction.reply({content: `https://my.vatsim.net/indicators/${id}`})

            }
        }
    }