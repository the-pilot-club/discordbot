module.exports = {
    name: 'guildMemberUpdate',
    once: false,
      execute(message) {
        if(oldMember.roles.cache.has('930863007372836876')) return;
        if(newMember.roles.cache.has('930863007372836876')) {
          const channel = client.channels.cache.get('830209982770708500');
          channel.send({
            content: `Join us in congratulating ${oldMember} with achieving <@&930863007372836876> status at TPC!`,
             files: [{
              attachment: `./pics/congrats.png`,
              name: 'file.png'
            }]
          })
        }
        }
    }