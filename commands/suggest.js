const Discord = require('discord.js');

exports.run = async (client, message, args) => {
	if(!args[0]) {
		message.channel.send("cannot submit empty feedback")
	}
	else{
	var channels = client.channels.get("695102467951558686");
	var suggestion = args.slice().join(" ");
	const embed = new Discord.MessageEmbed()
	.setTitle("new suggestion")
	.addField(`Suggestion:`, suggestion)
	.setColor("#000cba")
	.setFooter(`submitted by ${message.author.tag} ( ${message.author.id} )`)
	.setThumbnail(message.author.displayAvatarURL)
	channels.send(embed).then(sentEmbed => {
	    sentEmbed.react("680992921511657476")
	    sentEmbed.react("680992921469976596")
	})
	message.channel.send("thank you for submitting your feedback/suggestion we will read over it");
	}
}
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0
};
	  
exports.help = {
	name: 'suggest',
	description: 'Suggest something new',
	usage: 'suggest [suggestion]'
};
