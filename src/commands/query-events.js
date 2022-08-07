const { SlashCommandBuilder } = require("discord.js");
const { fetchEvents } = require("../functions/query-events");
const {
  pagination,
  TypesButtons,
  StylesButton,
} = require("@devraelfreeze/discordjs-pagination");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dawn-nfevents")
    .setDescription(
      "Gets all the events associated with a collection, token, or owner address."
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
    let tokenDetails = await fetchEvents(address);
    let events = [];

    tokenDetails.events.nodes.forEach((event) => {
      events.push({
        token_id: event.tokenId ? event.tokenId : "Unknown",
        collection_address: event.collectionAddress
          ? event.collectionAddress
          : "Unknown",
        event_type: event.eventType ? event.eventType : "Unknown",
        transaction_hash: event.transactionInfo.transactionHash
          ? event.transactionInfo.transactionHash
          : "Unknown",
        block_timestamp: event.transactionInfo.blockTimestamp
          ? event.transactionInfo.blockTimestamp
          : "Unknown",
      });
    });

    let embeds = [];

    events.forEach((event) => {
      let embed = new EmbedBuilder()
        .setTitle(`Event Details`)
        .setDescription(
          "Gets all the events associated with a collection, token, or owner address e.g. Transfers, Mints, Sales, Approvals."
        )
        .setColor(0x00ffff)
        .setAuthor({
          name: "Zora",
          iconURL: "https://zora.co/assets/og-image.png",
        })
        .addFields(
          { name: "TOKEN ID", value: event.token_id },
          { name: "COLLECTION ADDRESS", value: event.collection_address },
          { name: "EVENT TYPE", value: event.event_type },
          { name: "BLOCK TIMESTAMP", value: event.block_timestamp },
          { name: "TRANSACTION HASH", value: event.transaction_hash }
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
  },
};
