const Discord = require('discord.js');
const fs = require('fs');
const { embed_color } = require('../config.json');
const getImages = require('../util/getImages');
const Time = require('../util/Time');
const send = require('../util/send');

module.exports = message => {
    if (message.author.bot) return;
    let editEmbed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag} | Deleted message`, message.author.displayAvatarURL())
    .setDescription(`
**Message Deleted in ${message.channel.toString()}**
**Message Content:**\n\n${message.content}

`)
    .setImage(`${getImages(message)}`)
    .setFooter(`ID: ${message.id}`)
    .setColor(embed_color).setTimestamp()

var log = JSON.parse(fs.readFileSync('./data/logging.json', 'utf8'));
let logsetting = JSON.parse(fs.readFileSync('./data/logonoff.json', 'utf8'));

if(!logsetting[message.guild.id]){
  logsetting[message.guild.id] = {
    checker: 1
  };
}
  if(!log[message.guild.id]) return;
  let values = logsetting[message.guild.id].checker

  if(values === undefined) return;
  if(values === 0) return;
  if(values === 1) {
    var log = JSON.parse(fs.readFileSync('./data/logging.json', 'utf8'))
    if(!log) return;
    let channel = message.guild.channels.cache.get(`${log[message.guild.id].channel}`);
    if(!channel) return;
    channel.send(editEmbed);
  }
};
