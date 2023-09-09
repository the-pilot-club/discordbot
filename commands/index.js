import airportCommand from './airport.js'
import chartersBookingCommand from './charters-aircraft-booking.js'
import chartersRequestCommand from './charters-aircraft-request.js'
import chartsCommand from './charts.js'
import dadJokeCommand from './dadjoke.js'
import deniedArchiveCommand from './denied-archive.js'
import ferryCommand from './ferry.js'
import giveawayCommand from './giveaway.js'
import hoursCommand from './hours.js'
import ideaArchiveCommand from './idea-archive.js'
import joinChartersCommand from './join-charters.js'
import leaderboardCommand from './leaderboard.js'
import memberCountCommand from './membercount.js'
import metarCommand from './metar.js'
import nextFlightCommand from './next-flight.js'
import onlineCommand from './online.js'
import perksGiveawayCommand from './perks-giveaway.js'
import pilotsRoleCommand from './pilots_role.js'
import pingCommand from './ping.js'
import pollCommand from './poll.js'
import reportCommand from './report.js'
import resetGiveawayCommand from './reset-giveaway.js'
import helpCommand from './server-commands.js'
import syncCommand from './sync.js'
import tafCommand from './taf.js'
import top5Command from './top5.js'
import trainingCommand from './training.js'
import trainingRequestCommand from './training-request.js'
import { Collection } from 'discord.js'

/**
 * @typedef {Object} Command
 * @property {Omit<import("discord.js").SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">} data
 * @property {function(any): Promise<void>} execute
 */

/**
 * @type {Object<string, Command>} CommandsList
*/
const commands = {
  airportCommand,
  chartersBookingCommand,
  chartersRequestCommand,
  chartsCommand,
  dadJokeCommand,
  deniedArchiveCommand,
  ferryCommand,
  giveawayCommand,
  hoursCommand,
  ideaArchiveCommand,
  joinChartersCommand,
  leaderboardCommand,
  memberCountCommand,
  metarCommand,
  nextFlightCommand,
  onlineCommand,
  perksGiveawayCommand,
  pilotsRoleCommand,
  pingCommand,
  pollCommand,
  reportCommand,
  resetGiveawayCommand,
  helpCommand,
  syncCommand,
  tafCommand,
  top5Command,
  trainingCommand,
  trainingRequestCommand
}

const allCommands = new Collection(new Array(Object.keys(commands).map(key => [key, commands[key]])))

export default allCommands
