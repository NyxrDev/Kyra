const Discord = require("discord.js");
const fs = require("fs");
const settings = require('../settings.json');
//const mysql = require('mysql');
//const file = require('../mysql.json');
const customisation = require('../customisation.json');
const mongoose = require('mongoose');

exports.run = async (client, message, args) => {
  const Coins = require('../models/coins.js');
  if(!args[1]) return message.channel.send("You need to specify an ammount");
  let user = message.mentions.users.first();
  if (user.bot) return message.channel.send("*Hands you back your coins.*");
  if (!user) return message.channel.send("You must mention someone to pay them!");
  if (user === client.user) return message.channel.send("What do you think I need this for?, *takes money anyways*");
  if (user === message.author) return message.channel.send("You can't pay yourself coins");
  Coins.findOne({
    userID: message.author.id
  }, (err, coins) => {
    if (err) console.error(err);
    if (!coins) {
        const newCoins = new Coins({
            _id: mongoose.Types.ObjectId(),
            userID: message.author.id,
            coins: 0,
        });
        newCoins.save()
        return message.reply("You don't have enough coins!")
      }else if(coins.coins < parseInt(args[1])){
        return message.reply("You don't have enough coins!")
      } else {
        coins.coins = parseInt(coins.coins) - parseInt(args[1]);
        coins.save()
            //.then(result => console.log(result))
            .catch(err => console.error(err));

        Coins.findOne({
          userID: user.id
        }, (err, coins) => {
          if (err) console.error(err);
          if (!coins) {
              const newCoins = new Coins({
                  _id: mongoose.Types.ObjectId(),
                  userID: user.id,
                  coins: parseInt(args[1]),
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
          .addField(`Payment successful`,`You have paid ${user.username} ${args[1]} coins!`)
	  .setFooter("IF YOU DONT SEE A NUMBER, TRY AGAIN (pay @user #)")
          message.channel.send({embed})
        });
      }
    });
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };

exports.help = {
    name: 'pay',
    description: 'Pay someone with Coins.',
    usage: 'pay @user amount'
  };
