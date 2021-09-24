module.exports = async (client) => {
	console.log(`[API] Logged in as ${client.user.username}`);
	console.log(`Bot Online em ${client.guilds.cache.size} servidores`);

	setInterval(() => client.user.setActivity(`${process.env.PREFIX}help para ver comandos`, {type: 'LISTENING'}), 5000);
	// can be LISTENING, WATCHING, PLAYING, STREAMING
};
