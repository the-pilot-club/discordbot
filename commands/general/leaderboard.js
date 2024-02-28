import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('The link to find our leaderboard!'),
    async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('TPC Leaderboard')
                    .setURL('https://mee6.xyz/thepilotclub')
                    .setStyle(ButtonStyle.Link)
            )
        await interaction.reply({content: 'Check out our leaderboard!', components: [row]})
    }
}
