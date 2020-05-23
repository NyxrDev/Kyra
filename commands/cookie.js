exports.run = (client, message, args) => {
  let user = message.mentions.users.first();
  let reason = args.slice(0).join(' ');
  if (reason.length < 1) return message.reply('You can\'t give ghosts cookies! :O');
  if(message.mentions.users.first().id === "677135764626210856") return message.reply('Thanks, I guess??');
  if(message.mentions.users.first().id === "523579776749928449") return message.reply('My owner only accepts cookies from me >:c');
      message.channel.send(`${message.author.username} Gives **${message.mentions.users.first().username}** a cookie! :cookie:`)
  }


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'cookie',
  description: 'give a user a cookie',
  usage: 'cookie <user>'
};
