const config = require("../settings/config.json")
const fetch = require("node-fetch")

module.exports = {
    leave: (bot) => {
        bot.on("guildDelete" ,guild => {
        const body = {
            "username": "AngelDust Logs",
            "avatar_url": "http://dcord.ga/NLxF.png",
            "embeds": [
              {
                "title":"AngelDust Logs",
                "description": "Left a server",
                "color": 000000 ,
                "fields": [
                  {
                    "name": "name",
                    "value": guild.name,
                    "inline": true
                  },
                  {
                    "name": "guild id",
                    "value": guild.id,
                    "inline": true
                  },
                  {
                    "name": "membercount",
                    "value": guild.members.size,
                    "inline": true
                  },
                  {
                    "name": "owner",
                    "value": guild.owner.user.tag,
                    "inline": true
                  },
                  {
                    "name": "owner id",
                    "value": guild.owner.id,
                    "inline": true
                  }
                ],
                "thumbnail": {
                  "url": guild.iconURL
                },
                "footer": {
                  "text": `new server count ${bot.guilds.cache.size} new member count ${(bot.guilds.cache.reduce((a,b) => a + b.memberCount,0)).toLocaleString()}`
                }
              }
            ]
          }
        
              fetch(config.hooks,{
                  method: "post",
                  body: JSON.stringify(body),
                  headers: { 'Content-Type': 'application/json' },
              }) 

            })
            
}}
