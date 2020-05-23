const Discord = require('discord.js');
const fs = require('fs');
const getImages = require('../util/getImages');
const Time = require('../util/Time');
const send = require('../util/send');

module.exports = async message => {
  const editEmbed = new Discord.MessageEmbed()
    .setTitle(message.guild.member.tag + ` Has left`)
    .setThumbnail(message.guild.member.avatarURL())
    .setFooter(message.guild.member.id)
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
    let channel = message.guild.id.channels.cache.get(`${log[message.guild.id].channel}`);
    if(!channel) return;
    channel.send(editEmbed);
  }
};
