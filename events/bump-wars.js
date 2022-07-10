module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message) {
        if (message.content.toLowerCase() === "bump wars")
            message.reply("**BUMP WARS** \n \n "
                + "Team 1: TBD "
                + "\n Team 2: TBD"
                + " \n \n Rules: \n "
                + "1: type `/bump` to bump the server on Disboard \n"
                + " 2: Bumps are only possible once every 2 hours \n"
                + " 3: If your bump is successful you must post the current score under your bump or forfeit the point (nobody gets a point) \n"
                + " 4: Have fun! \n"
                + " \n Important info: \n "
                + "*Daily score resets at midnight Eastern time. Any bumps made past that moment will be counted for the next day's score."
                + " \n *Teams compete to win the week by majority of days won. \n  *The team with the most weeks under their belt at the end of the month wins! \n"
                + " \n  Why are we doing this? \n Bumping this server often helps to keep us at the top of the server list on Disboard."
                + " It gives our community a chance to grow and allows you to be involved in the process. Have fun!")
    }
};