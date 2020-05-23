 
const Discord = require('discord.js');
;
const footers = require('../data/footers.json');
exports.run = (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = args[0];
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("❌**Error:** You don't have the **Ban Members** permission!");
  //let logchannel = message.guild.channels.find('name', 'logs');
  //if (!logchannel) return message.channel.send('I cannot find a logs channel');
  if (args[0] === message.author.id) return message.reply('I can\' let you do that, self-harm is bad:facepalm:');
  if (user === client.user.id) return message.reply("You pleblord, how can you use a bot to ban itself?:joy:");
  if (args[0] === "523579776749928449") return message.reply("You can't ban my Developer:wink:");
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply(":no_entry_sign: **Error:** You don't have the **Ban Members** permission!");
  if (!user) return message.reply('You need to input a User ID');
  if (reason.length < 1) {reason = 'No reason supplied.'};
  message.guild.members.ban(user).catch(e =>{
    if (e) return message.channel.send("That user has already been banned or I don't have permission or my role isn't high enough!");
  });

  const embed = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .addField('Action:', 'HackBan')
    .addField('User:', `${args[0]}`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason)
    .setFooter(`${footers[Math.floor(Math.random() * footers.length)]}`);

    let logchannel = message.guild.channels.find('name', 'logs');
    if  (!logchannel){
      message.channel.send(`:hammer: Done. You don't have to worry about that shit head anymore, I have banned them!`)
      message.channel.send({embed})
  }else{
    message.channel.send(`:hammer:  Done. You don't have to worry about that shit head anymore, I have banned them! Also I\'ve logged the ban in <#${logchannel.id}>.`)
    client.channels.get(logchannel.id).send({embed});
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'hackban',
  description: 'Forcebans a user.',
  usage: 'hackban [user id] [reason]'
};
