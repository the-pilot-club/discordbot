import { SlashCommandBuilder } from 'discord.js';
import { Config } from "../../config/config.js";

export default {
    data: new SlashCommandBuilder()
        .setName('reset_giveaway')
        .setDescription('Resets the giveaway by removing roles and clearing reactions.'),

    async execute(interaction) {
        const guild = interaction.guild;
        const emojiId = Config.emojiId();
        const emoji = `<:giveaway:${emojiId}>`;

        try {
            const role = guild.roles.cache.find(role => role.name === 'Giveaway');
            if (!role) {
                await interaction.reply({ content: 'Role not found.', ephemeral: true });
                return;
            }

            guild.members.cache.forEach(member => {
                if (member.roles.cache.has(role.id)) {
                    member.roles.remove(role.id).catch(console.error);
                }
            });

            const channel = guild.channels.cache.find(channel => channel.name === 'about-and-sop');
            if (!channel) {
                await interaction.reply({ content: 'Channel not found.', ephemeral: true });
                return;
            }

            const messageId = Config.giveawayMessage();
            const message = await channel.messages.fetch(messageId);
            const reaction = message.reactions.cache.get(emojiId);
            if (reaction) {
                await reaction.remove();
            } else {
                await interaction.reply({ content: 'Reaction not found.', ephemeral: true });
                return;
            }
            await message.react(emoji);
            await interaction.reply({ content: 'Giveaway has been reset.', ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Failed to reset the giveaway.', ephemeral: true });
        }
    }
};