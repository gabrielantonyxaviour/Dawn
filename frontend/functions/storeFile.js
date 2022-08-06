// This is for Zora NFT Edition and also to store Metadata
import { NFTStorage, File, Blob } from "nft.storage";

const API_TOKEN = process.env.NFT_STORAGE_AUTH_KEY;
export function storeFile(file) {
  const client = new NFTStorage({ token: API_TOKEN });
  client
    .storeBlob(file)
    .then((response) => {
      console.log(response);
      console.log("File stored successfully");
      return response;
    })
    .catch((error) => console.log(error));
}

// ------------------ SAMPLE ------------------------------
//
// const content = new Blob(['hello world'])
// const cid = await client.storeBlob(content)
// cid ////> 'zdj7Wn9FQAURCP6MbwcWuzi7u65kAsXCdjNTkhbJcoaXBusq9'
