const Discord = require('discord.js');
const fs = require('fs');
const AuditLogEmbedBuilder = require('../util/AuditLogEmbedBuilder');
const send = require('../util/send');
module.exports = (oldUser, newUser) => {
const isSameDisplayAvatarURL =
    oldUser.user.avatarURL() === newUser.user.avatarURL();
  const builder = new AuditLogEmbedBuilder().setColor("RANDOM").setUser(newUser);

  var color = "RED";
   //declare changes
    var Changes = {
        unknown: 0,
        addedRole: 1,
        removedRole: 2,
        username: 3,
        nickname: 4,
        avatar: 5
    };
  
  var change = Changes.unknown;
  
  //check if roles were removed
  let dif = newUser.roles.cache.filter(r => !oldUser.roles.cache.has(r.id)).first()
  let diff = oldUser.roles.cache.filter(r => !newUser.roles.cache.has(r.id)).first()
  if (oldUser.roles.cache.size !== newUser.roles.cache.size) {
    if (oldUser.roles.cache.size > newUser.roles.cache.size) {
       change = Changes.removedRole;
       var removedRole = diff.name;
    } else if (oldUser.roles.cache.size < newUser.roles.cache.size) {
       change = Changes.addedRole;
       var addedRole = dif.name;
    }
  }

    //check if username changed
    if(newUser.user.username != oldUser.user.username)
        change = Changes.username;

    //check if nickname changed
    if(newUser.nickname != oldUser.nickname)
        change = Changes.nickname;

    //check if avatar changed
   if (!isSameDisplayAvatarURL) {
        change = Changes.avatar
	}

var log = JSON.parse(fs.readFileSync('./data/logging.json', 'utf8')) 
let logsetting = JSON.parse(fs.readFileSync('./data/logonoff.json', 'utf8'));

if(!logsetting[oldUser.guild.id]){
  logsetting[oldUser.guild.id] = {
    checker: 1
  };
}
  if(!log[oldUser.guild.id]) return;
  let values = logsetting[oldUser.guild.id].checker
  
  if(values === undefined) return;
  if(values === 0) return;
  if(values === 1) {
    var log = JSON.parse(fs.readFileSync('./data/logging.json', 'utf8')) 
   if(!log) return;
    let channel = oldUser.guild.channels.cache.get(`${log[oldUser.guild.id].channel}`);
    if(!channel) return;
        if (channel != null) {
        switch(change) {
            case Changes.unknown:
            let embed = new Discord.MessageEmbed()
            .setColor(color)
            .setDescription('**User Update** ' + newUser)
//                channel.send(embed);
                break;
            case Changes.addedRole:
            let embed2 = new Discord.MessageEmbed() 
            .setColor(color)
            .setAuthor(`${newUser.user.tag} | Added Role`, newUser.user.avatarURL()) 
            .setDescription(`${newUser.user} **was given the \`${addedRole}\` role**`)
            .setFooter(`ID: ${newUser.user.id}`).setTimestamp() 
                channel.send(embed2)
                break;
            case Changes.removedRole:
            let embed3 = new Discord.MessageEmbed() 
            .setColor(color)
            .setAuthor(`${newUser.user.tag} | Removed Role`,  newUser.user.avatarURL()) 
            .setDescription(`${newUser} **was removed from the \`${removedRole}\` role**`)
            .setFooter(`ID: ${newUser.user.id}`).setTimestamp() 
                channel.send(embed3)
                break;
            case Changes.username:
            let embed4 = new Discord.MessageEmbed() 
            .setColor(color)
            .setAuthor(`${newUser.user.username} | Username Changed`, newUser.user.avatarURL()) 
            .setDescription('**Username changed from** ' +
                    oldUser.user.username + '#' + oldUser.user.discriminator + ' **to** ' +
                    newUser.user.username + '#' + newUser.user.discriminator)
            .setFooter(`ID: ${newUser.id}`).setTimestamp() 
                channel.send(embed4)
                break;
            case Changes.nickname:
            let embed5 = new Discord.MessageEmbed() 
            .setColor(color)
            .setAuthor(`${newUser.user.tag} | Nickname Changed`, newUser.user.avatarURL()) 
            .addField('Before', oldUser.nickname != null ? `${oldUser.nickname}` : `${oldUser.user.tag}`) 
            .addField('After', newUser.nickname != null ? `${newUser.nickname}` : `${newUser.user.tag}`)
            .setFooter(`ID: ${newUser.user.id}`).setTimestamp() 
            channel.send(embed5)
                break;
            case Changes.avatar:
          let embed6 = new Discord.MessageEmbed() 
          .setColor(color)
          .setAuthor(`${newUser.user.tag} | Avatar Changed`, newUser.user.avatarURL())
          .setDescription(`**${newUser.user.tag} Changed their avatar**`)
          .setImage(newUser.user.avatarURL())
	  .setThumbnail(oldUser.user.avatarURL())
                break;
    }

  }
  }
};
