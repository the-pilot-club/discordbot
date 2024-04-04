import { SlashCommandBuilder } from 'discord.js';
import {Config} from "../../config/config.js";
import {sendToSentry} from "../../utils.js";
const config = new Config()
export default {
  data: new SlashCommandBuilder()
    .setName('reset-giveaway')
    .setDescription('Reset the giveaway by removing reactions and role'),
  async execute (interaction) {
    const giveawayMessageId = config.giveawayMessage()
    const giveawayChannel = interaction.client.channels.cache.get(config.aboutAndSop())
    const giveawayMessage = await giveawayChannel.messages.fetch(giveawayMessageId)

    const giveawayEmojiId = '895480872243978280'

    const giveawayReaction = giveawayMessage.reactions.cache.get(giveawayEmojiId)
    if (giveawayReaction) {
      giveawayReaction.remove()
    }

    const giveawayRoleId = config.giveawayRole()
    const giveawayRole = interaction.guild.roles.cache.get(giveawayRoleId)
    const members = await interaction.guild.members.fetch()
    members.forEach(members => members.roles.remove(giveawayRole))
    giveawayMessage.react(giveawayEmojiId).catch(err =>  sendToSentry(err, "Reset Giveaway"))

    await interaction.reply('**I have reset the giveaway role and message!**')
  }
}
