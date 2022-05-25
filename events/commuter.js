module.exports = {
    name: 'guildMemberUpdate',
    once: false,
      execute(message) {
        async (oldMember, newMember) => {
            if(oldMember.roles.cache.has('930863426224410684')) return;
            if(newMember.roles.cache.has('930863426224410684')) {
              const channel = client.channels.cache.get('830209982770708500');
              channel.send({
                content: `Join us in congratulating ${oldMember} with achieving <@&930863426224410684> status at TPC!`,
                 files: [{
                  attachment: `./pics/congrats.png`,
                  name: 'file.png'
                }]
              })
         }
        }
    }
  };