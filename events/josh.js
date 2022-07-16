module.exports = {
    name: 'messageCreate',
    once: false,
      execute(message) {
      if (message.content.toLowerCase() === "josh")
      message.reply("<@!507323384451825664>")
      }
  };