const Discord = require("discord.js");
const customisation = require('../customisation.json');
const mongoose = require('mongoose');
const Levels = require("discord-xp");
exports.run = async (client, message, args) => {
const user = message.mentions.users.first() || message.author; // Grab the target.
const target = message.mentions.users.first() || message.author; // Grab the target.
const level = await Levels.fetch(target.id, message.guild.id); // Selects the target from the database.

if (!level) return message.channel.send("Seems like this user has not earned any xp so far."); // If there isnt such user in the database, we send a message in general.
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setThumbnail(user.avatarURL())
    .addField(`Current Level:`,`${target.tag} is level ${level.level}`)
    .setTimestamp()
    message.channel.send({embed})
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["lvl", "rank"],
    permLevel: 0
  };
exports.help = {
    name: 'level',
    description: 'Check a user\'s level',
    usage: 'level',
  };

