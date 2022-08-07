const { ZDK, ZDKNetwork, ZDKChain } = require("@zoralabs/zdk");

const networkInfo = {
  network: ZDKNetwork.Ethereum,
  chain: ZDKChain.Mainnet,
};

const API_ENDPOINT = "https://api.zora.co/graphql";
const args = {
  endPoint: API_ENDPOINT,
  networks: [networkInfo],
};

const zdk = new ZDK(args);
// refer https://docs.zora.co/docs/zora-api/zdk#events

async function fetchEvents(
  collectionAddresses,
  eventTypes = [
    "APPROVAL_EVENT",
    "TRANSFER_EVENT",
    "SALE_EVENT",
    "MINT_EVENT",
    "V1_MARKET_EVENT",
    "V2_AUCTION_EVENT",
    "V3_ASK_EVENT",
  ]
) {
  return await zdk.events({
    where: {
      collectionAddresses,
    },
    sort: {
      direction: "DESC",
      sortKey: "CREATED",
    },
    filter: {
      eventTypes: eventTypes,
    },
  });
}

async function fetchEventsforTokenId(
  collectionAddress,
  tokenId,
  eventTypes = [
    "APPROVAL_EVENT",
    "TRANSFER_EVENT",
    "SALE_EVENT",
    "MINT_EVENT",
    "V1_MARKET_EVENT",
    "V2_AUCTION_EVENT",
    "V3_ASK_EVENT",
  ]
) {
  return await zdk.events({
    where: {
      tokens: [
        {
          address: collectionAddress,
          tokenId,
        },
      ],
    },
    sort: {
      direction: "DESC",
      sortKey: "CREATED",
    },
    filter: {
      eventTypes: eventTypes,
    },
  });
}
module.exports = {
  fetchEvents,
  fetchEventsforTokenId,
};
