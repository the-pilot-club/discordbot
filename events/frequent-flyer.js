module.exports = {
    name: 'guildMemberUpdate',
    once: false,
      execute(message) {
        if(oldMember.roles.cache.has('855253377209204750')) return;
  if(newMember.roles.cache.has('855253377209204750')) {
    const channel = client.channels.cache.get('830209982770708500');
    channel.send({
      content: `Join us in congratulating ${oldMember} with achieving <@&855253377209204750> status at TPC!`,
       files: [{
        attachment: `./pics/congrats.png`,
        name: 'file.png'
      }]
    })
 }
}
}