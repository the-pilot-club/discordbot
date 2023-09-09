import { guildConstants } from './bot.js'
import { sendErrorToSentry } from './utils.js'
import eventsCrons from './eventsCrons.js'
import { schedule } from 'node-cron'

export function sendNewAnswer (channel) {
  fetch(process.env.API_URL)
    .then(response => response.json())
    .then(json => {
      switch (json.correctAnswer) {
        case 'A':
          channel.send(`${guildConstants.TRAINING_ONE_EMOJI} The correct answer is 🇦 ${json.optionA}`)
          break

        case 'B':
          channel.send(`${guildConstants.TRAINING_ONE_EMOJI} The correct answer is 🇧 ${json.optionB}`)
          break
        case 'C':
          channel.send(`${guildConstants.TRAINING_ONE_EMOJI} The correct answer is 🇨 ${json.optionC}`)
          break
      }
    })
}

export function sendNewQuestion (channel) {
  fetch(process.env.API_URL)
    .then(response => response.json())
    .then(json => {
      channel.send(`${guildConstants.TRAINING_ONE_EMOJI} ${json.question}\n\n🇦 ${json.optionA}\n🇧 ${json.optionB}\n🇨 ${json.optionC}`)
        .then(message => {
          message.react('🇦')
          message.react('🇧')
          message.react('🇨')
        })
    })
}

export function updateQuestion () {
  fetch(process.env.NEW_QUESTION_URL)
    .then(response => {
      if (response.type === 'error') {
        throw Error(`error retrieving question: ${response.error()}`)
      } else {
        response.json()
      }
    })
    .then(json => {
      console.log(json)
    })
    .catch(error => sendErrorToSentry(error))
}

export function scheduleGroupFlightEventCrons (eventCrons, channel) {
  for (const event of eventsCrons) {
    if (event.customFunction === undefined) {
      schedule(event.schedule, function () {
        sendNewEvent(channel, event.name, event.ping)
      })
    }
  }
}

export function scheduleQuizEventCrons (eventCrons, channel) {
  for (const event of eventsCrons) {
    if (event.customFunction !== undefined) {
      schedule(event.schedule, function () {
        event.customFunction(channel)
      })
    }
  }
}

function sendNewEvent (channel, flight, ping) {
  channel.send({
    content: ping + ` One hour until the flight briefing. Head to the airport soon to start setting up! See you there! https://www.thepilotclub.org/dispatch/${flight}-${new Date().toLocaleDateString('en-GB').replaceAll('/', '')}`,
    files: [{ attachment: `./pics/${flight}.png`, name: 'file.png' }]
  })
}
