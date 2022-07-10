module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message) {
        if (message.content.includes("Kara"))
            message.reply("https://tenor.com/view/kara-danvers-kara-zor-el-super-girl-shocked-gif-13811592")
    }
};