const { SlashCommandBuilder } = require("discord.js")
const { EmbedBuilder } = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Replies with a list of commands supported by this bot."),
  async execute(interaction) {
    await interaction.deferReply();
    let embed = new EmbedBuilder()
      .setTitle("Help")
      .setDescription(`
      View and listen to NFTs using our user friendly discord bot built with Zora Protocol.
      **Commands:**
      help - Replies with a list of commands supported by this bot.
      **dawn-nfcollection** - Gets data for the specified NFT collection.
      **dawn-nfcount** - Gets data on the total supply of NFTs in a collection.
      **dawn-nfdata** - Gets statistics for a specific collection such as total supply, number of owners, and sales volume.
      **dawn-nfevents** - Gets statistics on all the attributes for a collection.
      **dawn-nfliquidity** - Gets the number of unique addresses that own an NFT from a collection.
      **dawn-nfowned** - Gets data on the total supply of NFTs owned by a user.
      **dawn-nfprice** - Gets data on the cheapest available NFT across all Zora marketplaces.
      **dawn-nfprops** - Gets statistics on all the attributes for a collection.
      **dawn-nfsales** - Gets sales data for any NFT across multiple marketplaces.
      **dawn-nfsearch** - Search for an NFT or collection based on a string input.
      **dawn-nftoken** - Gets data on a single NFT given a contract address and tokenId.
      **dawn-nftokens** - Gets data on a group of tokens based on collection address.
      `)
      .setColor(0x00ffff)
      .setAuthor({
        name: "Zora",
        iconURL: "https://zora.co/assets/og-image.png",
      })
    await interaction.editReply({ embeds: [embed] });
  }
}