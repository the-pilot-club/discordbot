module.exports = {
    name: 'guildMemberUpdate',
    once: false,
      execute(message) {
        if(oldMember.roles.cache.has('838504056358961164')) return;
        if(newMember.roles.cache.has('838504056358961164')) {
          const channel = client.channels.cache.get('830209982770708500');
          channel.send(`${oldMember} Thank you for boosting the club!`);
        }
        }
}