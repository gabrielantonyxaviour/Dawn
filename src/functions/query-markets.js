import { ZDK, ZDKNetwork, ZDKChain } from "@zoralabs/zdk";

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
// refer https://docs.zora.co/docs/zora-api/zdk#markets
zdk
  .markets({
    where: {
      collectionAddresses: ["0xc729Ce9bF1030fbb639849a96fA8BBD013680B64"],
    },
  })
  .then((result) => {
    console.log(JSON.stringify(result, null, 2));
  });

// import { ZDK } from "@zoralabs/zdk";

// async function fetchMarkets(address) {
//   return await zdk.markets({
//     where: {
//       collectionAddresses: [address],
//     },
//     pagination: {
//       limit: 4,
//     },
//   });
// }

// const zdk = new ZDK("https://api.zora.co/graphql");
// const markets = await fetchMarkets(
//   "0x5180db8F5c931aaE63c74266b211F580155ecac8"
// );
// console.log(JSON.stringify(markets, null, 2));
