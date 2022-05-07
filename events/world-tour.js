module.exports = {
    name: 'messageCreate',
    once: false,
      execute(message) {
      if (message.content.toLowerCase() === "world tour")
      message.reply("Want to join the World Tour Flight? Proceed to this message : https://discord.com/channels/830201397974663229/831645469472981002/856378173280223243 and click the Globe!")
      }
  };