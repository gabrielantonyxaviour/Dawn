const { SlashCommandBuilder } = require("discord.js");
const {
  pagination,
  TypesButtons,
  StylesButton,
} = require("@devraelfreeze/discordjs-pagination");
const { EmbedBuilder } = require("discord.js");
const {
  fetchCollectionStats,
} = require("../functions/query-collectionsStatsAggregate");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dawn-nfdata")
    .setDescription(
      "Gets statistics for a specific collection such as total supply, number of owners, and sales volume."
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
    let tokenDetails = await fetchCollectionStats(address);
    let embeds = [];
    let embed = new EmbedBuilder()
      .setTitle(`Collection Statistics`)
      .setDescription(
        "Statistics for a specific collection such as total supply, number of owners, and sales volume."
      )
      .setColor(0x00ffff)
      .setAuthor({
        name: "Zora",
        iconURL: "https://zora.co/assets/og-image.png",
      })
      .addFields(
        {
          name: "FLOOR PRICE",
          value: String(tokenDetails.aggregateStat.floorPrice),
          inline: true,
        },
        {
          name: "OWNER COUNT",
          value: String(tokenDetails.aggregateStat.ownerCount),
          inline: true,
        },
        {
          name: "NFT COUNT",
          value: String(tokenDetails.aggregateStat.nftCount),
          inline: true,
        },
        {
          name: "CHAIN TOKEN PRICE",
          value: String(tokenDetails.aggregateStat.salesVolume.chainTokenPrice),
          inline: true,
        },
        {
          name: "USDC TOKEN PRICE",
          value: String(tokenDetails.aggregateStat.salesVolume.usdcPrice),
          inline: true,
        },
        {
          name: "TOTAL COUNT",
          value: String(tokenDetails.aggregateStat.salesVolume.totalCount),
          inline: true,
        }
      );
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
