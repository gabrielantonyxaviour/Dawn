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
// Refer: https://docs.zora.co/docs/zora-api/zdk#collections

// async function fetchCollection(address) {
//   return await zdk.collections({
//     where: {
//       collectionAddresses: [
//         "0xCa21d4228cDCc68D4e23807E5e370C07577Dd152",
//         "0x42069ABFE407C60cf4ae4112bEDEaD391dBa1cdB",
//       ],
//     },
//     //OPTIONAL

//   });
// }
//   import {ZDK} from '@zoralabs/zdk';

async function fetchCollections(addresses) {
  return await zdk.collections({
    where: {
      collectionAddresses: [addresses],
    },
    includeFullDetails: true,
  });
}
zdk
  .collections({
    where: {
      collectionAddresses: "0x5180db8F5c931aaE63c74266b211F580155ecac8",
    },
    includeFullDetails: true,
  })
  .then((collections) => console.log(JSON.stringify(collections, null, 2)));
//   const zdk = new ZDK("https://api.zora.co/graphql");
//   const collections = await fetchCollections('0x5180db8F5c931aaE63c74266b211F580155ecac8');
//   console.log(JSON.stringify(collections, null, 2));

module.exports = {
  fetchCollections,
};
