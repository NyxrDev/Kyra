exports.run = (client, message, args) => {
    if(!message.mentions.users.first()) return message.reply(`Hey idiot, Here's your own id: **${message.author.id}**`+"\n"+"Now don't be a baka and lose it!");
    message.channel.send("Their ID is: "+`***${message.mentions.users.first().id}***`+" :ping_pong:")
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'userid',
  description: 'Get a users ID',
  usage: 'userid'
};

