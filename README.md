# Bit

Welcome to Bit! This bot literally only has /porn and /roast, but if you want to set it up and run it on your own pc, you will find the instructions below.

## Prerequisites

Before running the bot, make sure you have the following installed:

- [Node.js](https://nodejs.org) (version 16 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Installation

1. Clone the repository or download the source code:

   ```bash
   git clone https://github.com/your-username/my-awesome-discord-bot.git
   ```
   
2. Navigate to the project directory:

   ```bash
   cd my-awesome-discord-bot
   ```
    
3. Install the required dependencies:
   ```bash
   npm install
   ```
   
## Configuration
To configure your bot, you need to set up a .env file in the project root directory. Follow these steps:

1. Create a new file named .env in the project root.
2. Open the .env file in a text editor.
3. Add the following line to the file and save it:

   ```makefile
   TOKEN=YOUR_DISCORD_BOT_TOKEN
   ```
   
   Replace YOUR_DISCORD_BOT_TOKEN with your own Discord bot token. If you don't have a bot token yet, you can create one by following the Discord Developer Portal documentation.

## Usage
To run the bot locally on your PC, follow these steps:

1. Make sure you are in the project directory.
2. Open a terminal or command prompt.
3. Run the following command:

   ```bash
   npm start
   ```
   
   The bot will now start and attempt to connect to Discord using the provided bot token.

## Deploying the Bot
To deploy the bot to a server or hosting platform, follow these steps:

1. Make sure you have your own server or hosting environment set up.
2. Update the .env file on the server or hosting environment with the bot token.
3. Deploy the code to your server or hosting environment.
4. Start the bot using the appropriate commands for your server or hosting environment.

Please note that the deployment process may vary depending on the server or hosting platform you are using. Refer to their documentation for more detailed instructions.

## License
Bit is released under the MIT License.
