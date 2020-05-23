const Discord = require("discord.js");

module.exports.run = async (client,message,args) => {
        var say = message.content.substring(9).replace(" ", "+").replace("#", "%23");
        const out = `https://api.alexflipnote.dev/achievement?text=${say}`
	const e = new Discord.MessageEmbed()
	.setColor("RANDOM")
	.setImage(out.replace(" ", "+").replace("#", "%23"))
	message.channel.send(e)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: "achieve",
    description: "Makes the bot repeat your message.",
    usage: "say [arg1] [arg2]"
};