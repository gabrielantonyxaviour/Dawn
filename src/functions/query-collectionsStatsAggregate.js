import { ZDK, ZDKNetwork, ZDKChain } from "@zoralabs/zdk";

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
// Refer: https://docs.zora.co/docs/zora-api/zdk#collectionstatsaggregate
var collectionStatsAggregate = zdk
  .collectionStatsAggregate({
    collectionAddress: "0xCa21d4228cDCc68D4e23807E5e370C07577Dd152",
  })
  .then((result) => {
    console.log(JSON.stringify(result, null, 2));
  });

// import { ZDK } from "@zoralabs/zdk";

// async function fetchCollectionStats(zdk, collectionAddress) {
//   return await zdk.collectionStatsAggregate({
//     collectionAddress,
//   });
// }

// const zdk = new ZDK("https://api.zora.co/graphql");
// const collectionStats = await fetchCollectionStats(
//   zdk,
//   "0x5180db8F5c931aaE63c74266b211F580155ecac8"
// );
// console.log(collectionStats);
