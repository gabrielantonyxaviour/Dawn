const { SlashCommandBuilder } = require("discord.js");
const { fetchEvents, fetchEventsforTokenId } = require("../functions/query-events");
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
    )
    .addStringOption((option) =>
      option
        .setName("token_id")
        .setDescription("Token ID to filter by")
    )
    .addStringOption((option) =>
      option
        .setName("event_type")
        .setDescription("List of all event types")
        .addChoices(
          { name: 'APPROVAL EVENT', value: 'APPROVAL_EVENT' },
          { name: 'TRANSFER EVENT', value: 'TRANSFER_EVENT' },
          { name: 'SALE EVENT', value: 'SALE_EVENT' },
          { name: 'MINT EVENT', value: 'MINT_EVENT' },
          { name: 'V1 MARKET EVENT', value: 'V1_MARKET_EVENT' },
          { name: 'V2 AUCTION EVENT', value: 'V2_AUCTION_EVENT' },
          { name: 'V3 ASK EVENT', value: 'V3_ASK_EVENT' },

        )),
  async execute(interaction) {
    let address = interaction.options.get("address").value;
    let eventTypes = interaction.options.get("event_type")?.value;
    let tokenId = interaction.options.get("token_id")?.value;
    await interaction.deferReply();
    let tokenDetails;
    if (tokenId) {
      if (eventTypes) {
        tokenDetails = await fetchEventsforTokenId(address, tokenId, [eventTypes]);
      } else {
        tokenDetails = await fetchEventsforTokenId(address, tokenId);
      }
    } else {
      if (eventTypes) {
        tokenDetails = await fetchEvents(address, [eventTypes]);
      } else {
        tokenDetails = await fetchEvents(address);
      }
    }

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
