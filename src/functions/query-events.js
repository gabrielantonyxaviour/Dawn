import { ZDK, ZDKNetwork, ZDKChain } from "@zoralabs/zdk";

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
// refer https://docs.zora.co/docs/zora-api/zdk#events

zdk
  .events({
    where: {
      collectionAddresses: "0x42069ABFE407C60cf4ae4112bEDEaD391dBa1cdB",
      //   tokens:
    },
    // filter: {
    //   bidderAddresses
    //   eventTypes
    //   recipientAddresses
    //   sellerAddresses
    //   senderAddresses
    //   timeFilter
    // },
    // pagination: {},
    // sort: {},
  })
  .then((result) => {
    console.log(JSON.stringify(result, null, 2));
  });

// import { ZDK } from "@zoralabs/zdk";

// async function fetchEvents(zdk, collectionAddresses) {
//   return await zdk.events({
//     collectionAddresses,
//   });
// }

// const zdk = new ZDK("https://api.zora.co/graphql");
// const events = await fetchEvents(
//   zdk,
//   "0x5180db8F5c931aaE63c74266b211F580155ecac8"
// );
// console.log(events);
