const Discord = require('discord.js');

module.exports = {
    aliases: ['anime-sex'],
    category: "NSFW",
    callback: async ({ message }) => {
        const NSFW = require("discord-nsfw");
        const nsfw = new NSFW();

        const image = await nsfw.hentai();
        const embed = new Discord.MessageEmbed()
            .setTitle(`Hentai`)
            .setColor("RED")
            .setFooter("Thanks to pjunior this exists.")
            .setImage(image);
        message.lineReply(embed);
    }
}