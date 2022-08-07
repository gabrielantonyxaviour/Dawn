const dotenv = require("dotenv")
dotenv.config()

const { Client, Collection, GatewayIntentBits, ActivityType } = require("discord.js")
const fs = require("fs")
const path = require("path")


let token = process.env.DISCORD_TOKEN

const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates] })
bot.commands = new Collection()

const commandFiles = fs.readdirSync(path.join("./", "src", "commands")).filter(file => file.endsWith(".js"))
for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  bot.commands.set(command.data.name, command)
}

bot.once("ready", () => {
  bot.user.setActivity('Zora', { type: ActivityType.Watching })
  console.log("Bot is on and Up...!")
})

bot.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = bot.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
})

bot.login(token)