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
//docs.zora.co/docs/zora-api/zdk#tokens
// zdk
//   .tokens({
//     where: {
//       collectionAddresses: "0x5180db8F5c931aaE63c74266b211F580155ecac8",
//     },
//   })
//   .then((result) => {
//     writeToFile("query-tokens", result);
//     console.log(JSON.stringify(result, null, 2));
//   });

// import { ZDK } from "@zoralabs/zdk";

async function fetchTokens(collectionAddresses) {
  return await zdk.tokens({
    where: {
      collectionAddresses,
    },
  });
}

module.exports = {
  fetchTokens
}

// const zdk = new ZDK("https://api.zora.co/graphql");
// const tokens = await fetchTokens(
//   zdk,
//   "0x5180db8F5c931aaE63c74266b211F580155ecac8"
// );
// console.log(JSON.stringify(tokens, null, 2));
