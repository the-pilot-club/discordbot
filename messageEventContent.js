import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js'
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

export function msfs2020HelpContent (message) {
  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setLabel('Microsoft Flight Simulator 2020 FAQ')
        .setURL('https://www.reddit.com/r/flightsim/wiki/msfsfaq')
        .setStyle(ButtonStyle.Link)
    )
  message
    .reply({ content: 'Check out MSFS2020 FAQ!', components: [row] })
    .catch(error => sendErrorToSentry(error, 'msfs2020HelpContent'))
}

export function rulesContent (message) {
  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setLabel('The Pilot Club Rules')
        .setURL('https://discord.com/channels/830201397974663229/833198809701679124/848232804282138644')
        .setStyle(ButtonStyle.Link)
    )
  message
    .reply({ content: 'You can find the club rules here!', components: [row] })
    .catch(error => sendErrorToSentry(error, 'rulesContent'))
}

export function supportContent (message) {
  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setLabel('The Pilot Club Support')
        .setURL('https://support.thepilotclub.org/open.php')
        .setStyle(ButtonStyle.Link)
    )
  message.reply({
    content: 'To get support or submit feedback, click the button below! Thank you for being a valued member of The Pilot Club!!',
    components: [row]
  })
    .catch(error => sendErrorToSentry(error, 'supportContent'))
}

export function tpcCallsignContent (message) {
  const embed = new EmbedBuilder()
    .setTitle('TPC Callsign')
    .setColor('#37B6FF')
    .addFields({
      name: 'How to get a TPC Callsign',
      value: 'When flying group flights you get an extra 250xp points for using a TPC callsign during the flight.'
    })
    .addFields({
      name: '\u200b',
      value: 'To get a TPC callsign you just need to register one that has not yet been taken. You can do so with the button below and fill in the blanks!'
    })
    .setFooter({ text: 'Made by The Pilot Club' })
  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setLabel('Get a Call Sign Here!')
        .setURL('https://callsigns.thepilotclub.org/')
        .setStyle(ButtonStyle.Link))
  message.reply({ embeds: [embed], components: [row] }).catch(error => sendErrorToSentry(error, 'tpcCalsignContent'))
}

export function tpcLiveryContent (message) {
  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setLabel('TPC Liveries')
        .setURL('https://thepilotclub.org/sop#liveries')
        .setStyle(ButtonStyle.Link)
    )
  message
    .reply({ content: 'Club liveries can be downloaded here:', components: [row] })
    .catch(error => sendErrorToSentry(error, 'tpcLiveryContent'))
}

export function worldTourContent (message) {
  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setLabel('Get the World Tour Role')
        .setURL('https://discord.com/channels/830201397974663229/833198809701679124/848245312815497237')
        .setStyle(ButtonStyle.Link)
    )
  message
    .reply({
      content: 'Want to join the World Tour Flight? Proceed to this message and click the World Tour Logo!',
      components: [row]
    })
    .catch(error => sendErrorToSentry(error, 'worldTourContent'))
}

export function joinVatsimContent (message) {
  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setLabel('Joining VATSIM')
        .setURL('https://my.vatsim.net/')
        .setStyle(ButtonStyle.Link)
    )
  message.reply({
    content: 'To Join VATSIM you should go to this website and click register!',
    components: [row]
  }).catch(error => sendErrorToSentry(error, 'joinVatsimContent'))
}

export function whatServerContent (message) {
  message.reply('We do not use the default Microsoft Flight Simulator 2020 Multiplayer Server here in The Pilot Club. We use VATSIM for all of our group flights!\n \n' +
    'VATSIM is the Virtual Air Traffic Simulation network, connecting people from around the world flying online or acting as virtual Air Traffic Controllers. ' +
    '\n \nThis completely free network allows aviation enthusiasts the ultimate experience. Air Traffic Control (ATC) is available in our communities throughout the world, operating as close as possible to the real-life procedures and utilizing real-life weather, airport and route data. ' +
    '\n \nOn VATSIM you can join people on the other side of the planet to fly and control, with nothing more than a home computer! If you would like more information, please go to https://vatsim.net')
    .catch(error => sendErrorToSentry(error, 'whatServerContent'))
}

export function thanksTpcContent (message) {
  const embed = new EmbedBuilder()
    .setAuthor({
      name: 'The Pilot Club',
      iconURL: 'https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png'
    })
    .setColor('#37B6FF')
    .setDescription('You\'re welcome! Anytime!')
  message.reply({ embeds: [embed] }).catch(error => sendErrorToSentry(error, 'thanksTpcContent'))
}

export function whatIsVatsimContent (message) {
  message.reply('VATSIM is the Virtual Air Traffic Simulation network, connecting people from around the world flying online or acting as virtual Air Traffic Controllers.\n \n' +
    'This completely free network allows aviation enthusiasts the ultimate experience.' +
    'Air Traffic Control (ATC) is available in our communities throughout the world, operating as close as possible to the real-life procedures and utilizing real-life weather, airport and route data.' +
    ' \n \nOn VATSIM you can join people on the other side of the planet to fly and control, with nothing more than a home computer! If you would like more information, please go to https://www.thepilotclub.org/resources#VATSIM')
    .catch(error => sendErrorToSentry(error, 'whatIsVatsimContent'))
}
