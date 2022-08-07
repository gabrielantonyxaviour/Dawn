const { SlashCommandBuilder } = require("discord.js");
const {
  fetchAggregateAttributes,
  fetchAggregateAttributesWithTokenId
} = require("../functions/query-aggregateAttributes");
const {
  pagination,
  TypesButtons,
  StylesButton,
} = require("@devraelfreeze/discordjs-pagination");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dawn-nfprops")
    .setDescription("Gets statistics on all the attributes for a collection.")
    .addStringOption((option) =>
      option
        .setName("address")
        .setRequired(true)
        .setDescription("The address of the collection")
    )
    .addStringOption((option) =>
      option
        .setName("token_id")
        .setDescription("The token_id of the NFT to get properties for")
    ),
  async execute(interaction) {
    let address = interaction.options.get("address").value;
    let tokenId = interaction.options.get("token_id")?.value;
    await interaction.deferReply();
    try {
      let details;
      if (tokenId) {
        details = await fetchAggregateAttributesWithTokenId(
          address,
          tokenId
        );
      } else {
        details = await fetchAggregateAttributes(address);
      }
      let traitType = [];
      let traitValue = [];
      let percent = [];
      details.aggregateAttributes.forEach((attribute) => {
        attribute.valueMetrics.forEach((value) => {
          traitType.push(attribute.traitType);
          traitValue.push(value.value);
          percent.push(value.percent);
        });
      });

      let embeds = [];

      let totalLength = traitType.length;
      let pageLength = 25;
      let pages = Math.ceil(totalLength / pageLength);

      for (let i = 0; i < pages; i++) {
        let start = i * pageLength;
        let end = (i + 1) * pageLength;
        let embed = new EmbedBuilder()
          .setTitle("Attributes")
          .setDescription(address)
          .setColor(0x00ffff)
          .setAuthor({
            name: "Zora",
            iconURL: "https://zora.co/assets/og-image.png",
          })
          .addFields(
            {
              name: "Trait Type",
              value: traitType.slice(start, end).join("\n"),
              inline: true,
            },
            {
              name: "Trait Value",
              value: traitValue.slice(start, end).join("\n"),
              inline: true,
            },
            {
              name: "Percent",
              value: percent.slice(start, end).join("\n"),
              inline: true,
            }
          );
        embeds.push(embed);
      }
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
