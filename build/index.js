"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = __importStar(require("discord.js"));
const DotEnv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const discord_js_1 = require("discord.js");
DotEnv.config({ path: "./.env" });
const client = new Discord.Client({ intents: [], presence: { status: "online", afk: false, activities: [{ name: "hey sisters", type: Discord.ActivityType.Listening }] } });
let commands = new Discord.Collection();
const commandsPath = path_1.default.join(__dirname, 'commands');
const commandFiles = fs_1.default.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const filePath = path_1.default.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        commands.set(command.data.name, command);
    }
    else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}
client.on("ready", () => {
    console.log("Bot is ready!");
});
client.on("interactionCreate", (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (interaction.isCommand()) {
        const command = commands.get(interaction.commandName);
        try {
            // @ts-ignore
            yield command.execute(interaction, client);
        }
        catch (error) {
            const didAlreadyReply = interaction.replied || interaction.deferred;
            let reply;
            if (didAlreadyReply) {
                reply = yield interaction.editReply({
                    embeds: [new discord_js_1.EmbedBuilder()
                            .setTitle("Error")
                            .setDescription("An error occurred whilst executing this command! You can report this error, but we advise you to try the command later first before reporting.")
                            .setColor(discord_js_1.Colors.Red).setTimestamp().setFooter({ text: "Bit" })], // @ts-ignore
                    components: [new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
                            .setStyle(1)
                            .setLabel("Report this error").setCustomId("report_error").setEmoji("📝"))],
                    ephemeral: true,
                    fetchReply: true
                });
            }
            else {
                reply = yield interaction.reply({
                    embeds: [new discord_js_1.EmbedBuilder()
                            .setTitle("Error")
                            .setDescription("An error occurred whilst executing this command! You can report this error, but we advise you to try the command later first before reporting.")
                            .setColor(discord_js_1.Colors.Red).setTimestamp().setFooter({ text: "Bit" })], // @ts-ignore
                    components: [new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
                            .setStyle(1)
                            .setLabel("Report this error").setCustomId("report_error").setEmoji("📝"))],
                    ephemeral: true,
                    fetchReply: true
                });
            }
            const filter = (i) => i.customId === "report_error" && i.user.id === interaction.user.id;
            const collector = reply.createMessageComponentCollector({ filter, time: 60000 });
            collector.on('collect', (button) => __awaiter(void 0, void 0, void 0, function* () {
                console.error(error);
                yield button.deferUpdate();
                yield interaction.editReply({ content: "The developers have been notified of this error.", components: [], embeds: [] });
            }));
        }
    }
}));
client.login(process.env.TOKEN).then(r => console.log("Logged in!")).catch(e => console.log("Error logging in: " + e));
