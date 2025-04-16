import OpinexABI from "../abis/Opinex.json";

const getCurrentWallet = async (walletStatus) => {
  if (window.ethereum || !walletStatus) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts", // this method returns the metamask connected accounts in realtime(altho you have to call it wraped up in the function)
      });

      if (addressArray.length > 0) {
        const chainHex = await window.ethereum.request({
          method: "eth_chainId",
        });

        const chainId = parseInt(chainHex, 16);

        // contract initialization
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractAddress = import.meta.env.VITE_API_VOTING_CONTRACTADDRESS;
        const contractInstance = new ethers.Contract(
          contractAddress,
          OpinexABI,
          signer
        );

        return {
          selectedAccount: addressArray[0],
          contractInstance,
          chainId,
          status: true,
        };
      } else {
        return {
          status: false,
          error: "please have atleast one account !",
        };
      }
    } catch (err) {
      return {
        status: false,
        error: err.message,
      };
    }
  } else {
    return {
      status: false,
      error: "please install metamask and come back !",
    };
  }
};
