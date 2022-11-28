const Discord = require('discord.js');

module.exports = {
    aliases: ['about-me'],
    category: "Help",
    callback: ({ message }) => {
        message.lineReply("a normal bot, lol idk what else to say")
    }
}