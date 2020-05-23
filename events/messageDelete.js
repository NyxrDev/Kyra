module.exports = {
    leavex: (bot) => {
    bot.on('messageDelete', message =>{
    let image = message.attachments.size > 0 ? extension(message.attachments.array()[0].proxyURL) : false
    message.content.replace('\n', '')
    if (message.author.bot) return;
    if(message.content.length > 200) {
        message.content = message.content.slice(0, 200) + ' ...'
    }

    let snipe = bot.snipe.get(message.guild.id)

    if(!snipe) {
        bot.snipe.set(message.guild.id, [[message, image]])
    } else {
        if(snipe.length >= 1) {
            bot.snipe.get(message.guild.id).pop()
            bot.snipe.get(message.guild.id).unshift([message, image])
        } else {
            bot.snipe.get(message.guild.id).unshift([message, image])
        }
    }



    function extension(attachment) {
        const imageLink = attachment.split('.')
        const typeOfImage = imageLink[imageLink.length - 1]
        const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage)
        if(!image) return ''
        return attachment
    }
})
}
};
