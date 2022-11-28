import { REST, Routes } from "discord.js"
import * as fs from "fs"
import * as path from "path"
import * as dotenv from "dotenv"
dotenv.config({ path: "./.env" })

const commands = [];
const commandFiles = fs.readdirSync(path.join(__dirname, "commands")).filter(file => file.endsWith('.js') || file.endsWith('.ts'));
for (const file of commandFiles) {
    const command = require(path.join(__dirname, "commands", file));
    commands.push(command.data.toJSON());
}

// @ts-ignore
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationCommands('1039500850604822579'),
            { body: commands },
        );

        // @ts-ignore
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();