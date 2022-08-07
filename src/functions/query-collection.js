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

async function fetchCollection(address) {
  return await zdk.collection({
    address,
  });
}

zdk
  .collection({
    address: "0x5180db8f5c931aae63c74266b211f580155ecac8",
  })
  .then((result) => console.log(JSON.stringify(result, null, 2)));

module.exports = {
  fetchCollection,
};
