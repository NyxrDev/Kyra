const Discord = require("discord.js");
const customisation = require('../customisation.json');
const mongoose = require('mongoose');

exports.run = async (client, message, args) => {
  const Coins = require('../models/coins.js');
  let user = message.mentions.users.first() || message.author
  if (user.bot) return message.channel.send("Pfft, Bots dont have money...");
  if (!user) user = message.author;
Coins.findOne({
  userID: user.id
}, (err, coins) => {
  if (err) console.error(err);
  if (!coins) {
    return message.channel.send("This user has no coins on record.")
  }else{
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setThumbnail(user.avatarURL())
    .addField(`Balance`,`${user} has ${coins.coins} coins!`)
    .setTimestamp()
    message.channel.send({embed})
  }

})
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["bal", "balance", "money"],
    permLevel: 0
  };
exports.help = {
    name: 'coins',
    description: 'Check a user\'s coins.',
    usage: 'coins'
  };
  
