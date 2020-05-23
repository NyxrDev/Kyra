const Discord = require('discord.js');
exports.run = (client, message, args) => {
	const embed = new Discord.MessageEmbed()
		.setDescription('List of all the main commands you need in order to use the radio!')
		.addField('radiostations', 'list all the available radio stations')
		.addField('radio','play a desired station from `radiostations`')
		.addField('stopradio','Stop radio playback (Or you can leave channel also)')
		.setColor([114, 137, 218]);
	message.channel.send({ embed });
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['cmds-r'],
	permLevel: 0
};

exports.help = {
	name: 'cmds_radio',
	category: 'Miscelaneous',
	description: 'Radio realated commands!',
	usage: 'cmds_radio'
};
