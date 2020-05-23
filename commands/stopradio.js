const musicfuncs = require('../handlers/music.js');
exports.run = async (bot, message, args, funcs) => {
    try {
        musicfuncs.stopRadio(message, bot, funcs);
    } catch (e) {
        console.log(e);
        message.channel.send(`Oh no! An error occurred! \`${e.message}\`.`);
    }
};
exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['str'],
	permLevel: 0
};

exports.help = {
	name: 'stopradio',
	category: 'Miscelaneous',
	description: 'Radio realated commands!',
	usage: 'str'
};
