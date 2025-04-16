import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { walletState } from "../state/wallet";
import { ethers } from "ethers";
import OpinexABI from "../abis/Opinex.json";
import { toast } from "sonner";
import { contractState } from "../state/contract";

const OPINEX_ADDRESS = "0x73e1BF93CC88B56a00f6D57A0a91dB18F424C458"; // Replace with deployed address

function QuestionCard() {
  const wallet = useRecoilValue(walletState);
  const contract = useRecoilValue(contractState);

  const [question, setQuestion] = useState(null);
  const [betAmount, setBetAmount] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [stakes, setStakes] = useState({});

  useEffect(() => {
    if (wallet.connected) {
      fetchQuestion();
      const interval = setInterval(fetchQuestion, 60000); // Poll every minute
      return () => clearInterval(interval);
    }
  }, [wallet.connected, contract]);

  useEffect(() => {
    console.log("GETTING ..");
    async function getOwner() {
      const owner = await contract.getQuestion(0);
      console.log("ower N ", owner.options[0]);

      return owner;
    }

    if (contract) {
      console.log("conasdf : ", getOwner());
    }
  }, [contract]);

  const fetchQuestion = async () => {
    try {
      console.log("contrafct : ", contract);

      const qLength = await contract.owner;
      console.log("questions length : ", qLength);

      if (qLength > 0) {
        const latestId = qLength - 1;
        const q = await contract.getQuestion(latestId);
        if (q.isActive) {
          const stakeData = {};
          for (const option of q.options) {
            const stake = await contract.getOptionStakes(latestId, option);
            stakeData[option] = ethers.formatEther(stake);
          }
          setQuestion({
            id: latestId,
            topic: q.topic,
            question: q.question,
            options: q.options,
            totalPool: ethers.formatEther(q.totalPool),
          });
          setStakes(stakeData);
        }
      }
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  const placeBet = async () => {
    if (!selectedOption || !betAmount || parseFloat(betAmount) <= 0) {
      toast.error("Select an option and enter a valid amount");
      return;
    }
    try {
      const contract = new ethers.Contract(
        OPINEX_ADDRESS,
        OpinexABI,
        wallet.signer
      );
      const tx = await contract.placeBet(question.id, selectedOption, {
        value: ethers.parseEther(betAmount),
      });
      await tx.wait();
      toast.success("Bet placed successfully!");
      setBetAmount("");
      fetchQuestion();
    } catch (error) {
      toast.error("Failed to place bet");
      console.error(error);
    }
  };

  const withdraw = async () => {
    try {
      const contract = new ethers.Contract(
        OPINEX_ADDRESS,
        OpinexABI,
        wallet.signer
      );
      const tx = await contract.withdraw(question.id);
      await tx.wait();
      toast.success("Withdrawn successfully!");
      fetchQuestion();
    } catch (error) {
      toast.error("Failed to withdraw");
      console.error(error);
    }
  };

  if (!question) {
    return (
      <div className="card bg-base-100 shadow-xl p-4">
        Loading or no active question...
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{question.topic}</h2>
        <p className="text-lg">{question.question}</p>
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-4">
              <input
                type="radio"
                name="option"
                value={option}
                checked={selectedOption === option}
                onChange={() => setSelectedOption(option)}
                className="radio radio-primary"
              />
              <span>{option}</span>
              <progress
                className="progress progress-primary w-56"
                value={
                  stakes[option]
                    ? (stakes[option] / question.totalPool) * 100
                    : 0
                }
                max="100"
              ></progress>
              <span>{stakes[option] ? `${stakes[option]} ETH` : "0 ETH"}</span>
            </div>
          ))}
        </div>
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Bet Amount (ETH)</span>
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              step="0.01"
              min="0"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              className="input input-bordered w-full max-w-xs"
              placeholder="0.1"
            />
            <button className="btn btn-primary" onClick={placeBet}>
              Place Bet
            </button>
            <button className="btn btn-secondary" onClick={withdraw}>
              Withdraw
            </button>
          </div>
        </div>
        <p className="mt-4">Total Pool: {question.totalPool} ETH</p>
      </div>
    </div>
  );
}

export default QuestionCard;
