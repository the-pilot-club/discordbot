const { SlashCommandBuilder, Util } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reset-giveaway')
        .setDescription('Reset the giveaway by removing reactions and role'),
    async execute(interaction) {
        const giveawayMessageId = process.env.GIVEAWAY_MESSAGE;
        const giveawayChannel = interaction.client.channels.cache.get(process.env.ABOUTANDSOP);
        const giveawayMessage = await giveawayChannel.messages.fetch(giveawayMessageId);

        const giveawayEmojiId = '895480872243978280';

        giveawayMessage.reactions.cache.get(giveawayEmoji.id).remove();

        const giveawayRoleId = '860938566426558505';
        const giveawayRole = interaction.guild.roles.cache.get(giveawayRoleId);
        giveawayRole.members.forEach((member) => {
            member.roles.remove(giveawayRole);
        });

        giveawayMessage.react(giveawayEmojiId);

        await interaction.reply('I have reset the giveaway role and message!');
    },
};
