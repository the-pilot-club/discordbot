import {ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder} from "discord.js";

export function bumpWars(message) {
    return message.reply('**[BUMP WARS:](<discord://-/channels/830201397974663229/958549204073087086>)** \n \n' +
        '__Team 1: Hot Dogs__\n\n- Dylan | TPC1496 | DELA\n- Rich P | N7RP\n- Chris | TPC139 | ZNY' +
        '\n\n__Team 2: Big Guns__\n\n- Serge | TPC6\n- Caleb Y | TPC452\n- Kelvin | TPC1992 | SBxx' +
        ' \n \n__Rules:__ \n' +
        '1: type `/bump` to bump the server on Disboard \n' +
        '2: Bumps are only possible once every 2 hours \n' +
        "3: If your bump is successful you must post the current score under your bump. Others can forfeit the point (nobody gets a point) if you don't post it until next bump. \n" +
        '4: Have fun! \n' +
        '5: This war starts on 11/02 0400z (00:00 ET) and ends on 12/01 0359z (11/30 23:59 ET) \n' +
        '\nImportant info: \n' +
        '*If there are more than one bump at a time, only those claimed will be valid, no matter how many there are. \n' +
        '*The team with the most bumps under their belt at the end of the month wins! \n' +
        '*Winning team members get 1000 TPC points and a shout-out during next town-hall \n' +
        '\nWhy are we doing this? \nBumping this server often helps to keep us at the top of the server list on Disboard.' +
        ' It gives our community a chance to grow and allows you to be involved in the process. Have fun!')
}

export function fno(message) {
    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('Friday Night Operations Information')
                .setURL('https://docs.google.com/document/d/1n2dorXXbRavCci0FqYMMDQngrYqnn3UXNDAiK95Kc98/')
                .setStyle(ButtonStyle.Link)
        )
    return message.reply({
        content: 'FNO Stands for Friday Night Ops. You can find more information here!',
        components: [row]
    })
}

export function inviteLink (message) {
    return message.reply('Please use this link when inviting somebody to the server: https://thepilotclub.org')
}

export function joinVatsim (message){
    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('Joining VATSIM')
                .setURL('https://www.thepilotclub.org/resources#VATSIM')
                .setStyle(ButtonStyle.Link)
        )
    return message.reply({
        content: 'To Join VATSIM you should go to this website and click register!',
        components: [row]
    })
}

export function moderatorContent (message) {
    return message.reply(' A <@&849037973064384514> has been notified!')
}

export function msfsHelp (message) {
    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('Microsoft Flight Simulator 2020 FAQ')
                .setURL('https://www.reddit.com/r/flightsim/wiki/msfsfaq')
                .setStyle(ButtonStyle.Link)
        )
    return message.reply({ content: 'Check out MSFS2020 FAQ!', components: [row] })
}

export function rulesContent (message) {
    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('The Pilot Club Rules')
                .setURL('https://discord.com/channels/830201397974663229/833198809701679124/848232804282138644')
                .setStyle(ButtonStyle.Link)
        )
    return message.reply({ content: 'You can find the club rules here!', components: [row] })
}

export function whatServer(message) {
    return message.reply('We do not use the default Microsoft Flight Simulator 2020 Multiplayer Server here in The Pilot Club. We use VATSIM for all of our group flights!\n \n' +
        'VATSIM is the Virtual Air Traffic Simulation network, connecting people from around the world flying online or acting as virtual Air Traffic Controllers. ' +
        '\n \nThis completely free network allows aviation enthusiasts the ultimate experience. Air Traffic Control (ATC) is available in our communities throughout the world, operating as close as possible to the real-life procedures and utilizing real-life weather, airport and route data. ' +
        '\n \nOn VATSIM you can join people on the other side of the planet to fly and control, with nothing more than a home computer! If you would like more information, please go to https://vatsim.net')

}

export function supportContent (message) {
    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('The Pilot Club Support')
                .setURL('https://support.thepilotclub.org/open.php')
                .setStyle(ButtonStyle.Link)
        )
    return message.reply({
        content: 'To get support or submit feedback, click the button below! Thank you for being a valued member of The Pilot Club!!',
        components: [row]
    })
}

export function thanksTpc(message) {
    const embed = new EmbedBuilder()
        .setAuthor({
            name: 'The Pilot Club',
            iconURL: 'https://static1.squarespace.com/static/614689d3918044012d2ac1b4/t/616ff36761fabc72642806e3/1634726781251/TPC_FullColor_TransparentBg_1280x1024_72dpi.png'
        })
        .setColor('#37B6FF')
        .setDescription('You\'re welcome! Anytime!')
    return message.reply({ embeds: [embed] })
}

export function tpcCallsign(message) {
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
    return message.reply({ embeds: [embed], components: [row] })
}

export function tpcLivery(message) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('TPC Liveries')
                    .setURL('https://thepilotclub.org/sop#liveries')
                    .setStyle(ButtonStyle.Link)
            )
        return message.reply({ content: 'Club liveries can be downloaded here:', components: [row] })
}

export function whatIsVatsimContent (message) {
    return message.reply('VATSIM is the Virtual Air Traffic Simulation network, connecting people from around the world flying online or acting as virtual Air Traffic Controllers.\n \n' +
        'This completely free network allows aviation enthusiasts the ultimate experience.' +
        'Air Traffic Control (ATC) is available in our communities throughout the world, operating as close as possible to the real-life procedures and utilizing real-life weather, airport and route data.' +
        ' \n \nOn VATSIM you can join people on the other side of the planet to fly and control, with nothing more than a home computer! If you would like more information, please go to https://www.thepilotclub.org/resources#VATSIM')

}

export function worldTour (message) {
    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('Get the World Tour Role')
                .setURL('https://discord.com/channels/830201397974663229/833198809701679124/848245312815497237')
                .setStyle(ButtonStyle.Link)
        )
    return message.reply({
        content: 'Want to join the World Tour Flight? Proceed to this message and click the World Tour Logo!',
        components: [row]
    })
}