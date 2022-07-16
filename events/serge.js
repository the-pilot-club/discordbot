module.exports = {
    name: 'messageCreate',
    once: false,
      execute(message) {
      if (message.content.toLowerCase() === "serge")
      message.reply("<@!524567291128709140>")
      }
  };