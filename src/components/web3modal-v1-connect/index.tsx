import React from "react";

import { Wallets } from "./Wallets/Wallets";

export const ConnectWithWeb3ModalV1DiffWallets = () => {
  return (
    <div>
      <h2>Diff wallets connect wiht web3modal v1</h2>
      <Wallets
        connectWalletTitlePText="Connect more wallets to access all of your 
            NFTs in a single profile."
        showStyledSignInTopBar
        handleClick={(walletId) => {
          console.log(walletId);
        }}
      />
    </div>
  );
};
