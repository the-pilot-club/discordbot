module.exports = {
    name: 'messageCreate',
    once: false,
      execute(message) {
      if (message.content.toLowerCase() === "what is fno")
      message.reply("FNO Stands for Friday Night Ops. You can find more information here: https://docs.google.com/document/d/1n2dorXXbRavCci0FqYMMDQngrYqnn3UXNDAiK95Kc98/edit")
      }
  };