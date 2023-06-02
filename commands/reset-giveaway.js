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

        const reaction = giveawayMessage.reactions.cache.get(giveawayEmojiId).remove();

        const giveawayRoleId = process.env.GIVEAWAY_ROLE;
        const giveawayRole = interaction.guild.roles.cache.get(giveawayRoleId);
        giveawayRole.members.forEach((member) => {
            member.roles.remove(giveawayRole);
        });

        giveawayMessage.react(giveawayEmojiId);

        await interaction.reply('I have reset the giveaway role and message!');
    },
};
