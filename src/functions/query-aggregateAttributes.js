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
// Refer: https://docs.zora.co/docs/zora-api/zdk#aggregateattributes
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
// zdk
//   .aggregateAttributes({
//     where: {
//       tokens: [
//         {
//           address: "0x5180db8F5c931aaE63c74266b211F580155ecac8",
//           tokenId: "5717",
//         },
//       ],
//     },
//   })
//   .then((result) => console.log(JSON.stringify(result, null, 2)));

module.exports = {
  fetchAggregateAttributes,
  fetchAggregateAttributesWithTokenId,
};
