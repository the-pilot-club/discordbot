module.exports = {
    name: 'messageCreate',
    once: false,
      execute(message) {
      if (message.content.toLowerCase() === "invite link mr bot")
      message.reply("Please use this link when inviting somebody to the server: https://thepilotclub.org")
      }
  };