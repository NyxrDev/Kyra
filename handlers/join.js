const fetch = require("node-fetch")

module.exports = {
 count: (bot) => {
    bot.on("ready", guild => {
        fetch("https://bots.ondiscord.xyz/bot-api/bots/677135764626210856/guilds",{
        method: "post",
        headers: { 'Content-Type': 'application/json' },
        Authorization: b1c678e8b0a346efe45e97c12b28f074,
body:   {
	"guildCount": client.guilds.cache.size
	}
		})
	})
	}
}
