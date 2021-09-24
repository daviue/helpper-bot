const { MessageEmbed } = require('discord.js');

module.exports = {
	info: {
		name: 'help',
		description: 'Mostrar comandos',
		usage: '[command]',
		aliases: ['commands', 'comandos', 'ajuda', 'menu'],
	},

	run: async function(client, message, args) {
		let allcmds = '';

		client.commands.forEach(cmd => {
			const cmdinfo = cmd.info;
			allcmds+='``'+client.config.prefix+cmdinfo.name+' '+cmdinfo.usage+'`` ~ '+cmdinfo.description+'\n';
		});

		const embed = new MessageEmbed()
			.setAuthor(`Commands of ${client.user.username}:`)
			.setColor('BLUE')
			.setDescription(allcmds)
			.setFooter(`Mais informações de cada comando usando ${client.config.prefix}help [command]`);

		if (!args[0]) return message.channel.send(embed);
		else {
			const cmd = args[0];
			let command = client.commands.get(cmd);
			const commandinfo = new MessageEmbed()
				.setTitle('Command: '+command.info.name+' info')
				.setColor('YELLOW')
				.setDescription(`
					Nome: ${command.info.name}
					Descrição: ${command.info.description}
					Uso: \`\`${client.config.prefix}${command.info.name} ${command.info.usage}\`\`
					Similares: ${command.info.aliases.join(', ')}
				`);

			if (!command)command = client.commands.find(x => x.info.aliases.includes(cmd));
			if (!command) return message.channel.send('Unknown Command');

			message.channel.send(commandinfo);
		}
	},
};
