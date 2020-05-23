const discord = require("discord.js");
const fs = require("fs")

module.exports.run = async (client,message,args) => {
	
	let config = JSON.parse(fs.readFileSync("./config.json", "utf8"));
	
	if(message.author.id === "523579776749928449") {
		message.channel.send("Are you sure you want to restart\?")
		const collector = new discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 5000 })
		collector.on('collect', message => { 
		if (message.content === "no") { 
		message.channel.send("Okay, restart aborted\!")
		} 
		else if (message.content === "yes") { 
		message.channel.send("restarting.....")
		client.destroy()
		client.login(config.token)
	 }
	 })
	} 
	else message.channel.send("You are not permitted to do this!")
	}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0
};
exports.help = {
	name: 'restart',
	description: 'yuri nsfw',
	usage: 'yuri'
};

