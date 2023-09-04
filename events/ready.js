import { ActivityType } from 'discord.js'
export default {
  name: 'ready',
  once: true,
  execute (client) {
    const gitchannel = client.channels.cache.find(channel => channel.name === 'github-notifications')
    console.log(`Logged in as ${client.user.tag}`)
    client.user.setActivity('XPlane 11', { type: ActivityType.Playing })
    gitchannel.send('https://tenor.com/view/hiding-under-covers-tired-sleepy-hiding-under-blanket-good-night-gif-19864771')
  }
}
