require('dotenv').config();	// Load .env
const fs = require('fs');
const { Collection, Client } = require('discord.js');

const client = new Client();	// Make a discord bot client
client.commands = new Collection();		// Making client.commands as a Discord.js Collection
client.queue = new Map();

client.config = {
	prefix: process.env.PREFIX,
};

// Loading Events
fs.readdir(__dirname + '/events/', (err, files) => {
	if (err) return console.error(err);
	files.forEach((file) => {
		const event = require(__dirname + `/events/${file}`);
		const eventName = file.split('.')[0];
		client.on(eventName, event.bind(null, client));
		console.log('Carregando: '+eventName);
	});
});

// Loading Commands
fs.readdir('./commands/', (err, files) => {
	if (err) return console.error(err);
	files.forEach((file) => {
		if (!file.endsWith('.js')) return;
		const props = require(`./commands/${file}`);
		const commandName = file.split('.')[0];
		client.commands.set(commandName, props);
		console.log('Loading Command: '+commandName);
	});
});

// Logging in to discord
client.login(process.env.TOKEN);
