module.exports = {
    name: 'ready',
    once: true,
    execute(client, message) {
        const channel = client.channels.cache.get(process.env.GITHUB_CHANNEL)
        console.log(`Logged in as ${client.user.tag}`);
        client.user.setActivity('XPlane 11', {type: "PLAYING"})
        channel.send(`https://tenor.com/view/tired-exhausted-wake-up-just-woke-up-jwu-gif-16266413`)
    },
};