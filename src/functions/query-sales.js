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
//docs.zora.co/docs/zora-api/zdk#sales
zdk
  .sales({
    where: {
      collectionAddresses: "0x5180db8F5c931aaE63c74266b211F580155ecac8",
    },
  })
  .then((result) => {
    console.log(JSON.stringify(result, null, 2));
  });

// import { ZDK } from "@zoralabs/zdk";

// async function fetchSales(zdk, collectionAddresses) {
//   return await zdk.sales({
//   where: {
//     collectionAddresses,
//   },
// });
// }

// const zdk = new ZDK("https://api.zora.co/graphql");
// const sales = await fetchSales(
//   zdk,
//   "0x5180db8F5c931aaE63c74266b211F580155ecac8"
// );
// console.log(JSON.stringify(sales, null, 2));
