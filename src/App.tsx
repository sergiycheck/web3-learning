import React from "react";

import s from "./App.module.scss";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

import { LoginWithMetamaskOrCoinbase } from "./components/login-with-metamask-or-coinbase/index";

import { ConnectWithWeb3ModalV1DiffWallets } from "./components/web3modal-v1-connect";

const routes = {
  home: "/",
  diff_signins: {
    name: "/diff_signins",
    nested: {
      connect_metamask_or_coninbase_1: "connect_metamask_or_coninbase_1",
      web3modal_v1_diff_wallets: "web3modal_v1_diff_wallets",
    },
  },
};

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul className={s.navigation}>
            <li>
              <Link to={routes.home}>Home</Link>
            </li>
            <li>
              <Link to={routes.diff_signins.name}>Diff sign ins</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Switch>
          <Route exact path={routes.home}>
            <Home />
          </Route>
          <Route path={routes.diff_signins.name}>
            <DiffSignIns />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>React 17 examples of web3 login and other features</h2>
    </div>
  );
}

function DiffSignIns() {
  let { path, url } = useRouteMatch();

  return (
    <div>
      <h2>Diff sign-ins</h2>
      <ul>
        <li>
          <Link
            to={`${url}/${routes.diff_signins.nested.connect_metamask_or_coninbase_1}`}
          >
            connect_metamask_or_coninbase_1
          </Link>
        </li>
        <li>
          <Link
            to={`${url}/${routes.diff_signins.nested.web3modal_v1_diff_wallets}`}
          >
            web3modal_v1_diff_wallets
          </Link>
        </li>
      </ul>

      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route
          path={`${path}/${routes.diff_signins.nested.connect_metamask_or_coninbase_1}`}
        >
          <LoginWithMetamaskOrCoinbase />
        </Route>
        <Route
          path={`${path}/${routes.diff_signins.nested.web3modal_v1_diff_wallets}`}
        >
          <ConnectWithWeb3ModalV1DiffWallets />
        </Route>
      </Switch>
    </div>
  );
}
