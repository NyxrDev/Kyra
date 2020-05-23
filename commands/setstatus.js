exports.run = (client, message, args) => {
  if(message.author.id !== '523579776749928449') return message.reply("You don't have permission to do this!");
  if(!args[0]) return message.reply('Tell me a status boi.');
  if(args[0] === 'status') return message.reply('Come on boi. The statuses are Online, Idle, DND, and Offline.');
  args.join(" ");
  message.reply(`I am now \`${args}\`.`);
  client.user.setPresence({ status: `${args}` });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['setstat'],
  permLevel: 0
};

exports.help = {
  name: 'setstatus',
  description: 'Sets the bot\'s listen status.',
  usage: 'setstatus <status>'
};
