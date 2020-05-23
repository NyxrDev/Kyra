const Discord = require('discord.js');
const Levels = require("discord-xp");

exports.run = async (client, message, args) => {
const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10);
if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");
const leaderboard = Levels.computeLeaderboard(client, rawLeaderboard); // We process the leaderboard

const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`); // We map the outputs.
const lbe = new Discord.MessageEmbed()
	.setTitle("Top Leveled Users in This guild:")
        .setColor("RED")
        .setTimestamp()
	.setThumbnail(message.guild.iconURL())
        .addField("TOP 10", `\`${lb.join("\n")}\``)
	.setFooter("Niceee...")
	message.channel.send(lbe);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ["xplb"],
	permLevel: 2
};

exports.help = {
	name: 'xpleaderboard',
	category: 'Miscelaneous',
	description: 'Embeds something',
	usage: 'xpleaderboard [description]'
};
