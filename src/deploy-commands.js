const dotenv = require("dotenv")
dotenv.config()

const { Routes } = require("discord.js")
const { REST } = require("@discordjs/rest")

const fs = require("fs")
const path = require("path")

let token = process.env.DISCORD_TOKEN || ""
let clientID = process.env.CLIENT_ID || ""

const commands = []
const commandFiles = fs.readdirSync(path.join("./", "src", "commands")).filter(file => file.endsWith(".js"))
for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  commands.push(command.data.toJSON())
}

const rest = new REST({ version: "10" }).setToken(token)
rest.put(Routes.applicationCommands(clientID), { body: commands }).then(() => {
  console.log("Commands updated!")
}
).catch(console.error)