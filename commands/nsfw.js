const Discord = require('discord.js')
const help = require('../data/helpMsgs.json');
const footers = require('../data/footers.json');
;
const fs = require('fs')

exports.run = (client, message, args) => {
  message.delete();
  if(!message.channel.nsfw) return message.channel.send("This only works in NSFW channels!");
  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .addField('NSFW', "ass, boobjob, boobs", true)
  .addField('NSFW', "fuck, furry", true)
  .addField('NSFW', "snapchat, pussy", true)
  .setFooter(`${footers[Math.floor(Math.random() * footers.length)]}`);
  message.channel.send({embed})
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
exports.help = {
    name: 'cmds_nsfw',
    description: 'Displays all the available nsfw commands for your permission level.',
    usage: 'cmds_nsfw'
  };


