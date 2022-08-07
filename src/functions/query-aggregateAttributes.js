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

async function fetchAggregateAttributes(collectionAddresses) {
  return await zdk.aggregateAttributes({
    where: {
      collectionAddresses,
    },
  });
}
async function fetchAggregateAttributesWithTokenId(
  collectionAddresses,
  tokenId
) {
  return await zdk.aggregateAttributes({
    where: {
      tokens: [
        {
          address: collectionAddresses,
          tokenId,
        },
      ],
    },
  });
}

module.exports = {
  fetchAggregateAttributes,
  fetchAggregateAttributesWithTokenId,
};
