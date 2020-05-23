const footers = require('../data/footers.json');
const Discord = require('discord.js');
const customisation = require('../customisation.json');

exports.run =  (client, message, args) => {
  message.delete();
  let embed = new Discord.MessageEmbed()
    .setTitle("Vote for Angel Dust!")
    .addField("Voting on discord.gl:", "https://bots.discord.gl/bot/677135764626210856")
    .addField("Voting on Bots On Discord:", "https://bots.ondiscord.xyz/bots/677135764626210856")
    .addField("Voting on TOPGG:", "https://top.gg/bot/677135764626210856")
    .setFooter(`${footers[Math.floor(Math.random() * footers.length)]}`);
  message.channel.send({embed});
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["bv"],
    permLevel: 0
  };
  
  exports.help = {
    name: 'botvote',
    description: 'Vote for the bot on Discordbots.org',
    usage: 'botvote'
  }
  //https://discordbots.org/bot/626771394063237138
