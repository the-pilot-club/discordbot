module.exports = {
  name: 'messageCreate',
  once: false,
	execute(message) {
	if (message.content.toLowerCase() === "eric")
    message.reply("|| If you are seeing this message, DM Eric | ZSE | TPC76 and tell him the code word Green Horn ||")
	}
};