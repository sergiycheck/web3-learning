import { MetaMaskInpageProvider } from "@metamask/providers";
import type { PublicKey } from "@solana/web3.js";

type PhantomEvent = "disconnect" | "connect" | "accountChanged";

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

interface PhantomProvider {
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, callback: (args: any) => void) => void;
  isPhantom: boolean;
}

declare global {
  interface Window {
    // @ts-ignore
    ethereum: MetaMaskInpageProvider;
    opera: any;
    solana?: PhantomProvider;
  }
}

export {};
