const Discord = require('discord.js');
const config = require("../settings.json");
exports.run = (client, message, args) => {
	var m = args.join(' ');
	message.delete();
	if (!message.author.id === config.ownerid) return message.channel.send("no");
//	if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply("❌**Error:** You don't have  **MANAGE GUILD** permission!");
	if (!m) return message.reply('Need an image URL for the embed...');
	const embed = new Discord.MessageEmbed()
		.setImage(m + "?size=2048")
		.setTimestamp()
		.setColor([114, 137, 218])
		.setFooter(message.author.tag)
	message.channel.send({ embed });
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 2
};

exports.help = {
	name: 'test',
	category: 'Miscelaneous',
	description: 'Embeds something',
	usage: 'embed [description]'
};
