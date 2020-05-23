const Discord = require('discord.js');
const fs = require('fs');
const getImages = require('../util/getImages');
const Time = require('../util/Time');
const send = require('../util/send');

module.exports = async guildMember => {
  const time = new Time(guildMember.user.createdAt);
  const editEmbed = new Discord.MessageEmbed()
    .setTitle(guildMember.user.tag + ` Has joined`)
    .setThumbnail(guildMember.user.avatarURL())
    .setDescription(`Account created: ${time.toLocaleString()}`)
    .setFooter(guildMember.user.id)
var log = JSON.parse(fs.readFileSync('./data/logging.json', 'utf8'));
let logsetting = JSON.parse(fs.readFileSync('./data/logonoff.json', 'utf8'));

if(!logsetting[guildMember.guild.id]){
  logsetting[guildMember.guild.id] = {
    checker: 1
  };
}
  if(!log[guildMember.guild.id]) return;
  let values = logsetting[guildMember.guild.id].checker

  if(values === undefined) return;
  if(values === 0) return;
  if(values === 1) {
    var log = JSON.parse(fs.readFileSync('./data/logging.json', 'utf8'))
    if(!log) return;
    let channel = guildMember.guild.channels.cache.get(`${log[guildMember.guild.id].channel}`);
    if(!channel) return;
    channel.send(editEmbed);
  }
};
