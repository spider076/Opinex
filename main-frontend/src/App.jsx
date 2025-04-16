import { ethers } from "ethers";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Toaster, toast } from "sonner";
import HistoryTable from "./components/HistoryTable";
import QuestionCard from "./components/QuestionCard";
import { walletState } from "./state/wallet";
import Header from "./components/Header";
import { contractState } from "./state/contract";

import OpinexABI from "./abis/Opinex.json";

function App() {
  const [, setWallet] = useRecoilState(walletState);
  const [, setContract] = useRecoilState(contractState);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = accounts[0];
        const network = await provider.getNetwork();
        if (network.chainId !== BigInt(11155111)) {
          toast.error("Please switch to Sepolia testnet");
          return;
        }

        // contract initialization
        const contractAddress = import.meta.env.VITE_API_OPINEX_ADDRESS;
        const contractInstance = new ethers.Contract(
          contractAddress,
          OpinexABI,
          signer
        );

        setContract(contractInstance);

        setWallet((prev) => ({
          ...prev,
          address,
          provider,
          signer,
          connected: true,
        }));
        toast.success(
          `Connected: ${address.slice(0, 6)}...${address.slice(-4)}`
        );
      } catch (error) {
        toast.error("Failed to connect wallet");
        console.error(error);
      }
    } else {
      toast.error("MetaMask not detected");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        connectWallet();
      });
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-base-200">
      <Header connectWallet={connectWallet} />
      <main className="container mx-auto p-4 space-y-8">
        <QuestionCard />
        <HistoryTable />
      </main>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
