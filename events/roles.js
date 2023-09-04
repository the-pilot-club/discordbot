import roleNotification from '../utils/role_notification.js'
import { client, guildConstants } from '../bot.js'

export default {
  name: 'guildMemberUpdate',
  once: false,
  async execute (oldMember, newMember) {
    const channel = await client.channels.fetch(guildConstants.CREW_CHAT_CHANNEL_ID)
    roleNotification(oldMember, newMember, channel, process.env.COMMUTER_ROLE, 'commuterRole')
    roleNotification(oldMember, newMember, channel, process.env.FREQUENTFLIER_ROLE, 'frequentFlyerRole')
    roleNotification(oldMember, newMember, channel, process.env.VIP_ROLE, 'vipRole')
    roleNotification(oldMember, newMember, channel, process.env.CHARTERS_ROLE, 'chartersRole')
  }
}
