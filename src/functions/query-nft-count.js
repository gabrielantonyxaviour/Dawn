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

async function fetchNftCountForCollection(address) {
  return await zdk.nftCount({
    where: {
      collectionAddresses: [address],
    },
  });
}

module.exports = { fetchNftCountForCollection };
