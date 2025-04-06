import { SlashCommandBuilder } from "@discordjs/builders";
import {
    EmbedBuilder,
    Colors,
    TextChannel,
    CommandInteractionOptionResolver,
    ChatInputCommandInteraction
} from "discord.js";
import axios from "axios";

export = {
    data: new SlashCommandBuilder()
        .setName('porn')
        .setDescription('pick any porn youd like')
        .setIntegrationTypes([0,1])
        .setContexts([0,1,2])
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

    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply()
        const type = (interaction.options as CommandInteractionOptionResolver).getString("type")!

        if (type === "food") {
            let { data } = await axios.get(`https://nekobot.xyz/api/image?type=${type}`)

            const image = data.message
            const embed = new EmbedBuilder() // @ts-ignore
                .setTitle(type)
                .setColor(Colors.Red)
                .setFooter({ text: "Thinking of X Master Woo. Just woo. Just woo." })
                .setImage(image);

            await interaction.editReply({ embeds: [embed] });
            return
        }

        const channel = await interaction.client.channels.fetch(interaction.channelId)

        let isChannelNSFW = false;
        if (!channel || !(channel instanceof TextChannel)) {
            isChannelNSFW = false;
        } else {
            isChannelNSFW = channel.nsfw;
        }

        if (type === "food") {
            isChannelNSFW = true;
        }

        // if (!isChannelNSFW) {
        //     const embed = new EmbedBuilder()
        //         .setTitle("This channel is not NSFW")
        //         .setDescription("You can only use this command in NSFW channels.")
        //         .setColor(Colors.Red)
        //         .setFooter({ text: "Thinking of X Master Woo. Just woo. Just woo." })
        //     await interaction.editReply({ embeds: [embed] });
        //     return;
        // }

        // @ts-ignore
        let { data } = await axios.get(`https://nekobot.xyz/api/image?type=${interaction.options.getString("type")}`)

        const image = data.message
        const embed = new EmbedBuilder() // @ts-ignore
            .setTitle(type)
            .setColor(Colors.Red)
            .setFooter({ text: "Thinking of X Master Woo. Just woo. Just woo." })
            .setImage(image);

        await interaction.editReply({ embeds: [embed] });
    },
};

