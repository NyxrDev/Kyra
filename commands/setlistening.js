exports.run = (client, message, args) => {
    if (message.author.id !== '523579776749928449') return message.reply('You do not have the permission to use this command!');
    if(!args[0]) return;
    if(args[0] === 'game') return message.reply('Please tell me what to listen to');
    if(args[0] === 'default') {
      args = `/help | Protecting ${client.guilds.cache.size} servers!`
      message.reply(`I am now listening to \`${args}\`.`);
      client.user.setPresence({ game: { name: args, type: 2 } });
    }else{
     args = args.join(" ");
     message.reply(`I am now listening to \`${args}\`.`);
     client.user.setPresence({ game: { name: args, type: 2 } });
    }
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['listen'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'setlistening',
    description: 'Sets the bot\'s listen status.',
    usage: 'setgame <listen status>'
  };
  