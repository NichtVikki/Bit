const Discord = require('discord.js');

module.exports = {
    aliases: ['hi'],
    category: "Help",
    callback: ({ message }) => {
        message.lineReply("hi i guess?")
    }
}