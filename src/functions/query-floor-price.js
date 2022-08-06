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
// refer https://docs.zora.co/docs/zora-api/zdk#floorprice

zdk
  .floorPrice({
    where: {
      collectionAddresses: ["0xc729Ce9bF1030fbb639849a96fA8BBD013680B64"],
      attributes: {
        traitType: "Legendary",
        value: "Cryptoad Dickbutt",
      },
    },
  })
  .then((result) => {
    console.log(JSON.stringify(result, null, 2));
  });

// import { ZDK } from "@zoralabs/zdk";

// async function fetchFloorPrice(addresses) {
//   return await zdk.floorPrice({
//     where: {
//       collectionAddresses: [addresses],
//     },
//   });
// }

// const zdk = new ZDK("https://api.zora.co/graphql");
// const floorPrice = await fetchFloorPrice(
//   "0x5180db8F5c931aaE63c74266b211F580155ecac8"
// );
// console.log(floorPrice);
