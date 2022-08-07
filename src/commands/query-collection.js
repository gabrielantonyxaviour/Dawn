const { SlashCommandBuilder } = require("discord.js");
const { fetchCollection } = require("../functions/query-collection");
const { EmbedBuilder } = require("discord.js");
const {
  pagination,
  TypesButtons,
  StylesButton,
} = require("@devraelfreeze/discordjs-pagination");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dawn-nfcollection")
    .setDescription(
      "Gets data for a specific NFT collection based on an address."
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
    // try {

    //   await interaction.editReply(paginationContent);
    // } catch {
    //   await interaction.editReply({
    //     content: "There was an error while executing this command!",
    //     ephemeral: true,
    //   });
    // }
    // address = address.split(",")
    let details = await fetchCollection(address);
    let embeds = [];
    let embed = new EmbedBuilder()
      .setTitle(
        `Collection Details for ${details?.name.length ? details?.name : "Unknown"
        }`
      )
      .setDescription(
        details?.description.length
          ? details.description
          : "No description available."
      )
      .setColor(0x00ffff)
      .setAuthor({
        name: "Zora",
        iconURL: "https://zora.co/assets/og-image.png",
      })
      .addFields(
        {
          name: "NETWORK",
          value: details?.networkInfo?.network.length
            ? details.networkInfo.network
            : "Unknown",
          inline: true,
        },
        {
          name: "CHAIN",
          value: details?.networkInfo?.chain.length
            ? details.networkInfo.chain
            : "Unknown",
          inline: true,
        },
        {
          name: "ADDRESS",
          value: details?.address?.length ? details.address : "Unknown",
        },
        {
          name: "SYMBOL",
          value: details?.symbol?.length ? details.symbol : "Unknown",
          inline: true,
        },
        {
          name: "TOTAL SUPPLY",
          value: details.totalSupply ? details.totalSupply : "Unknown",
          inline: true,
        }
      );
    embeds.push(embed);

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

  },
};
