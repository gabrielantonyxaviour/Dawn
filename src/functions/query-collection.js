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
// Refer: https://docs.zora.co/docs/zora-api/zdk#collection

// var collection = zdk
//   .collection({ address: "0x42069ABFE407C60cf4ae4112bEDEaD391dBa1cdB" })
//   .then((result) => {
//     console.log(JSON.stringify(result, null, 2));
//   });

//   import {ZDK} from '@zoralabs/zdk';

async function fetchCollection(address) {
  return await zdk.collection({
    address
  })
}


// const zdk = new ZDK("https://api.zora.co/graphql");
// const collection = await fetchCollection(zdk, '0x5180db8F5c931aaE63c74266b211F580155ecac8');
// console.log(JSON.stringify(collection, null, 2));

module.exports = {
  fetchCollection
}