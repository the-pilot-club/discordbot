module.exports = {
    name: 'messageCreate',
    once: false,
      execute(message) {
      if (message.content.toLowerCase() === "rules")
      message.reply("here are Club rules: https://discord.com/channels/830201397974663229/833198809701679124/848232804282138644")
      }
  };