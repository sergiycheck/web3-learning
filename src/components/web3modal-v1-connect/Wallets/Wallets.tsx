import React from "react";
import { ReactComponent as Logo } from "./assets/logo-black.svg";
import { ReactComponent as MetamaskLogo } from "./assets/metamask.svg";
import { ReactComponent as WalletConnectLogo } from "./assets/WalletConnect.svg";
import { ReactComponent as CoinBaseLogo } from "./assets/coinBaseLogo.svg";
import { ReactComponent as PhantomLogo } from "./assets/Phantom.svg";

import mobileCheck from "../../../utils/mobileCheck";

import styles from "./wallets.module.scss";

export const Wallets = ({
  handleClick,
  showStyledSignInTopBar,
  connectWalletTitlePText,
}: {
  handleClick: (walletId: string) => void;
  showStyledSignInTopBar: boolean;
  connectWalletTitlePText: string;
}) => {
  const isMobile = React.useMemo(() => mobileCheck(), []);

  const wallets = React.useMemo(() => {
    const mobileWallets = [
      {
        id: "injected",
        title: "MetaMask",
        icon: <MetamaskLogo />,
      },
      {
        id: "walletconnect",
        title: "WalletConnect",
        icon: <WalletConnectLogo />,
      },
      {
        id: "coinbasewallet",
        title: "Coinbase",
        icon: <CoinBaseLogo />,
      },
    ];

    return isMobile
      ? mobileWallets
      : [
          ...mobileWallets,
          {
            id: "phantom",
            title: "Phantom",
            icon: <PhantomLogo />,
          },
        ];
  }, [isMobile]);

  return (
    <div className={styles.container}>
      {showStyledSignInTopBar && <StyledSignInTopBar />}

      <div className={styles.content}>
        <ConnectWalletTitleContainer
          h3Text="Connect your wallet"
          pText={connectWalletTitlePText}
        />

        <div className={styles.content__wallets}>
          {wallets.map((wallet) => (
            <div
              className={styles.content__item}
              key={wallet.id}
              onClick={() => handleClick(wallet.id)}
            >
              <div className={styles.content__logo}>{wallet.icon}</div>
              <p className={styles.content__wallet_name}>{wallet.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const StyledSignInTopBar = () => {
  return (
    <div className={styles.top}>
      <div className={styles.rotated_div}>
        <span className={styles.logo}>
          <Logo />
        </span>
      </div>
    </div>
  );
};

export const ConnectWalletTitleContainer = ({
  h3Text,
  pText,
}: {
  h3Text: string;
  pText: string;
}) => {
  return (
    <>
      <h3 className={styles.content__title} data-cy="login-title">
        {h3Text}
      </h3>
      <p className={styles.content__text}>{pText}</p>
    </>
  );
};
