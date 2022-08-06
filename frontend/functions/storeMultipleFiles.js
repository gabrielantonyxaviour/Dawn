// This is for Zora NFT Drop
import { NFTStorage, File, Blob } from "nft.storage";
const API_TOKEN = process.env.NFT_STORAGE_AUTH_KEY;
export function storeMultipleFiles(files) {
  const client = new NFTStorage({ token: API_TOKEN });
  client
    .storeDirectory(files)
    .then((response) => {
      console.log(response);
      console.log("Files stored successfully");
      return response;
    })
    .catch((error) => console.log(error));
}

// Send the files as an Array of ====> new File(file, <filename>) <==== objects.

// ------------------------ SAMPLE ------------------------------
// const cid = await client.storeDirectory([
//     new File(['hello world'], 'hello.txt'),
//     new File([JSON.stringify({'from': 'incognito'}, null, 2)], 'metadata.json')
//   ])
