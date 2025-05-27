const { ethers } = await import("npm:ethers@6.10.0");

const apiUrl = "https://c3b7-152-58-244-215.ngrok-free.app/trending";

const RPC_URL = "https://ethereum.publicnode.com";

const response = await Functions.makeHttpRequest({
  url: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

if (response.error) {
  console.error(response.error);
  throw Error("Request failed");
}

const data = response.data;
//  removed data.options from below condition for testing purpose.
if (!data.topic || !data.question) {
  throw Error("Invalid data format");
}

// Chainlink Functions compatible Ethers JSON RPC provider class
// (this is required for making Ethers RPC calls with Chainlink Functions)
class FunctionsJsonRpcProvider extends ethers.JsonRpcProvider {
  constructor(url) {
    super(url);
    this.url = url;
  }
  async _send(payload) {
    let resp = await fetch(this.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return resp.json();
  }
}

const provider = new FunctionsJsonRpcProvider(RPC_URL);

const topic = data.topic;
const question = data.question;
// const options = data.options;

const abiCoder = ethers.AbiCoder.defaultAbiCoder();

console.log("topic : ", data.topic);
console.log("question : ", data.question);

// Encode as (string, string, string[])
const encodedData = abiCoder.encode(
  ["string", "string"],
  [topic, question]
);

// Return as Uint8Array for Chainlink Functions
return ethers.getBytes(encodedData);
