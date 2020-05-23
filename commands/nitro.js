const Discord = require('discord.js');
exports.run = (client, message, args) => {
	const embed = new Discord.MessageEmbed()
	.setDescription("**Here's the `Nitro`** <a:ANitro:694059397911150612>")
	.setImage("https://i.redd.it/xedy9ugkqo621.png")
	.setColor([114, 137, 218])
	message.channel.send("Generating your nitro gift!").then(
	sentMessage => {
          setTimeout(() => {
		sentMessage.edit(embed)	}, 5000);
	})

};
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0
};

exports.help = {
	name: 'nitro',
	category: 'Miscelaneous',
	description: 'Nitro ;)',
	usage: 'nitro'
};
