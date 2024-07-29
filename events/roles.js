import {Config} from "../config/config.js";
const config = Config
export default function roleNotification(oldMember, newMember) {
  const channel = newMember.client.channels.cache.find(channel => channel.name === 'crew-chat')
  if (!oldMember.roles.cache.has(config.chartersRole()) && newMember.roles.cache.has(config.chartersRole())) {
    newMember.user.send('Welcome to TPC Charters, we look forward to having you fly with us. Please read https://www.thepilotclub.org/s/TPC_Charters_-_pilots_guide_v10.pdf.' +
        '  We hope this will answer most of your questions.  If you still have questions after having read this, then ask away.'
    ).catch(error => {
      console.error(`I could not DM this member :(: ${error}`)
    })
  }
  if (!oldMember.roles.cache.has(config.vipRole()) && newMember.roles.cache.has(config.vipRole())) {
    channel.send({
      content: `Join us in congratulating ${oldMember} with achieving <@&${config.vipRole()}> status at TPC!`,
      files: [{attachment: './pics/congrats.png', name: 'file.png'}]
    })
  }
  if (!oldMember.roles.cache.has(config.ffRole()) && newMember.roles.cache.has(config.ffRole())) {
    channel.send({
      content: `Join us in congratulating ${oldMember} with achieving <@&${config.ffRole()}> status at TPC!`,
      files: [{ attachment: './pics/congrats.png', name: 'file.png' }]
    })
  }
  if (!oldMember.roles.cache.has(config.commuterRole()) && newMember.roles.cache.has(config.commuterRole())) {
    channel.send({
      content: `Join us in congratulating ${oldMember} with achieving <@&${config.commuterRole()}> status at TPC! You are now part of the TPC **COMPANY PERKS** Program!`,
      files: [{ attachment: './pics/congrats.png', name: 'file.png' }]
    })
  }
}



// const roleMessages = {
//   commuterRole: (oldMember) => {
//     return {
//       content: `Join us in congratulating ${oldMember} with achieving <@&${process.env
//           .COMMUTER_ROLE}> status at TPC! You are now part of the TPC **COMPANY PERKS** Program!`,
//       files: [{ attachment: './pics/congrats.png', name: 'file.png' }]
//     }
//   },
//   frequentFlyerRole: (oldMember) => {
//     return {
//       content: `Join us in congratulating ${oldMember} with achieving <@&${process.env.FREQUENTFLIER_ROLE}> status at TPC! You are now part of the TPC **COMPANY PERKS** Program!`,
//       files: [{ attachment: './pics/congrats.png', name: 'file.png' }]
//     }
//   },
//   vipRole: (oldMember) => {
//     return {
//       content: `Join us in congratulating ${oldMember} with achieving <@&${process.env.VIP_ROLE}> status at TPC! You are now part of the TPC **COMPANY PERKS** Program!`,
//       files: [{ attachment: './pics/congrats.png', name: 'file.png' }]
//     }
//   },
//   boosterRole: (oldMember) => {
//     return {
//       content: `${oldMember} Thank you for boosting the club!`,
//       files: null
//     }
//   }
// }
//
// export default async function roleNotification (oldMember, newMember, channel, role, messageName) {
//   if (!oldMember.roles.cache.has(role) && newMember.roles.cache.has(role)) {
//     if (role === process.env.CHARTERS_ROLE) {
//       newMember.user.send('Welcome to TPC Charters, we look forward to having you fly with us. Please read https://www.thepilotclub.org/s/TPC_Charters_-_pilots_guide_v10.pdf.' +
//           '  We hope this will answer most of your questions.  If you still have questions after having read this, then ask away.'
//       ).catch(error => {
//         console.error(`I could not DM this member :(: ${error}`)
//       })
//
//       return
//     }
//     const messageFunc = roleMessages[messageName]
//     channel.send(messageFunc(oldMember))
//     if (role === process.env.BOOSTER_ROLE) {
//       if (!oldMember.roles.cache.has(process.env.BOOSTER_ROLE) && newMember.roles.cache.has(process.env.BOOSTER_ROLE)) {
//          return channel.send(roleMessages.boosterRole(oldMember).content)
//       }
//     }
//     if (role === process.env.VIP_ROLE) {
//       if (!oldMember.roles.cache.has(process.env.VIP_ROLE) && newMember.roles.cache.has(process.env.VIP_ROLE)) {
//          return channel.send(roleMessages.vipRole(oldMember).content)
//       }
//     }
//     if (role === process.env.FREQUENTFLIER_ROLE) {
//       if (!oldMember.roles.cache.has(process.env.FREQUENTFLIER_ROLE) && newMember.roles.cache.has(process.env.FREQUENTFLIER_ROLE)) {
//          return channel.send(roleMessages.frequentFlyerRole(oldMember).content)
//       }
//     }
//     if (role === process.env.COMMUTER_ROLE) {
//       if (!oldMember.roles.cache.has(process.env.COMMUTER_ROLE) && newMember.roles.cache.has(process.env.COMMUTER_ROLE)) {
//          return channel.send(roleMessages.commuterRole(oldMember).content)
//       }
//     }
//   }
// }
