module.exports = {
    name: 'messageCreate',
    once: false,
      execute(message) {
        if (message.content.toLowerCase() === "shut up kara")
      message.reply("https://tenor.com/view/how-dare-you-ashamed-offended-gif-18893688")
      }
  };