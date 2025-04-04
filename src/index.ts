import * as Discord from "discord.js";
import * as DotEnv from "dotenv";
import path from "path";
import fs from "fs";
import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    Colors,
    ButtonInteraction,
    MessageComponentInteraction, MessageFlagsBitField
} from 'discord.js'
DotEnv.config({path: "./.env"});

const client = new Discord.Client({ intents: [], presence: { status: "online", afk: false, activities: [{ name: "hey sisters", type: Discord.ActivityType.Listening }] }});

let commands = new Discord.Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

client.on("ready", () => {
    console.log("Bot is ready!");
})

client.on("interactionCreate", async interaction => {
    if (interaction.isCommand()) {
        const command = commands.get(interaction.commandName);
        try {
            // @ts-ignore
            await command.execute(interaction, client);
        } catch (error) {
            const didAlreadyReply = interaction.replied || interaction.deferred;

            let reply;
            if (didAlreadyReply) {
                reply = await interaction.editReply({
                    embeds: [new EmbedBuilder()
                        .setTitle("Error")
                        .setDescription("An error occurred whilst executing this command! You can report this error, but we advise you to try the command later first before reporting.")
                        .setColor(Colors.Red).setTimestamp().setFooter({ text: "Bit" })], // @ts-ignore
                    components: [new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setStyle(1)
                            .setLabel("Report this error").setCustomId("report_error").setEmoji("📝"))],
                    ephemeral: true,
                    fetchReply: true
                })
            } else {
                reply = await interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setTitle("Error")
                        .setDescription("An error occurred whilst executing this command! You can report this error, but we advise you to try the command later first before reporting.")
                        .setColor(Colors.Red).setTimestamp().setFooter({ text: "Bit" })], // @ts-ignore
                    components: [new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setStyle(1)
                            .setLabel("Report this error").setCustomId("report_error").setEmoji("📝"))],
                    ephemeral: true,
                    fetchReply: true
                })
            }

            const filter = (i: MessageComponentInteraction) => i.customId === "report_error" && i.user.id === interaction.user.id;
            const collector = reply.createMessageComponentCollector({ filter, time: 60000 });

            collector.on('collect', async (button: ButtonInteraction) => {
                console.error(error)
                await button.deferUpdate();
                await interaction.editReply({ content: "The developers have been notified of this error.", components: [], embeds: [] });
            })
        }
    }
})

client.login(process.env.TOKEN).then(r => console.log("Logged in!")).catch(e => console.log("Error logging in: " + e));