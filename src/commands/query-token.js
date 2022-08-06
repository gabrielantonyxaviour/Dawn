const { SlashCommandBuilder } = require("discord.js")
const { fetchToken } = require("../functions/query-token")
const { pagination, TypesButtons, StylesButton } = require('@devraelfreeze/discordjs-pagination');
const { EmbedBuilder } = require('discord.js');



module.exports = {
  data: new SlashCommandBuilder()
    .setName("query-token")
    .setDescription("Gets data on a single NFT given a contract address and tokenId")
    .addStringOption(option =>
      option.setName("address").setRequired(true).setDescription("The address of the collection"))
    .addStringOption(option =>
      option.setName("token_id").setRequired(true).setDescription("The ID of the token")),
  async execute(interaction) {
    let address = interaction.options.get("address").value
    let tokenId = interaction.options.get("token_id").value
    await interaction.deferReply();
    try {
      let token = await fetchToken(address, tokenId)
      let embeds = []
      let embed = new EmbedBuilder()
        .setTitle(`Token Details for ${token.token.token.name}`)
        .setDescription(token.token.token.description)
        .setThumbnail(token.token.token.content.mediaEncoding.thumbnail)
        .setColor(0x00FFFF)
        .setAuthor({ name: 'Zora', iconURL: 'https://zora.co/assets/og-image.png' })
        .addFields(
          { name: 'TOKEN ID', value: token.token.token.tokenId, inline: true },
          { name: 'COLLECTION NAME', value: token.token.token.tokenContract.name, inline: true },
          { name: 'SYMBOL', value: token.token.token.tokenContract.symbol, inline: true },
          { name: 'COLLECTION ADDRESS', value: token.token.token.tokenContract.collectionAddress },
          { name: 'OWNER ADDRESS', value: token.token.token.owner },
          { name: 'NETWORK', value: token.token.token.tokenContract.network, inline: true },
          { name: 'MINT PRICE', value: `${token.token.token.mintInfo.price.nativePrice.currency.decimals} ${token.token.token.mintInfo.price.nativePrice.currency.name}`, inline: true },
        )
      embeds.push(embed)

      let paginationContent = await pagination({
        embeds: embeds, // Array of embeds objects
        author: interaction.member.user,
        interaction: interaction,
        ephemeral: true,
        time: 40000, // 40 seconds
        fastSkip: false,
        pageTravel: false,
        buttons: [
          {
            value: TypesButtons.previous,
            label: 'Previous Page',
            style: StylesButton.Primary,
            emoji: null
          },
          {
            value: TypesButtons.next,
            label: 'Next Page',
            style: StylesButton.Success,
            emoji: null
          }
        ]
      });
      await interaction.editReply(paginationContent)
    } catch (err) {
      await interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true });

    }
  }
}