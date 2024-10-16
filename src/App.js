import React from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Private from "./Private";
import { Route } from "react-router-dom";

import { LoginCallback, SecureRoute, Security } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { useHistory } from "react-router-dom";

const App = () => {
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };

  const oktaAuth = new OktaAuth({
    issuer: "https://dev-42198119.okta.com/oauth2/default",
    clientId: "0oakeuoa10W96o4gz5d7",
    redirectUri: window.location.origin + "/callback",
  });

  return (
    <div className="App">
      <div className="page">
        <div className="content">
          <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
            <Header />
            <Route path="/" exact={true} component={Home} />
            <SecureRoute path="/private" exact={true} component={Private} />
            <Route path="/callback" component={LoginCallback} />
          </Security>
        </div>
      </div>
    </div>
  );
};

export default App;
