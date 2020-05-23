 
const Discord = require('discord.js');
const footers = require('../data/footers.json');
const superagent = require("superagent");

exports.run = async (client, message, args, tools) => {
    let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL() : message.author.avatarURL();
    const { body } = await superagent
      .get(`https://nekobot.xyz/api/imagegen?type=magik&image=${avatar}`);
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setImage(body.message)
    .setFooter(`${footers[Math.floor(Math.random() * footers.length)]}`);
    message.channel.send({embed})
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  exports.help = {
    name: 'magik',
    description: 'magik someone OwO',
    usage: 'magik'
  };
