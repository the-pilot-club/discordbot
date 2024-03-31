import airportCommand from './util/airport.js'
import chartersBookingCommand from './charters/charters-aircraft-booking.js'
import chartersRequestCommand from './charters/charters-aircraft-request.js'
import chartsCommand from './util/charts.js'
import dadJokeCommand from './fun/dadjoke.js'
import deniedArchiveCommand from './admin/denied-archive.js'
import ferryCommand from './charters/ferry.js'
import giveawayCommand from './giveaway/giveaway.js'
import hoursCommand from './vatsim/hours.js'
import ideaArchiveCommand from './admin/idea-archive.js'
import joinChartersCommand from './charters/charters-join.js'
import leaderboardCommand from './general/leaderboard.js'
import memberCountCommand from './general/membercount.js'
import metarCommand from './util/metar.js'
import nextFlightCommand from './general/next-flight.js'
import onlineCommand from './vatsim/online.js'
import perksGiveawayCommand from './giveaway/perks-giveaway.js'
import pingCommand from './fun/ping.js'
import pollCommand from './admin/poll.js'
import reportCommand from './admin/report.js'
import resetGiveawayCommand from './giveaway/reset-giveaway.js'
import helpCommand from './general/server-commands.js'
import syncCommand from './vatsim/sync.js'
import tafCommand from './util/taf.js'
import top5Command from './general/top5.js'
import trainingCommand from './training/training.js'
import trainingRequestCommand from './training/training-request.js'
import fcplinkCommand from "./fcp/fcplink.js";
import getCallsignCommand from "./fcp/getcallsign.js"
import userInfoCommand from "./fcp/userinfo.js"
import { Collection } from 'discord.js'

/**
 * @typedef {Object} Command
 * @property {Omit<import("discord.js").SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">} data
 * @property {function(any): Promise<void>} execute
 */

/**
 * @type {Object<string, Command>} CommandsList
 */
export const commands = {
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
    pingCommand,
    pollCommand,
    reportCommand,
    resetGiveawayCommand,
    helpCommand,
    syncCommand,
    tafCommand,
    top5Command,
    trainingCommand,
    trainingRequestCommand,
    fcplinkCommand,
    getCallsignCommand,
    userInfoCommand
}

export const allCommands = new Collection(Object.keys(commands).map(key => [commands[key].data.name, commands[key]]))
export const list = Object.keys(commands).map(key => [commands[key]])