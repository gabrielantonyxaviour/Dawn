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

async function fetchFloorPrice(address) {
  return await zdk.floorPrice({
    where: {
      collectionAddresses: [address],
    },
  });
}

async function fetchFloorPriceWithAttributes(address, traitType, traitValue) {
  return await zdk.floorPrice({
    where: {
      collectionAddresses: [address],
    },
    attributes: [
      {
        traitType: traitType,
        value: traitValue,
      },
    ],
  });
}

module.exports = { fetchFloorPrice, fetchFloorPriceWithAttributes };
