import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { walletState } from "../state/wallet";
import { ethers } from "ethers";
import OpinexABI from "../abis/Opinex.json";

const OPINEX_ADDRESS = "YOUR_OPINEX_CONTRACT_ADDRESS"; // Replace with deployed address

function HistoryTable() {
  const wallet = useRecoilValue(walletState);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (wallet.connected) {
      fetchHistory();
    }
  }, [wallet.connected]);

  const fetchHistory = async () => {
    try {
      const contract = new ethers.Contract(
        OPINEX_ADDRESS,
        OpinexABI,
        wallet.provider
      );
      const qLength = await contract.questions.length();
      const qList = [];
      for (let i = 0; i < qLength; i++) {
        const q = await contract.getQuestion(i);
        qList.push({
          id: i,
          topic: q.topic,
          question: q.question,
          options: q.options,
          totalPool: ethers.formatEther(q.totalPool),
          isActive: q.isActive,
          winningOption: q.winningOption,
        });
      }
      setQuestions(qList.reverse()); // Latest first
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Question History</h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Topic</th>
                <th>Question</th>
                <th>Options</th>
                <th>Pool (ETH)</th>
                <th>Status</th>
                <th>Winner</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q) => (
                <tr key={q.id}>
                  <td>{q.id}</td>
                  <td>{q.topic}</td>
                  <td>{q.question}</td>
                  <td>{q.options.join(", ")}</td>
                  <td>{q.totalPool}</td>
                  <td>{q.isActive ? "Active" : "Resolved"}</td>
                  <td>{q.winningOption || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HistoryTable;
