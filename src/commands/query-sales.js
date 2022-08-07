const { SlashCommandBuilder } = require("discord.js");
const { fetchSales } = require("../functions/query-sales");
const {
  pagination,
  TypesButtons,
  StylesButton,
} = require("@devraelfreeze/discordjs-pagination");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dawn-nfsales")
    .setDescription("Gets sales data for any NFT across multiple marketplaces.")
    .addStringOption((option) =>
      option
        .setName("address")
        .setRequired(true)
        .setDescription("String of collection address to filter by")
    ),
  async execute(interaction) {
    let address = interaction.options.get("address").value;
    await interaction.deferReply();
    let tokenDetails = await fetchSales(address);
    try {
      let sales = [];

      tokenDetails.sales.nodes.forEach((sale) => {
        sales.push({
          token_id: sale.token.tokenId ? sale.token.tokenId : "Unknown",
          owner_address: sale.token.owner ? sale.token.owner : "Unknown",
          name: sale.token.name ? sale.token.name : "Unknown",
          description: sale.token.description
            ? sale.token.description
            : "Unknown",
          collection_name: sale.token.tokenContract.name
            ? sale.token.tokenContract.name
            : "Unknown",
          collection_address: sale.token.tokenContract.collectionAddress
            ? sale.token.tokenContract.collectionAddress
            : "Unknown",
          symbol: sale.token.tokenContract.symbol
            ? sale.token.tokenContract.symbol
            : "Unknown",
          network: sale.token.tokenContract.network
            ? sale.token.tokenContract.network
            : "Unknown",
          mint_price: sale.token.mintInfo.price.usdcPrice.decimal
            ? sale.token.mintInfo.price.usdcPrice.decimal
            : "Unknown",
          thumbnail_url: sale.token.image.mediaEncoding.thumbnail
            ? sale.token.image.mediaEncoding.thumbnail
            : "https://zora.co/assets/og-image.png",
          sale_contract_address: sale.sale.saleContractAddress
            ? sale.sale.saleContractAddress
            : "Unknown",
          buyer_address: sale.sale.buyerAddress
            ? sale.sale.buyerAddress
            : "Unknown",
          seller_address: sale.sale.sellerAddress
            ? sale.sale.sellerAddress
            : "Unknown",
          sale_price: sale.sale.price.usdcPrice.decimal
            ? sale.sale.price.usdcPrice.decimal
            : "Unknown",
        });
      });

      let embeds = [];

      sales.forEach((token) => {
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
            { name: "NETWORK", value: token.network, inline: true },
            {
              name: "MINT PRICE",
              value: `${token.mint_price} USDC`,
              inline: true,
            },
            {
              name: "SALE PRICE",
              value: `${token.sale_price} USDC`,
              inline: true,
            },
            { name: "SALE CONTRACT ADDRESS", value: token.sale_contract_address },
            { name: "BUYER ADDRESS", value: token.buyer_address },
            { name: "SELLER ADDRESS", value: token.seller_address }
          );
        embeds.push(embed);
      });

      let paginationContent = await pagination({
        embeds: embeds, // Array of embeds objects
        author: interaction.member.user,
        interaction: interaction,
        ephemeral: true,
        time: 120000, // 120 seconds
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
