module.exports = {
name: 'messageCreate',
once: false,
execute(message) {
	if (message.content.toLowerCase() === "support")
    message.reply("To get support or submit feedback, click here: https://support.thepilotclub.org/open.php  Thank you for being a valued member of The Pilot Club!!")
	}
};