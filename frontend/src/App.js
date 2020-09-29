import React, { useState } from "react";
import "./App.css";
import { Route,Router, Switch } from "react-router-dom";
import Auth from "./auth/Auth";
import { Header } from "./components/header/Header";
import { Main } from "./components/main/Main";
import createHistory from "history/createBrowserHistory";
import { Callback } from "./components/callback/Callback";
import {AddExpense} from "./components/addExpense/AddExpense"
const history = createHistory();
const auth = new Auth(history);

const handleAuthentication = (props, setLogin) => {
  const location = props.location;
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication(setLogin);
  }
};

function App() {
  const [isLoggedIn, setLogin] = useState(false);
  const expenses = [
    {
      id:"1234-1242311-123123",
      name: "Mc Downald",
      amount: 100,
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/e/ed/Elon_Musk_Royal_Society.jpg",
    },
  ];
  return (
    <div className="App">
      <Router history={history}>
        <Header props={auth} isLoggedIn={isLoggedIn} />
        <Route
          path="/callback"
          render={(props) => {
            handleAuthentication(props, setLogin);
            return <Callback />;
          }}
        />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
            <Main expenses={expenses}  auth={auth} history={history} isLoggedIn={isLoggedIn} />
          </Route>
          <Route path="/addExpense">
            <AddExpense auth={auth} history={history} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
