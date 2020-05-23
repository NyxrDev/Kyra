const cooldown = new Set()
const Discord = require('discord.js')
const Pet = require("../models/pets.js")
const petUtil = require("../utils/pets.js")
exports.run = async (bot, message, args) => {
   //this is where the actual code for the command goes
//    if (message.channel.type !== 'dm') return message.reply("Please DM me! :D");
if (cooldown.has(message.author.id)) {
    let cooldownemb = new Discord.MessageEmbed()
    .setAuthor(`${message.author.username} Cooldown..`, message.author.displayAvatarURL)
    .setDescription(`You need to wait 5 seconds!`)                                          .setColor(`RED`)
    .setFooter(`lol... ha`)
    .setTimestamp()
    return message.channel.send(cooldownemb)
    }
    cooldown.add(message.author.id);

    setTimeout(() => {
        cooldown.delete(message.author.id);
    }, 10000);

    Pet.findOne({
        ownerID: message.author.id
    }, (err, pet) => {
        if (err) console.log(err);
        if (!pet) {
            message.reply("Sorry, but you don't have a pet... Do `getpet`").then(m => m.delete(5000));
        } else {
            //Gonna handle this w a util for the training part. maybe generate a wild pet? random stats based
            //on your pet? same stats different trait? 
            let data = petUtil.petTrain(pet);
            pet.petXp = pet.petXp + data.experience;
            petUtil.checkLevelUp(pet);
            return message.reply("You hit " + data.damage + " and gained " + data.experience + " experience.")
        }
    });
}
//name this whatever the command name is.
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["train"],
    permLevel: 0
  };
  
  exports.help = {
  name: 'trainpet',
  description: 'train pet',
  usage: 'trainpet'
};

