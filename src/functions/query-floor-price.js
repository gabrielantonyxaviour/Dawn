const { ZDK, ZDKNetwork, ZDKChain } = require("@zoralabs/zdk");
const { writeToFile } = require("../writeToFile");
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
