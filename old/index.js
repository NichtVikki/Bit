const discord = require('discord.js')
const client = new discord.Client();
const wokcommands = require('wokcommands')
require('discord-reply')

client.on('ready', async () => {
    console.log("Bit is online!")

    client.user.setActivity("hey sisters", ({ type: "LISTENING" }));


    new wokcommands(client, {
        commandsDir: 'commands',
        testServers: ['853756553165275146'],
        showWarns: false,
        del: 5,
        ignoreBots: true
    }).setDefaultPrefix("b.").setCategorySettings("NSFW", "💦")
})

client.login('MTAzOTUwMDg1MDYwNDgyMjU3OQ.GdzO7y.jGlTzkQ0ZxxpHYlEuCpJiWZu31cXUIsr87N-xo')