module.exports = {
  name: 'messageCreate',
  once: false,
  execute (message) {
    if (message.content.includes('what server')) {
      message.reply('We do not use the default Microsoft Flight Simulator 2020 Multiplayer Server here in The Pilot Club. We use VATSIM for all of our group flights!\n \n' +
                'VATSIM is the Virtual Air Traffic Simulation network, connecting people from around the world flying online or acting as virtual Air Traffic Controllers. ' +
                '\n \nThis completely free network allows aviation enthusiasts the ultimate experience. Air Traffic Control (ATC) is available in our communities throughout the world, operating as close as possible to the real-life procedures and utilizing real-life weather, airport and route data. ' +
                '\n \nOn VATSIM you can join people on the other side of the planet to fly and control, with nothing more than a home computer! If you would like more information, please go to https://vatsim.net')
    }
  }
}
