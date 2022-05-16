module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Logged in as ${client.user.tag}`);
        client.user.setActivity('Seattle Center on 135.450' , {type: "LISTENING"})
	},
};