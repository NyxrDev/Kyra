const Discord = require('discord.js');
const footers = require('../data/footers.json');

exports.run = async (client, message, args) => {
    let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL() : message.author.avatarURL();
    
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setImage(`https://api.alexflipnote.dev/jokeoverhead?image=` + avatar) 
    .setFooter(`${footers[Math.floor(Math.random() * footers.length)]}`);
    message.channel.send({embed});
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'woosh',
    description: 'r/woosh',
    usage: 'woosh (w or w/o @mention)'
  };
   
