const Discord = require('discord.js')
const info = require('../data/infoMsgs.json');
const footers = require('../data/footers.json');
const fs = require('fs');
const os = require('os');
//const si = require('systeminformation');
const osutil = require('os-utils');
const customisation = require("../customisation.json");

exports.run = (client, message) => {
  
  var milliseconds = parseInt((client.uptime % 1000) / 100),
        seconds = parseInt((client.uptime / 1000) % 60),
        minutes = parseInt((client.uptime / (1000 * 60)) % 60),
        hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);
        days = parseInt((client.uptime / (1000 * 60 * 60 * 24)) % 60);

        days = (days < 10) ? "0" + days : days;
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        fs.readdir('./commands/', (err, files) => {
          if (err) console.error(err);
          totcmds = files.length;
        
  osutil.cpuUsage(function(v) {
    const embed = new Discord.MessageEmbed()
    .setColor(0x7289DA)
    .setThumbnail(`https://cdn.discordapp.com/avatars/626771394063237138/5ba16045ef3b2db19d6bb4a878c0ed33.png?size=2048?size=1024`)
    .setURL(`https://cdn.discordapp.com/avatars/626771394063237138/5ba16045ef3b2db19d6bb4a878c0ed33.png?size=2048?size=1024`)
    .setTimestamp()
    .addField("VPS Stats:", "Shows the stats of the VPS that the bot's running on.")
    .addField("--------------------------------------------------------------------------------","------------------------------------------------------------------------------")
    .addField("Platform", osutil.platform(),true)
    .addField("VPS CPU Cores", osutil.cpuCount() + " Cores",true)
    .addField("CPU Usage", `${(v * 100).toString().split(".")[0] + "." + (v * 100).toString().split(".")[1].split('')[0] + (v * 100).toString().split(".")[1].split('')[1]}%`,true)
    .addField("Total Memory", osutil.totalmem().toString().split(".")[0] + "." + osutil.totalmem().toString().split(".")[1].split('')[0] + osutil.totalmem().toString().split(".")[1].split('')[1] + "MB",true)
    .addField("RAM Usage", `${(osutil.totalmem() - osutil.freemem()).toString().split(".")[0] + "." + ( osutil.totalmem() - osutil.freemem()).toString().split(".")[1].split('')[0] + (osutil.totalmem() - osutil.freemem()).toString().split(".")[1].split('')[1]}/${osutil.totalmem().toString().split(".")[0] + "." + osutil.totalmem().toString().split(".")[1].split('')[0] + osutil.totalmem().toString().split(".")[1].split('')[1]}MB`,true)
    .addField("RAM Usage %", `${(100 - osutil.freememPercentage() * 100).toString().split(".")[0] + "." + (100 - osutil.freememPercentage() * 100).toString().split(".")[1].split('')[0] + (100 - osutil.freememPercentage() * 100).toString().split(".")[1].split('')[1]}%`,true)
    //.addField("Server Uptime", osutil.sysUptime() +"ms",true)
    .addField("Ping", Math.round(client.ws.ping) + "ms", true)
    .addField("Uptime", days + "d " + hours + "h " + minutes + "m " + seconds + "." + milliseconds + "s", true)
    .addField("Developer", `${customisation.ownername}`, true)
    .setFooter(`${footers[Math.floor(Math.random() * footers.length)]}`);
        message.channel.send({embed});
  })
})
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'vpsstats',
  description: 'Displays VPS\'s stats.',
  usage: 'vpsstats'
};
