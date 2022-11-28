import { SlashCommandBuilder } from "@discordjs/builders";
import {CommandInteraction, EmbedBuilder, Colors} from "discord.js";
import axios from "axios";

export = {
    data: new SlashCommandBuilder()
        .setName('porn')
        .setDescription('pick any porn youd like')
        .addStringOption(option => option.setName("type").setDescription("pick a type").setRequired(true).addChoices(
            {name: "4k", value: "4k"},
            {name: "Anal", value: "anal"},
            {name: "Ass", value: "ass"},
            {name: "Gone Wild", value: "gonewild"},
            {name: "Porn Gif", value: "pgif"},
            {name: "Pussy", value: "pussy"},
            {name: "Thigh", value: "thigh"},
            {name: "Boobs", value: "boobs"},
            {name: "Hentai Ass", value: "hass"},
            {name: "Hentai", value: "hentai"},
            {name: "Hentai Anal", value: "hanal"},
            {name: "Hentai Midriff", value: "hmidriff"},
            {name: "Hentai Thigh", value: "hthigh"},
            {name: "Hentai Boobs", value: "hboobs"},
            {name: "Hentai Kitsune", value: "hkitsune"},
            {name: "Tentacle", value: "tentacle"},
            {name: "Yaoi", value: "yaoi"},
            {name: "Hentai Solo", value: "holo"},
            {name: "Food", value: "food"},
        )),

    async execute(interaction: CommandInteraction) {
        await interaction.deferReply()

        // @ts-ignore
        let { data } = await axios.get(`https://nekobot.xyz/api/image?type=${interaction.options.getString("type")}`)

        const image = data.message
        const embed = new EmbedBuilder() // @ts-ignore
            .setTitle(interaction.options.getString("type"))
            .setColor(Colors.Red)
            .setFooter({ text: "Thanks to pjunior this exists." })
            .setImage(image);

        await interaction.editReply({ embeds: [embed] });
    },
};

