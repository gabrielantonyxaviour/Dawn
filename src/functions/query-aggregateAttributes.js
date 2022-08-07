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
// zdk
//   .aggregateAttributes({
//     where: {
//       collectionAddresses: "0x42069ABFE407C60cf4ae4112bEDEaD391dBa1cdB",
//     },
//   })
//   .then((result) => {
//     console.log(JSON.stringify(result, null, 2));
//   });

// import { ZDK } from "@zoralabs/zdk";

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
// const zdk = new ZDK("https://api.zora.co/graphql");
// const aggregateAttributes = await fetchAggregateAttributes(
//   zdk,
//   "0x5180db8F5c931aaE63c74266b211F580155ecac8"
// );
// console.log(JSON.stringify(aggregateAttributes, null, 2));

module.exports = {
  fetchAggregateAttributes,
  fetchAggregateAttributesWithTokenId,
};
