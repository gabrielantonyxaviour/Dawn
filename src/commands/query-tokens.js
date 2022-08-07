const { SlashCommandBuilder } = require("discord.js");
const { fetchTokens } = require("../functions/query-tokens");
const {
  pagination,
  TypesButtons,
  StylesButton,
} = require("@devraelfreeze/discordjs-pagination");
const { EmbedBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dawn-nftokens")
    .setDescription(
      "Gets data on a group of tokens based on collection address."
    )
    .addStringOption((option) =>
      option
        .setName("address")
        .setRequired(true)
        .setDescription("The address of the collection")
    ),
  async execute(interaction) {
    let address = interaction.options.get("address").value;
    await interaction.deferReply();
    try {
      let tokenDetails = await fetchTokens(address);
      let tokens = [];

      tokenDetails.tokens.nodes.forEach((token) => {
        tokens.push({
          token_id: token.token.tokenId,
          owner_address: token.token.owner,
          name: token.token.name,
          description: token.token.description,
          collection_name: token.token.tokenContract.name,
          collection_address: token.token.collectionAddress,
          symbol: token.token.tokenContract.symbol,
          network: token.token.tokenContract.network,
          mint_price: token.token.mintInfo.price.usdcPrice?.decimal,
          thumbnail_url: token.token.image.mediaEncoding.thumbnail,
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
            { name: "MINT PRICE", value: `${token.mint_price} USDC` }
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
    } catch (err) {
      await interaction.editReply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};
