module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message) {
        if (message.content.includes("<@398557782623649794>"))
            message.reply("I can see that you have pinged Eric. Although I am sure this is important, he has advised me to inform you that"
                +" He is not always around, and he will get back to you as soon as he can. Eric also understands that your time is important and"
                +" if this is urgent, please send him a DM with your matter. \n \n Thank you for your time and I hope to see you in the skies."
                +"\n\n - The Best First Officer in TPC")
    }
};