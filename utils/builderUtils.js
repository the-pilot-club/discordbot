import { SlashCommandBuilder, SlashCommandStringOption } from 'discord.js'
import { sendErrorToSentry } from '../utils.js'

const validationErrors = {
  requiredPropNotDefined: (propName, name) => {
    return `required property ${propName} is not defined or is null for command name: ${name}`
  },
  unsupportedOptionTypeFound: (type, name) => {
    return `unsupported option type ${type} found in the options for ${name}`
  }
}

const isUndefinedOrNull = (val) => val === undefined || val === null

/** @param {CommandInfo} commandOptions */
export function buildNewSlashCommandFromOptions (commandOptions) {
  try {
    validateCommandOptions(commandOptions)
    const builder = new SlashCommandBuilder()
    builder.setName(commandOptions.name)
    builder.setDescription(commandOptions.description)

    for (const optionInfo of commandOptions.options) {
      addNewCommandOption(builder, optionInfo)
    }

    return builder
  } catch (error) {
    sendErrorToSentry(error, 'buildNewSlaWshCommandFromOptions')
  }
}

/** @param {import('discord.js').SlashCommandBuilder} builder
 * @param {CommandOption} optionInfo
 */
const addNewCommandOption = (builder, optionInfo) => {
  const option = new SlashCommandStringOption()
  option.setName(optionInfo.name)
  option.setDescription(optionInfo.description)
  option.setRequired(optionInfo.required)
  builder.addStringOption(option)
}

/** @param {CommandInfo} commandInfo */
const validateCommandOptions = (commandInfo) => {
  if (commandInfo === undefined) {
    throw new Error('command options passed for validation are undefined. Did you forget add the command to the command list?')
  }

  const requiredProperties = [
    'name',
    'description',
    'options'
  ]

  for (const property in requiredProperties) {
    if (isUndefinedOrNull(commandInfo[property])) {
      throw new Error(validationErrors.requiredPropNotDefined(property, commandInfo.name))
    }
  }

  const requiredOptionProperties = [
    'type',
    'name',
    'description',
    'required'
  ]

  for (const option of commandInfo.options) {
    for (const property in requiredOptionProperties) {
      if (isUndefinedOrNull(option[property])) {
        throw new Error(validationErrors.requiredPropNotDefined(`option.${property}`, commandInfo.name))
      }
    }

    const supportedOptionTypes = new Set('string')

    if (!supportedOptionTypes.has(option.type)) {
      throw new Error(validationErrors.unsupportedOptionTypeFound(option.type, commandInfo.name))
    }
  }
}
