const Discord = require('discord.js');

module.exports = {
    category: "NSFW",
    callback: async ({ message }) => {
        const NSFW = require("discord-nsfw");
        const nsfw = new NSFW();

        const image = await nsfw.hentaiass();
        const embed = new Discord.MessageEmbed()
            .setTitle(`Hentai Ass`)
            .setColor("RED")
            .setFooter("Thanks to pjunior this exists.")
            .setImage(image);
        message.lineReply(embed);
    }
}