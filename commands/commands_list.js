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
  }
}

export default commands_list
