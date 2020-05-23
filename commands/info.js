const Discord = require('discord.js');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	var time = Date.now();

	const embed = new Discord.MessageEmbed()
		.setColor('BLUE')
		.setTitle('Bot Info')
		.setThumbnail(client.user.avatarURL())
		.addField(`Discord.js Version`, `v${Discord.version}`, true)
		.addField(`Node Version`, `${process.version}`, true)
		.addField(`Bot Version`, `6.13`, true)
		.addField("Guilds", client.guilds.cache.size, true)
		.addField("Users", client.users.cache.size, true)
		.addField("Commands", client.commands.size, true)
		.setDescription(`This is a modified version of the opensource and amazing [Cryptonix X](https://github.com/HarutoHiroki/Discord.js-Bot)\n\nRun the k/help command for module list.`)
		.setFooter(`Time taken: ${Date.now() - time}ms`);
	message.channel.send({ embed });

};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0
};

exports.help = {
	name: 'info',
	category: 'System',
	description: 'Provides some bot info',
	usage: 'info'
};
