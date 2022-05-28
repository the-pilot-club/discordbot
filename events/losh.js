module.exports = {
    name: 'messageCreate',
    once: false,
      execute(message) {
      if (message.content.toLowerCase() === "losh")
      message.reply("is better than you...Just Kidding! <3 you Losh (Eric)")
      }
  };