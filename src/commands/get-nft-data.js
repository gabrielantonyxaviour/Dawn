const { SlashCommandBuilder } = require("discord.js")
// const { useNFT, useNFTMetadata } = require('@zoralabs/nft-hooks');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("get-nft-data")
    .setDescription("Gets data on a single NFT given a contract address and tokenId")
    .addStringOption(option =>
      option.setName("address").setRequired(true).setDescription("The address of the collection"))
    .addStringOption(option =>
      option.setName("token_id").setRequired(true).setDescription("The ID of the token")),
  async execute(interaction) {
    // const { data } = useNFT('0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7', '20')
    if (data) {
      // interaction.respond(`${data.name}`)
    }
    await interaction.reply("Okay!");
  }
}