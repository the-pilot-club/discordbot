import ferryRequestSubmitEvent from './ferry request submit.js'
import fno from './fno.js'
import inviteLink1 from './invite-link1.js'
import inviteLink2 from './invite-link2.js'
import joinVatsim from './join-vatsim.js'
import joinCharters from './joinchrtssubmit.js'
import moderator from './moderator.js'
import msfs2020Help from './msfs2020-help.js'
import ready from './ready.js'
import roles from './roles.js'
import rules from './rules.js'
import server from './server.js'
import support from './support.js'
import thanks from './thanks.js'
import tpcCallsign from './tpc-callsign.js'
import tpclivery from './tpclivery.js'
import trainrequestsubmit from './trainrequestsubmit.js'
import vatsim from './vatsim.js'
import worldTour from './world-tour.js'
import interaction from './interaction.js'

/**
 * @typedef {Object} DiscordEvent
 * @property {string} name
 * @property {boolean} once
 * @property {function(any): void} execute
 */

/**
 * @type {Object<string, DiscordEvent>} EventList
 */

const events = {
  worldTour,
  trainrequestsubmit,
  tpclivery,
  vatsim,
  tpcCallsign,
  thanks,
  support,
  server,
  rules,
  roles,
  ready,
  msfs2020Help,
  moderator,
  joinCharters,
  joinVatsim,
  inviteLink1,
  inviteLink2,
  fno,
  ferryRequestSubmitEvent,
  interaction
}

export default events
