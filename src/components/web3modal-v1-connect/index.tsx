import React from "react";

import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

import { Wallets } from "./Wallets/Wallets";
import Web3 from "web3";

const providersNames = {
  ethereum: {
    injected: "injected",
    walletconnect: "walletconnect",
    coinbasewallet: "coinbasewallet",
  },
  solana: {
    phantom: "phantom",
  },
};

const providerOptions = {
  injected: {
    display: {
      name: "Injected",
      description: "Connect with the provider in your Browser",
    },
    package: null,
  },
  walletconnect: {
    display: {
      name: "Mobile",
      description: "Scan qrcode with your mobile wallet",
    },
    package: WalletConnectProvider,
    options: {
      infuraId: "b5680133acfb4e909393c0190a66c437", // required
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Web 3 Modal Demo",
      infuraId: "b5680133acfb4e909393c0190a66c437",
    },
  },
};

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions, // required
});

export const ConnectWithWeb3ModalV1DiffWallets = () => {
  const [accounts, setAccounts] = React.useState<string[]>([]);

  React.useEffect(() => {
    function clearWeb3ModalCachedProvider() {
      web3Modal.clearCachedProvider();
    }
    clearWeb3ModalCachedProvider();
  });

  const handleConnectWallet = async (walletId: string) => {
    const predicate = (provider) => provider === walletId;

    if (Object.values(providersNames.ethereum).find(predicate)) {
      try {
        let provider = await web3Modal.connectTo(walletId);

        if (provider.isMetaMask) {
          const metamaskProvider = provider.providerMap.get("MetaMask");
          provider.selectedProvider = metamaskProvider;
        }

        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();

        const [account] = accounts;

        setAccounts((prev) => {
          if (prev.includes(account)) {
            return prev;
          }
          return [...prev, account];
        });
      } catch (error) {
        console.log(error);
      }
    } else if (Object.values(providersNames.solana).find(predicate)) {
      if (window?.solana?.isPhantom) {
        const { publicKey } = await window.solana.connect();
        const account = publicKey.toString();

        setAccounts((prev) => {
          if (prev.includes(account)) {
            return prev;
          }
          return [...prev, account];
        });
      }
    }
  };

  return (
    <div>
      <h2>Diff wallets connect wiht web3modal v1</h2>
      <h3>All accounts:</h3>
      {accounts?.map((account) => (
        <p key={account}>{account}</p>
      ))}
      <Wallets
        connectWalletTitlePText="Connect more wallets to access all of your 
            NFTs in a single profile."
        showStyledSignInTopBar
        handleClick={handleConnectWallet}
      />
    </div>
  );
};
