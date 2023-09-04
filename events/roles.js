export default {
  name: 'guildMemberUpdate',
  once: false,
  execute (oldMember, newMember) {
    if (oldMember.roles.cache.has(process.env.CHARTERS_ROLE)) return
    if (newMember.roles.cache.has(process.env.CHARTERS_ROLE)) {
      newMember.user.send('Welcome to TPC Charters, we look forward to having you fly with us. Please read https://www.thepilotclub.org/s/TPC_Charters_-_pilots_guide_v10.pdf.' +
        '  We hope this will answer most of your questions.  If you still have questions after having read this, then ask away.'
      ).catch(error => {
        console.error(`I could not DM this member :(: ${error}`)
      })
    }
  }
}
