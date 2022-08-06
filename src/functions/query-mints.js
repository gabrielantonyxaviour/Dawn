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
// refer https://docs.zora.co/docs/zora-api/zdk#mints
zdk
  .mints({
    where: {
      collectionAddresses: ["0xc729Ce9bF1030fbb639849a96fA8BBD013680B64"],
    },
  })
  .then((result) => {
    console.log(JSON.stringify(result, null, 2));
  });

// import { ZDK } from "@zoralabs/zdk";

// async function fetchMints(
//   zdk,
//   collectionAddresses,
//   minterAddresses,
//   recipientAddresses
// ) {
//   return await zdk.mints({
//     where: {
//       collectionAddresses,
//       minterAddresses,
//       recipientAddresses,
//     },
//   });
// }

// const zdk = new ZDK("https://api.zora.co/graphql");
// const mints = await fetchMints(
//   zdk,
//   "0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03"
// );
// console.log(JSON.stringify(mints, null, 2));
