import { useMoralis, useWeb3Contract } from "react-moralis";

const ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_erc20TransferHelper",
        type: "address",
      },
      {
        internalType: "address",
        name: "_erc721TransferHelper",
        type: "address",
      },
      { internalType: "address", name: "_royaltyEngine", type: "address" },
      {
        internalType: "address",
        name: "_protocolFeeSettings",
        type: "address",
      },
      { internalType: "address", name: "_wethAddress", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenContract",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        components: [
          { internalType: "address", name: "seller", type: "address" },
          {
            internalType: "address",
            name: "sellerFundsRecipient",
            type: "address",
          },
          { internalType: "address", name: "askCurrency", type: "address" },
          { internalType: "uint16", name: "findersFeeBps", type: "uint16" },
          { internalType: "uint256", name: "askPrice", type: "uint256" },
        ],
        indexed: false,
        internalType: "struct AsksV1_1.Ask",
        name: "ask",
        type: "tuple",
      },
    ],
    name: "AskCanceled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenContract",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        components: [
          { internalType: "address", name: "seller", type: "address" },
          {
            internalType: "address",
            name: "sellerFundsRecipient",
            type: "address",
          },
          { internalType: "address", name: "askCurrency", type: "address" },
          { internalType: "uint16", name: "findersFeeBps", type: "uint16" },
          { internalType: "uint256", name: "askPrice", type: "uint256" },
        ],
        indexed: false,
        internalType: "struct AsksV1_1.Ask",
        name: "ask",
        type: "tuple",
      },
    ],
    name: "AskCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenContract",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "finder",
        type: "address",
      },
      {
        components: [
          { internalType: "address", name: "seller", type: "address" },
          {
            internalType: "address",
            name: "sellerFundsRecipient",
            type: "address",
          },
          { internalType: "address", name: "askCurrency", type: "address" },
          { internalType: "uint16", name: "findersFeeBps", type: "uint16" },
          { internalType: "uint256", name: "askPrice", type: "uint256" },
        ],
        indexed: false,
        internalType: "struct AsksV1_1.Ask",
        name: "ask",
        type: "tuple",
      },
    ],
    name: "AskFilled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenContract",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        components: [
          { internalType: "address", name: "seller", type: "address" },
          {
            internalType: "address",
            name: "sellerFundsRecipient",
            type: "address",
          },
          { internalType: "address", name: "askCurrency", type: "address" },
          { internalType: "uint16", name: "findersFeeBps", type: "uint16" },
          { internalType: "uint256", name: "askPrice", type: "uint256" },
        ],
        indexed: false,
        internalType: "struct AsksV1_1.Ask",
        name: "ask",
        type: "tuple",
      },
    ],
    name: "AskPriceUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "userA",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "userB",
        type: "address",
      },
      {
        components: [
          { internalType: "address", name: "tokenContract", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        indexed: false,
        internalType: "struct UniversalExchangeEventV1.ExchangeDetails",
        name: "a",
        type: "tuple",
      },
      {
        components: [
          { internalType: "address", name: "tokenContract", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        indexed: false,
        internalType: "struct UniversalExchangeEventV1.ExchangeDetails",
        name: "b",
        type: "tuple",
      },
    ],
    name: "ExchangeExecuted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenContract",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RoyaltyPayout",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "_tokenContract", type: "address" },
      { internalType: "uint256", name: "_tokenId", type: "uint256" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "address", name: "_payoutCurrency", type: "address" },
    ],
    name: "_handleRoyaltyEnginePayout",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "askForNFT",
    outputs: [
      { internalType: "address", name: "seller", type: "address" },
      {
        internalType: "address",
        name: "sellerFundsRecipient",
        type: "address",
      },
      { internalType: "address", name: "askCurrency", type: "address" },
      { internalType: "uint16", name: "findersFeeBps", type: "uint16" },
      { internalType: "uint256", name: "askPrice", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_tokenContract", type: "address" },
      { internalType: "uint256", name: "_tokenId", type: "uint256" },
    ],
    name: "cancelAsk",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_tokenContract", type: "address" },
      { internalType: "uint256", name: "_tokenId", type: "uint256" },
      { internalType: "uint256", name: "_askPrice", type: "uint256" },
      { internalType: "address", name: "_askCurrency", type: "address" },
      {
        internalType: "address",
        name: "_sellerFundsRecipient",
        type: "address",
      },
      { internalType: "uint16", name: "_findersFeeBps", type: "uint16" },
    ],
    name: "createAsk",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "erc20TransferHelper",
    outputs: [
      {
        internalType: "contract ERC20TransferHelper",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "erc721TransferHelper",
    outputs: [
      {
        internalType: "contract ERC721TransferHelper",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_tokenContract", type: "address" },
      { internalType: "uint256", name: "_tokenId", type: "uint256" },
      { internalType: "address", name: "_fillCurrency", type: "address" },
      { internalType: "uint256", name: "_fillAmount", type: "uint256" },
      { internalType: "address", name: "_finder", type: "address" },
    ],
    name: "fillAsk",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "registrar",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_tokenContract", type: "address" },
      { internalType: "uint256", name: "_tokenId", type: "uint256" },
      { internalType: "uint256", name: "_askPrice", type: "uint256" },
      { internalType: "address", name: "_askCurrency", type: "address" },
    ],
    name: "setAskPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_royaltyEngine", type: "address" },
    ],
    name: "setRoyaltyEngineAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

function createAsk({ contractAddress, tokenId, askPrice, findersFeeBps }) {
  const { contract, account } = useMoralis();
  const { createAsk } = useWeb3Contract(contract);
  return createAsk(
    ask.title,
    ask.description,
    ask.price,
    ask.category,
    ask.tags
  );
}
