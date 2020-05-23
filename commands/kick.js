 
const footers = require('../data/footers.json');
const Discord = require('discord.js');

exports.run = (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("❌**Error:** You don't have the **Kick Members** permission!");
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to kick them.').catch(console.error);
  if (user.id === message.author.id) return message.reply("I can't let you do that, self-harm is bad:facepalm:");
  if (user.id === client.user.id) return message.reply("You pleblord, how can you use a bot to kick itself? :joy:");
  if (message.mentions.users.first().id === "523579776749928449") return message.reply("You can't kick my Developer:wink:");
  if (reason.length < 1) reason = 'No reason supplied';
  if (!message.guild.member(user).kickable) return message.reply('I cannot kick that member');
  message.guild.member(user).kick();

  const embed = new Discord.MessageEmbed()
    .setColor(0x0000FF)
    .setTimestamp()
    .addField('Action:', 'Kick')
    .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason)
    .setFooter(`${footers[Math.floor(Math.random() * footers.length)]}`);
  let logchannel = message.guild.channels.find('name', 'logs');
  if  (!logchannel){
    message.channel.send(`:white_check_mark: Success! I have kicked that toxic kid.`)
  }else{
    message.channel.send(`:white_check_mark: Success! I\'ve logged the kick in <#${logchannel.id}>.`)
    client.channels.get(logchannel.id).send({embed});
  }
  if(user.bot) return;
  return message.mentions.users.first().send({embed}).catch(e =>{
    if(e) return
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["yeet"],
  permLevel: 0
};

exports.help = {
  name: 'kick',
  description: 'Kicks the mentioned user.',
  usage: 'kick [mention] [reason]'
};
