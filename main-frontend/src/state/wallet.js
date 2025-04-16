import { atom } from "recoil";

export const walletState = atom({
  key: "walletState",
  default: {
    address: "",
    provider: null,
    signer: null,
    connected: false,
    error: null,
  },
});
