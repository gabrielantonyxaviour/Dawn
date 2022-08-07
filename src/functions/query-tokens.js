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

async function fetchTokens(collectionAddresses) {
  return await zdk.tokens({
    where: {
      collectionAddresses,
    },
  });
}

async function fetchTokensWithTokenId(collectionAddresses, tokenId) {
  return await zdk.tokens({
    where: {
      tokens: [
        {
          address: collectionAddresses,
          tokenId,
        },
      ],
    },
  });
}

module.exports = {
  fetchTokens,
  fetchTokensWithTokenId,
};