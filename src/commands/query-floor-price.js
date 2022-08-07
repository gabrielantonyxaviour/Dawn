const { SlashCommandBuilder } = require("discord.js");
const { fetchFloorPrice } = require("../functions/query-floor-price");
const {
  pagination,
  TypesButtons,
  StylesButton,
} = require("@devraelfreeze/discordjs-pagination");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dawn-nfprice")
    .setDescription(
      "Gets data on the cheapest available NFT across all Zora marketplaces."
    )
    .addStringOption((option) =>
      option
        .setName("address")
        .setRequired(true)
        .setDescription("List of collection addresses to filter by")
    ),
  async execute(interaction) {
    let address = interaction.options.get("address").value;
    await interaction.deferReply();
    let tokenDetails = await fetchFloorPrice(address);
    let embeds = [];

    let embed = new EmbedBuilder()
      .setTitle(`Floor Price for ${address}`)
      .setDescription(
        "Gets data on the cheapest available NFT across all Zora marketplaces."
      )
      .setColor(0x00ffff)
      .setAuthor({
        name: "Zora",
        iconURL: "https://zora.co/assets/og-image.png",
      })
      .addFields({
        name: "FLOOR PRICE",
        value: String(tokenDetails.aggregateStat.floorPrice),
      });
    embeds.push(embed);

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
  },
};
