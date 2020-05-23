const cooldown = new Set()
const Discord = require("discord.js");
const fs = require("fs");
const settings = require('../settings.json');
//const mysql = require('mysql');
//const file = require('../mysql.json');
const customisation = require('../customisation.json');
const mongoose = require('mongoose');

exports.run = async (client, message, args) => {
  const Coins = require('../models/coins.js');
  let random = Math.floor(Math.random() * 100000) + 1;
  let user = message.mentions.users.first() || client.users.cache.get(args[0]);
if (cooldown.has(message.author.id)) {
    let cooldownemb = new Discord.MessageEmbed()
    .setAuthor(`${message.author.username} Cooldown..`, message.author.displayAvatarURL)
    .setDescription(`You need to wait 5 seconds!`)
    .setColor(`RED`)
    .setFooter(`lol... ha`)
    .setTimestamp()
    return message.channel.send(cooldownemb)
    }
    cooldown.add(message.author.id);

    setTimeout(() => {
        cooldown.delete(message.author.id);
    }, 10000);
  if (!user) return message.channel.send("You must mention someone to rob them!");
  if (user === message.author) return message.channel.send("You can't rob yourself coins");
  if (user.bot) return message.channel.send("Bots cant have coins...");
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
        } else {
        coins.coins = parseInt(coins.coins) + random;
        coins.save()
            //.then(result => console.log(result))
            .catch(err => console.error(err));

        Coins.findOne({
          userID: user.id
        }, (err, coins) => {
          if (err) console.error(err);

	if (coins === null) return message.channel.send("oops, looks like this user isnt in the database");
	if (coins.coins < 8000) return message.channel.send("Dont rob them blind please ;<")
	if (coins.coins < 50000) random = Math.floor(Math.random() * 8000) + 1
        if (!coins) {
              const newCoins = new Coins({
                  _id: mongoose.Types.ObjectId(),
                  userID: user.id,
                  coins: random
              });

              newCoins.save()
                  //.then(result => console.log(result))
                  .catch(err => console.error(err));
          }else{
              coins.coins = parseInt(coins.coins) - random;
              coins.save()
	.catch(err => console.error(err))
	      }
          const embed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .addField(`Theft successful`,`You have robbed ${user.username} of ${random}`)
	  .setFooter("Well good going i guess lol...")
	  .setTimestamp()
          message.channel.send({embed})
        })
        }
      })
    };
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["rob"],
    permLevel: 0
  };

exports.help = {
    name: 'steal',
    description: 'rob someone with Coins.',
    usage: 'rob @user amount'
  };
