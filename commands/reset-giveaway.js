import { SlashCommandBuilder } from 'discord.js'

export default {
  data: new SlashCommandBuilder()
    .setName('reset-giveaway')
    .setDescription('Reset the giveaway by removing reactions and role'),
  async execute (interaction) {
    const giveawayMessageId = process.env.GIVEAWAY_MESSAGE
    const giveawayChannel = interaction.client.channels.cache.get(process.env.ABOUTANDSOP)
    const giveawayMessage = await giveawayChannel.messages.fetch(giveawayMessageId)

    const giveawayEmojiId = ':giveaway:895480872243978280'

    const giveawayReaction = giveawayMessage.reactions.cache.get(giveawayEmojiId)
    if (giveawayReaction) {
      giveawayReaction.remove()
    }

    const giveawayRoleId = process.env.GIVEAWAY_ROLE
    const giveawayRole = interaction.guild.roles.cache.get(giveawayRoleId)
    const members = await interaction.guild.members.fetch()
    members.forEach(members => members.roles.remove(giveawayRole))
    giveawayMessage.react(giveawayEmojiId).catch(err => console.log(err))

    await interaction.reply('**I have reset the giveaway role and message!**')
  }
}
