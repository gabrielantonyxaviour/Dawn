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
//docs.zora.co/docs/zora-api/zdk#token
// zdk
//   .token({
//     token: {
//       address: "0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7",
//       tokenId: "3366",
//     },
//     includeFullDetails: true,
//   })
//   .then((result) => {
//     writeToFile('query-token', result);
//     console.log(JSON.stringify(result, null, 2));
//   });

// import { ZDK } from "@zoralabs/zdk";

async function fetchToken(address, tokenId) {
  return await zdk.token({
    token: {
      address,
      tokenId,
    },
    includeFullDetails: true,
  });
}

module.exports = {
  fetchToken,
}

// const zdk = new ZDK("https://api.zora.co/graphql");
// const token = await fetchToken(
//   zdk,
//   "0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7",
//   "3366"
// );
// console.log(JSON.stringify(token, null, 2));
