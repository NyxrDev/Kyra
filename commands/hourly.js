const cooldown = new Set()
const Discord = require("discord.js");
exports.run = (client, message, args) => {

if (cooldown.has(message.author.id)) {
    let cooldownemb = new Discord.MessageEmbed()
    .setAuthor(`${message.author.username} Cooldown..`, message.author.displayAvatarURL)
    .setDescription(`You need to wait! has not been an hour yet`)
    .setColor(`RED`) 
    .setTimestamp()
    .setFooter(`welp..`)
    return message.channel.send(cooldownemb)
    }
    cooldown.add(message.author.id);

    setTimeout(() => {
        cooldown.delete(message.author.id);
    }, 3600000); 
  const Coins = require('../models/coins.js')
  let user = message.author
  Coins.findOne({
    userID: user.id
  }, (err, coins) => {
    if(!coins){
      let newcoins = new Coins({
        _id: mongoose.Schema.Types.ObjectId,
        userID: user.id,
        coins: 0,
        lastdaily: 0,
        streak: 0
      })
      newcoins.save()
     }else{
     let money = 10000
     let random = Math.floor(Math.random() * 37);
        let curBal2 = parseInt(coins.coins);
        coins.coins = curBal2 + money
        coins.save()
        message.channel.send(`You have worked and claimed ${money} coins, <@${user.id}>`)
    }
  })
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["hr", "hour"],
    permLevel: 0,
    cd: true
};

exports.help = {
    name: 'hourly',
    description: 'Gamble for a chance of winning more coins',
    usage: 'gamble <amount>'
};
