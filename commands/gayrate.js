const Discord = require('discord.js');

exports.run = (client, message, args) => {
let random = Math.floor(Math.random() * 100) + 1;
  let user = message.mentions.users.first() || message.author
        message.delete();
	if (!user) return message.channel.send("Please mention a user!")
	const embed = new Discord.MessageEmbed()
		.setDescription(`:gay_pride_flag: ${user} is ${random}% gay`)
		.setColor([114, 137, 218]);
	message.channel.send({ embed });
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 2
};

exports.help = {
	name: 'gayrate',
	category: 'Miscelaneous',
	description: 'Fun command',
	usage: 'gayrate <user>'
};
