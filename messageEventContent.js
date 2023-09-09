import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'
import { sendErrorToSentry, wrapIDForDiscord } from './utils.js'
import { guildConstants } from './bot.js'
/**
 * @function bumpWarsContent
 * @param {Message} message
 */
export function bumpWarsContent (message) {
  message
    .reply(`**BUMP WARS** 
 

        __Team 1: Law and Order__

- Dylan | TPC1496 | DELA
- Serge | TPC6
- Kelvin | TPC1992 | SBxx
        

__Team 2: Angry Monkeys__

- Caleb Y | TPC452 | 787
- Rich P | N7RP
- Chris | TPC139 | KUHC
          
 
__Rules:__ 

         1: type \`/bump\` to bump the server on Disboard 

         2: Bumps are only possible once every 2 hours 

         3: If your bump is successful you must post the current score under your bump or forfeit the point (nobody gets a point) 

         4: Have fun! 

        
Important info: 

         *Daily score resets at midnight Eastern time. Any bumps made past that moment will be counted for the next day's score.
         *Teams compete to win the week by majority of days won. 
         *The team with the most weeks under their belt at the end of the month wins! 

         
Why are we doing this? 
Bumping this server often helps to keep us at the top of the server list on Discord.
          It gives our community a chance to grow and allows you to be involved in the process. Have fun!`)
    .catch(error => {
      sendErrorToSentry(error, 'bumpWarsContent')
    })
}

/**
 * @function fnoContent
 * @param {Message} message
 */
export function fnoContent (message) {
  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setLabel('Friday Night Operations Information')
        .setURL('https://docs.google.com/document/d/1n2dorXXbRavCci0FqYMMDQngrYqnn3UXNDAiK95Kc98/')
        .setStyle(ButtonStyle.Link)
    )
  message.reply({
    content: 'FNO Stands for Friday Night Ops. You can find more information here!',
    components: [row]
  }).catch(error => {
    sendErrorToSentry(error, 'fnoContent')
  })
}

export function inviteLinkContent (message) {
  message
    .reply('Please use this link when inviting somebody to the server: https://thepilotclub.org')
    .catch(error => sendErrorToSentry(error, 'inviteLinkContent'))
}

export function inviteLinkTwoContent (message) {
  message
    .reply('Please use this link when inviting somebody to the server: https://thepilotclub.org')
    .catch(error => sendErrorToSentry(error, 'inviteLinkTwoContent'))
}

export function moderatorContent (message) {
  message
    .reply(`${wrapIDForDiscord(guildConstants.AIR_MARSHAL_ROLE_ID)} and ${wrapIDForDiscord(guildConstants.GROUND_CREW_ROLE_ID)} has been notified!`)
    .catch(error => sendErrorToSentry(error, 'moderatorContent'))
}
