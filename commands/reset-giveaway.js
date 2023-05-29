const { SlashCommandBuilder, Util } = require('discord.js');

module.exports = {
    data: {
        name: 'reset-giveaway',
        description: 'Reset the giveaway by removing reactions and role',
    },
    async execute(interaction) {
        const giveawayMessageId = '848245312815497237';
        const giveawayChannel = interaction.client.channels.cache.get('833198809701679124');
        const giveawayMessage = await giveawayChannel.messages.fetch(giveawayMessageId);

        const giveawayEmojiId = '895480872243978280';
        const giveawayEmoji = Util.parseEmoji(giveawayEmojiId);

        // Remove all reactions with the giveaway emoji
        giveawayMessage.reactions.cache.get(giveawayEmoji.id).remove();

        // Remove the giveaway role from everyone who has it
        const giveawayRoleId = '860938566426558505';
        const giveawayRole = interaction.guild.roles.cache.get(giveawayRoleId);
        giveawayRole.members.forEach((member) => {
            member.roles.remove(giveawayRole);
        });

        // Re-react to the message with the giveaway emoji
        giveawayMessage.react(giveawayEmoji);

        await interaction.reply('I have reset the giveaway role and message!');
    },
};
