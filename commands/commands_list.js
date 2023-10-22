/**
 * @typedef {Object} CommandOption
 * @property {string} name
 * @property {string} description
 * @property {boolean} required
 * @property {string} type
 *
 */

/** @typedef {Object} CommandInfo
 *  @property {string} name
 *  @property {string} description
 *  @property {Array<CommandOption>} options
 */

/**
 * @typedef {Object.<string, CommandInfo>} CommandObject
 *
 * */

/** @type CommandObject */
const commandsList = {
  ideaArchive: {
    name: 'idea-archive',
    description: 'This command is for the Admin team to process archives for ideas that have been put in the idea box.',
    options: [
      {
        type: 'string',
        name: 'suggestion-number',
        required: true,
        description: 'What is the Idea Number?'
      },
      {
        type: 'string',
        name: 'member-who-suggested',
        description: 'Copy and paste the username who suggested the idea.',
        required: true
      },
      {
        type: 'string',
        name: 'idea-details',
        description: 'Copy and paste the idea details',
        required: true
      },
      {
        type: 'string',
        name: 'reason-given',
        description: 'Copy and paste the reason given details',
        required: false
      }
    ]
  },
  leaderboard: {
    name: 'leaderboard',
    description: 'The link to find our leaderboard!',
    options: []
  },
  pilotsRole: {
    name: 'pilots-role',
    description: 'Assigns all members the Pilots role :)',
    options: []
  },
  poll: {
    name: 'pilots-role',
    description: 'Assigns all members the Pilots role :)',
    options: [
      {
        type: 'string',
        name: 'question',
        required: true,
        description: 'What is your question?'
      },
      {
        type: 'string',
        name: 'answer_a',
        description: 'another possible answer',
        required: true
      },
      {
        type: 'string',
        name: 'answer_b',
        description: 'another possible answer',
        required: true
      },
      {
        type: 'string',
        name: 'answer_c',
        description: 'another possible answer',
        required: false
      },
      {
        type: 'string',
        name: 'answer_d',
        description: 'another possible answer',
        required: false
      },
      {
        type: 'string',
        name: 'answer_e',
        description: 'another possible answer',
        required: false
      }
    ]
  },
  report: {
    name: 'report',
    description: 'Use this command to report a user.',
    options: [
      {
        type: 'string',
        name: 'user',
        required: true,
        description: 'who is the user that you would like to report?'
      },
      {
        type: 'string',
        name: 'reason',
        description: 'What happened with this user',
        required: true
      },
      {
        type: 'string',
        name: 'screenshot',
        description: 'a link to screenshot proof (if applicable)',
        required: true
      }
    ]
  },
  dadJoke: {
    name: 'dad-joke',
    description: 'Tells you a dad joke!',
    options: []
  },
  ping: {
    name: 'ping',
    description: 'Replies with Pong!',
    options: []
  },
  memberCount: {
    name: 'membercount',
    description: 'Replies with the Member Count!',
    options: []
  },
  nextFlight: {
    name: 'next-flight',
    description: 'The link to find out our next flight!',
    options: []
  },
  serverCommands: {
    name: 'server-commands',
    description: 'The link to get a list of server commands_list!',
    options: []
  },
  top5: {
    name: 'top5',
    description: 'Posts the leaderboard top 5 members!',
    options: []
  },
  giveaway: {
    name: 'giveaway',
    description: 'Picks a random user with giveaway role.',
    options: []
  },
  perksGiveaway: {
    name: 'perks-giveaway',
    description: 'Picks random user with company perks role(s)',
    options: []
  },
  resetGiveaway: {
    name: 'reset-giveaway',
    description: 'Reset the giveaway by removing reactions and role',
    options: []
  },
  trainingRequest: {
    name: 'training-request',
    description: 'Use this command if you would like to request training!',
    options: []
  },
  training: {
    name: 'training-faq',
    description: 'Replies with information about training!',
    options: []
  },
  airport: {
    name: 'airport',
    description: 'Gives information about a specific airport',
    options: [
      {
        type: 'string',
        name: 'icao',
        required: true,
        description: 'What is the ICAO of the Airport?'
      }
    ]
  },
  charts: {
    name: 'charts',
    description: 'Gives information about a specific airport',
    options: [
      {
        type: 'string',
        name: 'icao',
        required: true,
        description: 'What is the ICAO of the Airport?'
      }
    ]
  },
  metar: {
    name: 'metar',
    description: 'Gives information about a specific airport',
    options: [
      {
        type: 'string',
        name: 'icao',
        required: true,
        description: 'What is the ICAO of the Airport?'
      }
    ]
  },
  taf: {
    name: 'taf',
    description: 'Gives information about a specific airport',
    options: [
      {
        type: 'string',
        name: 'icao',
        required: true,
        description: 'What is the ICAO of the Airport?'
      }
    ]
  },
  hours: {
    name: 'hours',
    description: 'See how many hours you have on the network!',
    options: []
  },
  online: {
    name: 'get-online-members',
    description: 'Gets the members who are online',
    options: []
  },
  sync: {
    name: 'sync',
    description: 'Sync your VATSIM Ratings for TPC!',
    options: []
  }
}

export default commands_list
