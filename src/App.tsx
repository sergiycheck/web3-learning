import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

import { LoginWithMetamaskOrCoinbase } from "./components/login-with-metamask-or-coinbase/index";

import s from "./App.module.css";

const routes = {
  home: "/",
  diff_signins: {
    name: "/diff_signins",
    nested: {
      connect_metamask_or_coninbase_1: "connect_metamask_or_coninbase_1",
      sign_in_2: "sign_in_2",
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
          <Link to={`${url}/${routes.diff_signins.nested.sign_in_2}`}>
            sign_in_2
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
        <Route path={`${path}/${routes.diff_signins.nested.sign_in_2}`}>
          <SignIn2 />
        </Route>
      </Switch>
    </div>
  );
}

function SignIn2() {
  return (
    <div>
      <h3>Sign In 2</h3>
    </div>
  );
}
