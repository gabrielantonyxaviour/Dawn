const { SlashCommandBuilder } = require("discord.js");
const { fetchSalesVolume } = require("../functions/query-sales-volume");
const {
  pagination,
  TypesButtons,
  StylesButton,
} = require("@devraelfreeze/discordjs-pagination");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("query-sales-volume")
    .setDescription(
      "Gets the number of unique addresses that own an NFT from a collection."
    )
    .addStringOption((option) =>
      option
        .setName("address")
        .setRequired(true)
        .setDescription("List of collection addresses to filter by")
    ),
  async execute(interaction) {
    let address = interaction.options.get("address").value;
    // await interaction.deferReply();
    let tokenDetails = await fetchSalesVolume(address);
    let embeds = [];

    let embed = new EmbedBuilder()
      .setTitle(`Total sales volume for ${address}`)
      .setDescription(
        "Gets the total sales volume for a collection across all marketplaces."
      )
      .setColor(0x00ffff)
      .setAuthor({
        name: "Zora",
        iconURL: "https://zora.co/assets/og-image.png",
      })
      .addFields({
        name: "OWNER COUNT",
        value: String("noice"),
      });
    embeds.push(embed);

    // let paginationContent = await pagination({
    //   embeds: embeds, // Array of embeds objects
    //   author: interaction.member.user,
    //   interaction: interaction,
    //   ephemeral: true,
    //   time: 120000, // 120 seconds
    //   fastSkip: false,
    //   pageTravel: false,
    //   buttons: [
    //     {
    //       value: TypesButtons.previous,
    //       label: "Previous Page",
    //       style: StylesButton.Primary,
    //       emoji: null,
    //     },
    //     {
    //       value: TypesButtons.next,
    //       label: "Next Page",
    //       style: StylesButton.Success,
    //       emoji: null,
    //     },
    //   ],
    // });
    await interaction.reply("cool");
  },
};
