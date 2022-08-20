const { ActivityType } = require('discord.js');
module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        const channel = client.channels.cache.get(process.env.GITHUB_CHANNEL)
        console.log(`Logged in as ${client.user.tag}`);
        client.user.setActivity('XPlane 11', {type: ActivityType.Playing})
        channel.send(`https://tenor.com/view/im-awake-disney-frozen-kristen-bell-princess-anna-gif-5468647`)
    },
};