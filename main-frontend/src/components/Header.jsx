import { useRecoilValue } from "recoil";
import { walletState } from "../state/wallet";

function Header({ connectWallet }) {
  const wallet = useRecoilValue(walletState);

  return (
    <header className="navbar bg-primary text-primary-content shadow-lg">
      <div className="flex-1">
        <h1 className="text-2xl font-bold">Opinex Prediction Market</h1>
      </div>
      <div className="flex-none">
        {wallet.connected ? (
          <div className="btn btn-ghost">
            {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
          </div>
        ) : (
          <button className="btn btn-accent" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
