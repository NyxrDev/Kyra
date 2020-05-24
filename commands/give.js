const Discord = require("discord.js");
const fs = require("fs");
const config = require('../settings.json');
//const mysql = require('mysql');
//const file = require('../mysql.json');
const customisation = require('../customisation.json');
const mongoose = require('mongoose');

exports.run = async (client, message, args) => {
  const Coins = require('../models/coins.js');
  if (!config.ownerid.includes(message.author.id)) return message.channel.send("You lack perms to use this (owner only)");
  let user = message.mentions.users.first() || client.users.cache.get(args[0]);
  if (!user) return message.channel.send("You must an id of someone to given them!");
  if(!args[1]) return message.channel.send("You need to specify an ammount");
  if (user.bot) return message.channel.send("*Hands you back your coins.*");
  if (user === client.user) return;
        Coins.findOne({
          userID: user.id
        }, (err, coins) => {
          if (err) console.error(err);
          if (!coins) {
              const newCoins = new Coins({
                  _id: mongoose.Types.ObjectId(),
                  userID: user.id,
                  coins: parseInt(args[1])
              });
              newCoins.save()
                  //.then(result => console.log(result))
                  .catch(err => console.error(err));
          }else{
              coins.coins = parseInt(coins.coins) + parseInt(args[1]);
              coins.save()
                  //.then(result => console.log(result))
                  .catch(err => console.error(err));
          }

          const embed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .addField(`Addition successful`,`You have given to ${user.username}, ${args[1]} coins`)
	  .setTimestamp()
          .setFooter("This sentence has meaning, but not much")
          message.channel.send({embed})
        })
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };

exports.help = {
    name: 'give',
    description: 'given someone with Coins.',
    usage: 'given @user amount'
  };
