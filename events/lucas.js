module.exports = {
    name: 'messageCreate',
    once: false,
      execute(message) {
      if (message.content.toLowerCase() === "lucas")
      message.reply("<@!250627885587496960>")
      }
  };