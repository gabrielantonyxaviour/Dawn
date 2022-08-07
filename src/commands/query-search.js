const { SlashCommandBuilder } = require("discord.js");
const { search } = require("../functions/query-search");
const {
  pagination,
  TypesButtons,
  StylesButton,
} = require("@devraelfreeze/discordjs-pagination");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dawn-nfsearch")
    .setDescription("Search for an NFT or collection based on a string input.")
    .addStringOption((option) =>
      option
        .setName("query")
        .setRequired(true)
        .setDescription("A text string to query with")
    ),
  async execute(interaction) {
    let query = interaction.options.get("query").value;
    await interaction.deferReply();
    try {
      let tokenDetails = await search(query);
      let tokens = [];

      tokenDetails.search.nodes.forEach((token) => {
        tokens.push({
          token_id: token.tokenId ? token.tokenId : "Unknown",
          owner_address: token.entity.mintInfo.originatorAddress
            ? token.entity.mintInfo.originatorAddress
            : "Unknown",
          name: token.entity.tokenContract.name
            ? token.entity.tokenContract.name
            : "Unknown",
          description: token.entity.tokenContract.description
            ? token.entity.tokenContract.description
            : "Unknown",
          collection_name: token.name ? token.name : "Unknown",
          collection_address: token.collectionAddress
            ? token.collectionAddress
            : "Unknown",
          symbol: token.entity.symbol ? token.entity.symbol : "Unknown",
          network: token.entity.tokenContract.network
            ? token.entity.tokenContract.network
            : "Unknown",
          mint_price: token.entity.mintInfo.price.usdcPrice?.decimal
            ? token.entity.mintInfo.price.usdcPrice?.decimal
            : "Unknown",
          thumbnail_url: token.entity.image.mediaEncoding.thumbnail
            ? token.entity.image.mediaEncoding.thumbnail
            : "https://zora.co/assets/og-image.png",
        });
      });

      let embeds = [];

      tokens.forEach((token) => {
        let embed = new EmbedBuilder()
          .setTitle(`Token Details for ${token.name}`)
          .setDescription(token.description)
          .setThumbnail(token.thumbnail_url)
          .setColor(0x00ffff)
          .setAuthor({
            name: "Zora",
            iconURL: "https://zora.co/assets/og-image.png",
          })
          .addFields(
            { name: "TOKEN ID", value: token.token_id, inline: true },
            {
              name: "COLLECTION NAME",
              value: token.collection_name,
              inline: true,
            },
            { name: "SYMBOL", value: token.symbol, inline: true },
            { name: "COLLECTION ADDRESS", value: token.collection_address },
            { name: "OWNER ADDRESS", value: token.owner_address },
            { name: "NETWORK", value: token.network },
            { name: "MINT PRICE", value: `${String(token.mint_price)} USDC` }
          );
        embeds.push(embed);
      });

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
            label: "Previous Page",
            style: StylesButton.Primary,
            emoji: null,
          },
          {
            value: TypesButtons.next,
            label: "Next Page",
            style: StylesButton.Success,
            emoji: null,
          },
        ],
      });
      await interaction.editReply(paginationContent);
    } catch {
      await interaction.editReply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};
