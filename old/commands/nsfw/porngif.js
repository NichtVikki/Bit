const Discord = require('discord.js');

module.exports = {
    aliases: ["porn"],
    category: "NSFW",
    callback: async ({ message }) => {
        const NSFW = require("discord-nsfw");
        const nsfw = new NSFW();

        const image = await nsfw.pgif();
        const embed = new Discord.MessageEmbed()
            .setTitle(`Porn gif`)
            .setColor("RED")
            .setFooter("Thanks to pjunior this exists.")
            .setImage(image);
        message.lineReply(embed);
    }
}