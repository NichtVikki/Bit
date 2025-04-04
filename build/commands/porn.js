"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
const axios_1 = __importDefault(require("axios"));
module.exports = {
    data: new builders_1.SlashCommandBuilder()
        .setName('porn')
        .setDescription('pick any porn youd like')
        .setIntegrationTypes([0, 1])
        .addStringOption(option => option.setName("type").setDescription("pick a type").setRequired(true).addChoices({ name: "4k", value: "4k" }, { name: "Anal", value: "anal" }, { name: "Ass", value: "ass" }, { name: "Gone Wild", value: "gonewild" }, { name: "Porn Gif", value: "pgif" }, { name: "Pussy", value: "pussy" }, { name: "Thigh", value: "thigh" }, { name: "Boobs", value: "boobs" }, { name: "Hentai Ass", value: "hass" }, { name: "Hentai", value: "hentai" }, { name: "Hentai Anal", value: "hanal" }, { name: "Hentai Midriff", value: "hmidriff" }, { name: "Hentai Thigh", value: "hthigh" }, { name: "Hentai Boobs", value: "hboobs" }, { name: "Hentai Kitsune", value: "hkitsune" }, { name: "Tentacle", value: "tentacle" }, { name: "Yaoi", value: "yaoi" }, { name: "Hentai Solo", value: "holo" }, { name: "Food", value: "food" })),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.deferReply();
            if (!interaction.guild) {
                const embed = new discord_js_1.EmbedBuilder()
                    .setTitle("This command can only be used in a server.")
                    .setDescription("You can only use this command in a server.")
                    .setColor(discord_js_1.Colors.Red)
                    .setFooter({ text: "Thinking of X Master Woo. Just woo. Just woo." });
                yield interaction.editReply({ embeds: [embed] });
                return;
            }
            const channel = yield interaction.client.channels.fetch(interaction.channelId);
            let isChannelNSFW = false;
            if (!channel || !(channel instanceof discord_js_1.TextChannel)) {
                isChannelNSFW = false;
            }
            else {
                isChannelNSFW = channel.nsfw;
            }
            const type = interaction.options.getString("type");
            if (type === "food") {
                isChannelNSFW = true;
            }
            if (!isChannelNSFW) {
                const embed = new discord_js_1.EmbedBuilder()
                    .setTitle("This channel is not NSFW")
                    .setDescription("You can only use this command in NSFW channels.")
                    .setColor(discord_js_1.Colors.Red)
                    .setFooter({ text: "Thinking of X Master Woo. Just woo. Just woo." });
                yield interaction.editReply({ embeds: [embed] });
                return;
            }
            // @ts-ignore
            let { data } = yield axios_1.default.get(`https://nekobot.xyz/api/image?type=${interaction.options.getString("type")}`);
            const image = data.message;
            const embed = new discord_js_1.EmbedBuilder() // @ts-ignore
                .setTitle(type)
                .setColor(discord_js_1.Colors.Red)
                .setFooter({ text: "Thinking of X Master Woo. Just woo. Just woo." })
                .setImage(image);
            yield interaction.editReply({ embeds: [embed] });
        });
    },
};
