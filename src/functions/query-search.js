const { ZDK, ZDKNetwork, ZDKChain } = require("@zoralabs/zdk");

//---------------------- ERROR-------------------------
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
//docs.zora.co/docs/zora-api/zdk#search
// zdk
//   .search({
//     query: "crypto",
//   })
//   .then((result) => {
//     writeToFile('query-search', result)
//     // console.log(JSON.stringify(result, null, 2));
//   });

// import { ZDK } from "@zoralabs/zdk";

async function search(key) {
  return await zdk.search({
    query: key,
  });
}

module.exports = {
  search,
}

// const zdk = new ZDK("https://api.zora.co/graphql");
// const salesVolume = await search(
//   zdk,
//   "0x5180db8F5c931aaE63c74266b211F580155ecac8"
// );
// console.log(JSON.stringify(salesVolume, null, 2));
