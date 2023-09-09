import { sendNewAnswer, sendNewQuestion, updateQuestion } from './cronUtils.js'

export default [
  {
    schedule: '0 23 * * 2',
    name: 'ga-tuesday',
    ping: '<@&937389346204557342> <@&898240224189120532>'
  },
  {
    schedule: '0 23 22-28 * 3',
    name: 'bush-wednesday',
    ping: '<@&937389346204557342> <@&898240224189120532>'
  },
  {
    schedule: '0 23 8-14 * 6',
    name: 'challenge-flight',
    ping: '<@&937389346204557342>'
  },
  {
    schedule: '0 23 * * 4',
    name: 'sbr-tpc-fly-in-thursday',
    ping: '<@&937389346204557342>'
  },
  {
    schedule: '0 18 * * 0',
    name: 'sunday-funday',
    ping: '<@&937389346204557342>'
  },
  {
    name: 'sendNewAnswer',
    schedule: '* * * * *',
    customFunction: sendNewAnswer
  },
  // {
  //   name: 'updateQuestion',
  //   schedule: '0 58 12 * * *',
  //   customFunction: updateQuestion
  // },
  {
    name: 'sendNewQuestion',
    schedule: '0 00 13 * * *',
    customFunction: sendNewQuestion
  }
]
