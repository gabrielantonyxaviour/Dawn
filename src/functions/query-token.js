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