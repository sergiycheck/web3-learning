import React from "react";
import Web3 from "web3";
import axios from "axios";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, signInWithCustomToken, signOut } from "firebase/auth";

import ConnectWalletButton from "./components/ConnectWalletButton";
import mobileCheck from "./helpers/mobileCheck";
import getLinker from "./helpers/deepLink";

import "./App.css";

const firebaseConfig = {
  apiKey: "AIzaSyDV-ty2-g3KXAkEbIQGYJDE1XxgAVuaKWU",
  authDomain: "web3-learning-medium-dapps.firebaseapp.com",
  projectId: "web3-learning-medium-dapps",
  storageBucket: "web3-learning-medium-dapps.appspot.com",
  messagingSenderId: "559491640961",
  appId: "1:559491640961:web:9ec3bd4708a9f4f4b2a780",
  measurementId: "G-RPPZ9KLKS0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

const App = () => {
  const [loading, setLoading] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const isMobile = React.useMemo(() => mobileCheck(), []);

  const onPressConnect = async () => {
    setLoading(true);

    try {
      const yourWebUrl = "mysite.com"; // Replace with your domain
      const deepLink = `https://metamask.app.link/dapp/${yourWebUrl}`;
      const downloadMetamaskUrl = "https://metamask.io/download.html";

      if (window?.ethereum?.isMetaMask) {
        // Desktop browser
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const account = Web3.utils.toChecksumAddress(accounts[0]);
        await handleLogin(account);
      } else if (isMobile) {
        // Mobile browser
        const linker = getLinker(downloadMetamaskUrl);
        linker.openURL(deepLink);
      } else {
        window.open(downloadMetamaskUrl);
      }
    } catch (error) {
      console.log(error);
      setAddress("");
    }

    setLoading(false);
  };

  const handleLogin = async (address) => {
    const baseUrl = "http://localhost:4000";
    const response = await axios.get(`${baseUrl}/message?address=${address}`);
    const messageToSign = response?.data?.messageToSign;

    if (!messageToSign) {
      throw new Error("Invalid message to sign");
    }

    const web3 = new Web3(Web3.givenProvider);
    const signature = await web3.eth.personal.sign(messageToSign, address);

    const jwtResponse = await axios.get(
      `${baseUrl}/jwt?address=${address}&signature=${signature}`
    );

    const customToken = jwtResponse?.data?.customToken;

    if (!customToken) {
      throw new Error("Invalid JWT");
    }

    await signInWithCustomToken(auth, customToken);
    setAddress(address);
  };

  const onPressLogout = () => {
    setAddress("");
    signOut(auth);
  };

  return (
    <div className="App">
      <header className="App-header">
        <ConnectWalletButton
          onPressConnect={onPressConnect}
          onPressLogout={onPressLogout}
          loading={loading}
          address={address}
        />
      </header>
    </div>
  );
};

export default App;
