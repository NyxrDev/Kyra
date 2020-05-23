const Discord = require('discord.js')
const info = require('../data/infoMsgs.json');
const footers = require('../data/footers.json');

exports.run = (client, message) => {
  const embed = new Discord.MessageEmbed()
  .setColor(Math.floor(Math.random()*16777215))
  .setTitle("Angel Dust info:", '')
  .addField('Important Information',info.infoMsg1)
  .addField('Inviting the Bot',info.infoMsg2)
  .addField('Neat Links',info.infoMsg3)
  .setFooter(`${footers[Math.floor(Math.random() * footers.length)]}`);

  message.author.send({embed}).catch(e =>{
    if (e) {
    message.channel.send(`Error. You seem to be blocking your DMs so I'll send it here instead.`);
    message.channel.send({embed});
    }
  });
  message.reply("Check your DMs!");
    }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['info'],
  permLevel: 0
};

exports.help = {
  name: 'invitebot',
  description: 'DMs you the bot\'s invite link.',
  usage: 'invitebot'
};
