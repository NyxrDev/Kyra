const Discord = require("discord.js");
module.exports.run = async (client,message,args) => {
        if (message.mentions.users.first().id === message.author.id) return message.channel.send("Self lovin's is good, but this? Wierd...");
	let yes = ["396241937658675206", "242263403001937920", "523579776749928449", "550842363719843840"]
        if (yes.includes(message.author.id) === false) return message.channel.send(`${message.author.username} has attempted to rape ${message.mentions.users.first().username}, but was unsuccessful and the FBI has arrived`);
	const e = new Discord.MessageEmbed()
	.setColor("RANDOM")
	.addField(`;)`,`**${message.author.username}** has successfully raped **${message.mentions.users.first().username}**`)
	.setFooter(`Want your own custom command? "}donate"`)
	message.channel.send(e)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: "rape",
    description: "Why would you want to do this?",
    usage: "rape [arg1]"
};
