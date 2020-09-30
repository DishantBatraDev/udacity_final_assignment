import React, { useState,useEffect } from "react";
import "./App.css";
import { Route,Router, Switch } from "react-router-dom";
import Auth from "./auth/Auth";
import { Header } from "./components/header/Header";
import { Main } from "./components/main/Main";
import createHistory from "history/createBrowserHistory";
import { Callback } from "./components/callback/Callback";
import {AddExpense} from "./components/addExpense/AddExpense"
import {EditExpense} from "./components/editExpense/EditExpense"
import {getExpenses} from "./api/expense-api"

const history = createHistory();
const auth = new Auth(history);

const handleAuthentication = (props, setLogin,setFetchData) => {
  const location = props.location;
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication(setLogin,setFetchData);
  }
};

const App=()=> {
  const [isLoggedIn, setLogin] = useState(false);
  const [expenses,setExpenses] = useState([]);
  const [fetchData, setFetchData] =useState(true)
  
  useEffect(()=>{
    async function getData(){
      const authorizationToken = auth.getIdToken();
    const data = await getExpenses(authorizationToken);
    setExpenses(data);
    }
    if(fetchData && isLoggedIn){
      setFetchData(false)
      getData()
    }
  },[fetchData,isLoggedIn])
  return (
    <div className="App">
      <Router history={history}>
        <h1>Expense Manager</h1>
        <Header props={auth} isLoggedIn={isLoggedIn} />
        {
          !isLoggedIn?(<p>Kindly Login to Enter Expenses</p>):""
        }
       
        <Route
          path="/callback"
          render={(props) => {
            handleAuthentication(props, setLogin,setFetchData);
            return <Callback />;
          }}
        />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
            <Main expenses={expenses}  auth={auth} history={history} isLoggedIn={isLoggedIn} setFetchData={setFetchData} />
          </Route>
          <Route path="/addExpense">
            <AddExpense auth={auth} history={history} setFetchData={setFetchData} />
          </Route>
          <Route path="/editExpense/:expenseId">
            <EditExpense expenses={expenses} auth={auth} history={history} setFetchData={setFetchData} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
