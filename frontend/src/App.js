import React, { useState } from "react";
import "./App.css";
import { Route, Router, Switch } from 'react-router-dom'
import Auth from "./auth/Auth";
import { Header } from "./components/header/Header";
import { Main } from "./components/main/Main";
import createHistory from "history/createBrowserHistory";
import { Callback } from "./components/callback/Callback";
import { NotFound } from "./components/notfound/NotFound";
const history = createHistory();
const auth = new Auth(history);

const handleAuthentication = (props, setLogin) => {
  debugger
  const location = props.location;
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication(setLogin);
  }
};

function App() {
  const [isLoggedIn, setLogin] = useState(false);
  const expenses = [
    {
      Name: "Mc Downald",
      Amount: 100,
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
            <Main expenses={expenses} />
          </Route>
          <Route path="/addExpense">
            <About />
          </Route>
          <Route  component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

function About() {
  return <h2>About</h2>;
}
export default App;
