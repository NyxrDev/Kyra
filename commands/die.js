const Discord = require('discord.js');
exports.run = (client, message, args) => {
    message.delete()
    if (!message.author.id === "523579776749928449") return message.channel.send("Okie Dokie! *dramatically dies*");
      else { client.channels.get("695377297771069440").setName("Status: OFFLINE")
                client.destroy() }
};
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 2
};

exports.help = {
	name: 'die',
	category: 'Miscelaneous',
	description: 'does something?',
	usage: 'die'
};
