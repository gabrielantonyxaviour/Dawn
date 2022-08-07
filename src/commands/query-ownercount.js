const { SlashCommandBuilder } = require("discord.js");
const { fetchOwnerCount } = require("../functions/query-owner-count");
const {
  pagination,
  TypesButtons,
  StylesButton,
} = require("@devraelfreeze/discordjs-pagination");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dawn-nfliquidity")
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
    await interaction.deferReply();
    let tokenDetails = await fetchOwnerCount(address);
    try {
      let embeds = [];

      let embed = new EmbedBuilder()
        .setTitle(`Owner count for ${address}`)
        .setDescription(
          "Gets the number of unique addresses that own an NFT from a collection."
        )
        .setColor(0x00ffff)
        .setAuthor({
          name: "Zora",
          iconURL: "https://zora.co/assets/og-image.png",
        })
        .addFields({
          name: "OWNER COUNT",
          value: String(tokenDetails.aggregateStat.ownerCount),
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
    } catch {
      await interaction.editReply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};
