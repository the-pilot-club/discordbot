const poll = ['Poll']

module.exports = {
    name: 'messageCreate',
    once: false,
      execute(message) {
      if (message.content.includes(poll)) {
        message.reply("testing 123")
      }
      }
  };